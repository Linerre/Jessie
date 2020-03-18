// gmail apps script
// check inbox to automate some daily routines

// get email from lib-dba@nyu.edu or DoNotReply_EMS_Notification@nyu.edu
var from = "lib-dba@nyu.edu";
// if subject is one of the following ones, means no requests and not worth attention
subjects = [
	'NO Shanghai Paging Requests to Report',			// paging request
	'NO NYUSH Booking Requests to Report',				// booking request
	'There were NO Shanghai Expired Holds to Report',	// expired holds
]

// mark as read, label with LibNoty (Library Notifications), and remove monthly(?)

// get the first 50 threads from inbox and the needed label
var threads = GmailApp.getInboxThreads(0,50);
var libNoty = GmailApp.getUserLabelByName("LibNoty");
var inbox = GmailApp.getUserLabelByName("inbox");

function libNotyWatcher() {
	for (var i = 0; i < threads.length; i++) {
		// get the subject of the first message from each thread
		var subject = threads[i].getFirstMessageSubject();
		var message = threads[i].getMessages()[0];
		// check if the subject is one of the subjects
		for (var sub of subjects) {
			if (subject == sub) {
				libNoty.addToThread(threads[i]);
				inbox.deleteLabel();
				message.markRead();
			} else continue;
		}
	}	
}
