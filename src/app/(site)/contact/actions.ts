"use server";

import { escapeHtml, sendMail } from "@/lib/mail";
import { appendToSheet } from "@/lib/sheets";
import { getSiteSettings } from "@/sanity/queries";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message: string;
  fieldErrors: Partial<Record<"company" | "name" | "email" | "country" | "message", string>>;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const company = String(formData.get("company") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const country = String(formData.get("country") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const fieldErrors: EnquiryState["fieldErrors"] = {};
  if (!company) fieldErrors.company = "Company name is required.";
  if (!name) fieldErrors.name = "Your name is required.";
  if (!email || !EMAIL_RE.test(email)) fieldErrors.email = "Enter a valid email address.";
  if (!country) fieldErrors.country = "Country is required.";
  if (!message) fieldErrors.message = "Tell us a bit about your collection.";

  if (Object.keys(fieldErrors).length > 0) {
    return { status: "error", message: "Please fix the fields below.", fieldErrors };
  }

  const categories = formData.getAll("categories").map(String).filter(Boolean);

  const rows: [string, string][] = [
    ["Company", company],
    ["Name", name],
    ["Email", email],
    ["Country", country],
    ["Categories", categories.join(", ") || "—"],
  ];

  // Destination is chosen in Studio (Site Settings → Contact Form Destination); defaults to the Google Sheet.
  const destination = (await getSiteSettings().catch(() => null))?.enquiryDestination ?? "sheets";

  const deliveries: Promise<void>[] = [];
  if (destination === "sheets" || destination === "both") {
    deliveries.push(
      appendToSheet({ company, name, email, country, categories: categories.join(", "), message })
    );
  }
  if (destination === "email" || destination === "both") {
    deliveries.push(
      sendMail({
        to: process.env.MAIL_TO || process.env.MAIL_FROM || "",
        replyTo: email,
        subject: `New enquiry from ${company} (${name})`,
        html: `
          <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
            ${rows
              .map(([k, v]) => `<tr><td style="color:#666"><b>${k}</b></td><td>${escapeHtml(v)}</td></tr>`)
              .join("")}
          </table>
          <p style="font-family:sans-serif;font-size:14px;white-space:pre-wrap">${escapeHtml(message)}</p>
        `,
      })
    );
  }

  // With "both", the enquiry counts as received if at least one destination accepted it.
  const results = await Promise.allSettled(deliveries);
  for (const r of results) {
    if (r.status === "rejected") console.error(`Failed to deliver enquiry (${destination}):`, r.reason);
  }
  if (!results.some((r) => r.status === "fulfilled")) {
    return {
      status: "error",
      message: "Sorry, we couldn't send your enquiry. Please try again or email us directly.",
      fieldErrors: {},
    };
  }

  return { status: "success", message: "Thanks — we'll be in touch within 24 hours.", fieldErrors: {} };
}
