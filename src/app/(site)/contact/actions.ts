"use server";

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

  // No email/CRM provider is wired up yet — this placeholder accepts the
  // enquiry and logs it server-side until a real integration replaces it.
  console.log("New enquiry:", { company, name, email, country, message });

  return { status: "success", message: "Thanks — we'll be in touch within 24 hours.", fieldErrors: {} };
}
