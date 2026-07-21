/**
 * Cognexa lead pipeline — Google Apps Script
 * Paste this into a Google Sheet: Extensions → Apps Script → replace everything.
 * Then: Deploy → New deployment → Web app → Execute as "Me",
 * Who has access "Anyone" → Deploy → copy the /exec URL.
 *
 * Every questionnaire submission appends a row to the "Leads" tab and
 * emails NOTIFY_EMAIL. Use the Status column as your pipeline:
 * New → Contacted → Quoted → Won / Lost.
 */

var NOTIFY_EMAIL = 'rj@cognexa.co.za';
var SHEET_NAME = 'Leads';

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
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Received', 'Name', 'Email', 'Business', 'What they do',
        'Interested in', 'Time drains', 'Notes', 'Page', 'Status'
      ]);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      new Date(),
      String(data.name || ''),
      String(data.email || ''),
      String(data.company || ''),
      String(data.industry || ''),
      String(data.service || ''),
      String(data.pain || ''),
      String(data.message || ''),
      String(data.page || ''),
      'New'
    ]);

    MailApp.sendEmail({
      to: NOTIFY_EMAIL,
      subject: 'New lead — ' + (data.company || data.name || 'Cognexa website'),
      body:
        'A new lead just came down the line.\n\n' +
        'Name: ' + (data.name || '—') + '\n' +
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
