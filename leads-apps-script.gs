/**
 * Cognexa lead pipeline — Google Apps Script
 * Paste this into a Google Sheet: Extensions → Apps Script → replace everything.
 * Then: Deploy → New deployment → Web app → Execute as "Me",
 * Who has access "Anyone" → Deploy → copy the /exec URL.
 *
 * Every questionnaire submission appends a row to the "Leads" tab and
 * emails NOTIFY_EMAIL. Use the Status column as your pipeline:
 * New → Contacted → Quoted → Won / Lost.
 *
 * Rows are written BY HEADER NAME, not by position — so a sheet that
 * predates a new question keeps working: the missing column is added to
 * the end of the header row on the next submission, and you can drag it
 * wherever you like afterwards without touching this script.
 */

var NOTIFY_EMAIL = 'rj@cognexa.co.za';
var SHEET_NAME = 'Leads';

/* [ column header, key on the posted payload ] — order here is the order
   a brand-new sheet gets. 'Received' and 'Status' are filled in below. */
var COLUMNS = [
  ['Received', null],
  ['Name', 'name'],
  ['Phone', 'phone'],
  ['Email', 'email'],
  ['Business', 'company'],
  ['What they do', 'industry'],
  ['Interested in', 'service'],
  ['Time drains', 'pain'],
  ['Notes', 'message'],
  ['Page', 'page'],
  ['Status', null]
];

/* Current headers, creating or extending the header row as needed. */
function ensureHeaders(sheet) {
  if (sheet.getLastRow() === 0) {
    var fresh = COLUMNS.map(function (col) { return col[0]; });
    sheet.appendRow(fresh);
    sheet.setFrozenRows(1);
    return fresh;
  }

  var headers = sheet
    .getRange(1, 1, 1, sheet.getLastColumn())
    .getValues()[0]
    .map(function (h) { return String(h).trim(); });

  var missing = COLUMNS
    .map(function (col) { return col[0]; })
    .filter(function (name) { return headers.indexOf(name) === -1; });

  if (missing.length) {
    sheet
      .getRange(1, headers.length + 1, 1, missing.length)
      .setValues([missing]);
    headers = headers.concat(missing);
  }

  return headers;
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    var data = {};
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      data = e.parameter || {};
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
    var headers = ensureHeaders(sheet);

    /* Map header name → value, then lay the row out in the sheet's own
       column order. Unknown columns you have added by hand stay blank. */
    var byHeader = { 'Received': new Date(), 'Status': 'New' };
    COLUMNS.forEach(function (col) {
      if (col[1]) byHeader[col[0]] = String(data[col[1]] || '');
    });

    sheet.appendRow(
      headers.map(function (name) {
        return byHeader.hasOwnProperty(name) ? byHeader[name] : '';
      })
    );

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New lead — ' + (data.company || data.name || 'Cognexa website'),
      body:
        'A new lead just came down the line.\n\n' +
        'Name: ' + (data.name || '—') + '\n' +
        'Phone: ' + (data.phone || '—') + '\n' +
        'Email: ' + (data.email || '—') + '\n' +
        'Business: ' + (data.company || '—') + '\n' +
        'What they do: ' + (data.industry || '—') + '\n' +
        'Interested in: ' + (data.service || '—') + '\n' +
        'Time drains: ' + (data.pain || '—') + '\n' +
        'Notes: ' + (data.message || '—') + '\n\n' +
        'Lead list: ' + ss.getUrl()
    });

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
