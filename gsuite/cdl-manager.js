/* mange CDL */

var folderId = '1SAJvyGFo6tkhJC2w2-qYDirscHdAwVUS';
var availability = '1hLAlvRtzIgDYjOdrbUZGSqWmVsPPEkddMqZkjLWaKIc';
var circulation = '1ujtfzGHXrU_AY-ABTFHhIfoOS10Yao5a8z8NQu_4Ykg';
var row = 2, colBarcode = 1, colTitle = 2;

// 1 sec = 1000 millseconds
// 4 hours = 4 * 60 * 60 * 1000 = 14400000
var loanPeriod = 14400000;

function selfCheckout(useremail) {
	// atm, use barcode to locate a file
	var folder = DriveApp.getFolderById(folderId);
	var files = folder.getFiles();
	files.next().addViewer(useremail);
	// if the item is available
	selfCheckout(useremail);
	var sheet = SpreadsheetApp.openById(circulation).getSheetByName('circ-log');
}


/* getFileId.gs */
function getFile(){

}

// get the identifer for locating a file
// atm, useing the barcode
function getIdentifer(){


	// record the loan time
	var loanTime = new Date();
	// MM/DD/YYYY same as that in Aleph
	var loanDate = (loanTime.getMonth()+1).toString() + '/' +
	loanTime.getDate().toString() +	'/' +
	loanTime.getFullYear().toString();
	// HH:MM similar to that in Alpeh, without AM or PM, 24-hour schedule
	var loanHour = loanTime.getHours().toString() + ':' +
	loanTime.getMinutes().toString();

	sheet.getRange(6,6).setValue(loanDate);
	sheet.getRange(6,7).setValue(loanHour);

	// set due time
	var dueTime = new Date(loanTime.getTime() + loanPeriod);
	sheet.getRange(6,8).setValue(dueTime);
}


function checkOut(useremail) {
	var sheet = SpreadsheetApp.openById(circulation).getSheetByName('circ-log');
	var barcode = '"'+ sheet.getRange(4,4).getValue().toString() + '"';
	var file = DriveApp.searchFiles('title contains ' + barcode).next();
	// check out
	file.addViewer(useremail);	
}

function checkIn(useremail) {
	var sheet = SpreadsheetApp.openById(circulation).getSheetByName('circ-log');
	var barcode = '"'+ sheet.getRange(4,4).getValue().toString() + '"';
	var file = DriveApp.searchFiles('title contains ' + barcode).next();
	// check out
	file.removeViewer(useremail);
}
// 2:30 -- > trigger at 6:30 --> remove viewer and sucide
// 3:58 -- > trigger at 7:58


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