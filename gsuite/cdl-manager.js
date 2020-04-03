/* mange CDL */

var folderId = '1SAJvyGFo6tkhJC2w2-qYDirscHdAwVUS'






function getEachFileName(folderIdStr) {
	var folder = DriveApp.getFolderById(folderId);
	var files = folder.getFiles();
	while (files.hasNext()) {
		var filename = file.next().getName();
	}
}