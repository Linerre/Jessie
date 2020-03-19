// gmail apps script
// check inbox to automate some daily routines

// get email from lib-dba@nyu.edu or DoNotReply_EMS_Notification@nyu.edu
var from = "lib-dba@nyu.edu";
// if subject is one of the following ones, means no requests and not worth attention
subjects = [
	'NO Shanghai Paging Requests to Report',			// paging request
	'NO NYUSH Booking Requests to Report',				// booking request
	'There were NO Shanghai Expired Holds to Report',	// expired holds
	''
]

// mark as read, label with LibNoty (Library Notifications), and remove monthly(?)

// get the first 50 threads from inbox and the needed label
var threads = GmailApp.getInboxThreads(0,50);
var libNoty = GmailApp.getUserLabelByName('LibNoty');

function libNotyWatcher() {
	var count = 0;
	for (var i = 0; i < threads.length; i++) {
		// get the subject of the first message from each thread
		var subject = threads[i].getFirstMessageSubject();
		// var messages = threads[i].getMessages();
		// check if the subject is one of the subjects
		for (var sub of subjects) {
			if (subject == sub) {
				threads[i].markRead();
				libNoty.addToThread(threads[i]);
				threads[i].moveToArchive();
				count += 1;
			} else continue;
		}
	}
	return count;	
};

// run every 4 hours
function manager() {
	var builder = ScriptApp.newTrigger('libNotyWatcher').timeBased();
		builder.everyHours(4);
		builder.create();	
}

