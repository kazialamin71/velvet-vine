// Google Apps Script that receives contact-form enquiries and appends them to the sheet it's attached to.
//
// Setup:
//   1. Create a Google Sheet, then Extensions → Apps Script. Replace the editor contents with this file.
//   2. Project Settings (gear icon) → Script Properties → add WEBHOOK_SECRET = <a long random string>.
//      Use the same value for GOOGLE_SHEETS_WEBHOOK_SECRET in the site's environment.
//   3. Deploy → New deployment → type "Web app". Execute as: Me. Who has access: Anyone.
//      Authorize when prompted, then copy the Web app URL (ends in /exec) into GOOGLE_SHEETS_WEBHOOK_URL.
//   4. After editing this script later, use Deploy → Manage deployments → Edit → Version: New version,
//      so the same URL keeps working.

const SHEET_NAME = "Enquiries";
const HEADERS = ["Received", "Company", "Name", "Email", "Country", "Categories", "Message", "Status"];

function doPost(e) {
  try {
    const body = JSON.parse(e.postData.contents);
    const expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_SECRET");
    if (!expected || body.secret !== expected) return json({ ok: false, error: "unauthorized" });

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
      sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    }

    const r = body.row || {};
    // Prefix with ' so values starting with = + - @ are stored as text, not formulas.
    const safe = (v) => (/^[=+\-@]/.test(String(v || "")) ? "'" + v : String(v || ""));
    sheet.appendRow([
      new Date(),
      safe(r.company),
      safe(r.name),
      safe(r.email),
      safe(r.country),
      safe(r.categories),
      safe(r.message),
      "New",
    ]);
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
