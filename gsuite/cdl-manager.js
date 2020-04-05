/* mange CDL */

var folderId = '1SAJvyGFo6tkhJC2w2-qYDirscHdAwVUS';
var spreadSheetId = '1hLAlvRtzIgDYjOdrbUZGSqWmVsPPEkddMqZkjLWaKIc';
var row = 2, colBarcode = 1, colTitle = 2;


function test() {
	var folder = DriveApp.getFolderById(folderId);
	var files = folder.getFiles();
	var sheet = SpreadsheetApp.openById(spreadSheetId).getSheetByName('reserves');
	while (files.hasNext()) {
		var filename = files.next().getName();
		var barcodeCell = sheet.getRange(row, colBarcode);
		var titleCell = sheet.getRange(row, colTitle);
		barcodeCell.setValue(filename.slice(0,14));
		titleCell.setValue(filename.slice(16));
		row+=1;
	}
}