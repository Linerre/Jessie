/* mange CDL */

var folderId = '1SAJvyGFo6tkhJC2w2-qYDirscHdAwVUS';
var availSs = '1hLAlvRtzIgDYjOdrbUZGSqWmVsPPEkddMqZkjLWaKIc';
var circSs = '1ujtfzGHXrU_AY-ABTFHhIfoOS10Yao5a8z8NQu_4Ykg';
var circSt = 'circ-log';
const COL = {
	ID: 1, // patron netid
	BC: 4, // barcode
	LD: 6, // loan date
	LH: 7, // loan hour
	DD: 8, // due date
	DH: 9  // due hour
};

// 
var file;


// 2:30 -- > trigger at 6:30 --> remove viewer and sucide
// 3:58 -- > trigger at 7:58

// 1 sec = 1000 millseconds
// 4 hours = 4 * 60 * 60 * 1000 = 14400000
var loanPeriod = 14400000;

// get the identifer for locating a file
// atm, useing

/* self check out */
function selfCheckout() {
	// check out to the patron
	var sheet = openSheet(circSs, circSt);

	// get the request details: row, patron id, requested barcode
	var row = sheet.getLastRow();
	var barcode = '"'+ sheet.getRange(row,COL.BC).getValue().toString() + '"';
	var patron = sheet.getRange(row,COL.ID).getValue();

	//check out
	checkOut(patron, barcode);

	// record the loan time and due time
	timeStamp(row, sheet);

	// next, create a trigger that will run at the due time
	// and anther trigger that will delete the last trigger after it runs

}


/* ---------------------- tools ---------------------- */
// open a sheet
function openSheet(ssId, stName) {
	return SpreadsheetApp.openById(ssId).getSheetByName(stName);
}

// stamp loan time and due time
// creating a trigger
function timeStamp(row, sheet){
	var loanTime = new Date();
	// MM/DD/YYYY same as that in Aleph
	var loanDate = (loanTime.getMonth()+1).toString() + '/' +
	loanTime.getDate().toString() +	'/' +
	loanTime.getFullYear().toString();
	// HH:MM similar to that in Alpeh, without AM or PM, 24-hour schedule
	var loanHour = loanTime.getHours().toString() + ':' +
	loanTime.getMinutes().toString();
	// write to the spreadsheet
	sheet.getRange(row,COL.LD).setValue(loanDate);
	sheet.getRange(row,COL.LH).setValue(loanHour);

	// set due COL
	var dueTime = new Date(loanTime.getTime() + loanPeriod);
	var dueDate = (dueTime.getMonth()+1).toString() + '/' +
	dueTime.getDate().toString() +	'/' +
	dueTime.getFullYear().toString();
	var dueHour = dueTime.getHours().toString() + ':' +
	dueTime.getMinutes().toString();

	sheet.getRange(row,COL.DD).setValue(dueDate);
	sheet.getRange(row,COL.DH).setValue(dueHour);

	ScriptApp.newTrigger('checkIn')
	.timeBased()
	.after(10*60*1000)
	.create();
}

// check out
function checkOut(patron, barcode) {
	var file = DriveApp.searchFiles('title contains ' + barcode).next();
	file.addViewer(patron+'@nyu.edu');
	return file.getUrl();	
}

// check in
// deleting the trigger created by timestamp
/* need to deal with row num and file url */
function checkIn() {
	var sheet = openSheet(circSs, circSt);
	var row = sheet.getLastRow();
	var barcode = '"'+ sheet.getRange(row,COL.BC).getValue().toString() + '"';
	var file = DriveApp.searchFiles('title contains ' + barcode).next();
	var patron = sheet.getRange(row,COL.ID).getValue();
	// check in the book
	file.removeViewer(patron+'@nyu.edu');

	// remove the trigger that just triggerred this function
	var triggers = ScriptApp.getProjectTriggers();
	// the zero trigger will always be the onEdit
	// and each request will create a checkin trigger, starting with index 1
	ScriptApp.deletTrigger(triggers[1]);
}






function test() {
	var folder = DriveApp.getFolderById(folderId);
	var files = folder.getFiles();
	var sheet = SpreadsheetApp.openById(availability).getSheetByName('reserves');
	while (files.hasNext()) {
		var filename = files.next().getName();
		var barcodeCell = sheet.getRange(row, colBarcode);
		var titleCell = sheet.getRange(row, colTitle);
		barcodeCell.setValue(filename.slice(0,14)).setWrap(true);
		titleCell.setValue(filename.slice(15)).setWrap(true);
		row+=1;
	}
}