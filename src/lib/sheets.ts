// Server-only: reads secrets from process.env. Appends a row to a Google Sheet through a Google Apps Script web app
// (see scripts/google-sheets-webhook.gs for the script and setup steps).

export async function appendToSheet(row: Record<string, string>): Promise<void> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url) throw new Error("Missing environment variable GOOGLE_SHEETS_WEBHOOK_URL");
  if (!secret) throw new Error("Missing environment variable GOOGLE_SHEETS_WEBHOOK_SECRET");

  // Apps Script answers with a redirect to the script's output; fetch follows it by default.
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "text/plain;charset=utf-8" },
    body: JSON.stringify({ secret, row }),
    cache: "no-store",
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Google Sheets webhook failed: ${res.status} ${text}`);

  let result: { ok?: boolean; error?: string };
  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(`Google Sheets webhook returned non-JSON (check the deployment URL and access): ${text.slice(0, 200)}`);
  }
  if (!result.ok) throw new Error(`Google Sheets webhook rejected the row: ${result.error ?? "unknown error"}`);
}
