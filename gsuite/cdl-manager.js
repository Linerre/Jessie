/* mange CDL */

var folderId = '1SAJvyGFo6tkhJC2w2-qYDirscHdAwVUS';
var spreadSheetId = '1hLAlvRtzIgDYjOdrbUZGSqWmVsPPEkddMqZkjLWaKIc';
var row = 2, colBarcode = 1, colTitle = 2;

// 1 sec = 1000 millseconds
// 4 hours = 4 * 60 * 60 * 1000 = 14400000
var loanPeriod = 14400000;

function selfCheckout(useremail) {
	var folder = DriveApp.getFolderById(folderId);
	var files = folder.getFiles();
	files.next().addViewer(useremail);
}

function loanPeriodChecker(loanTime, useremail){
	// if the item is available
	selfCheckout(useremail);
	SpreadsheetApp.openById
}

function test() {
	var folder = DriveApp.getFolderById(folderId);
	var files = folder.getFiles();
	var sheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName('reserves');
	while (files.hasNext()) {
		var filename = files.next().getName();
		var barcodeCell = sheet.getRange(row, colBarcode);
		var titleCell = sheet.getRange(row, colTitle);
		barcodeCell.setValue(filename.slice(0,14)).setWrap(true);
		titleCell.setValue(filename.slice(15)).setWrap(true);
		row+=1;
	}
}