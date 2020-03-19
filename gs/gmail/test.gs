// check inbox to automate some daily routines

// get email from lib-dba@nyu.edu or DoNotReply_EMS_Notification@nyu.edu
const LIBDBA = "lib-dba@nyu.edu";
const EMSNOTY = "DoNotReply_EMS_Notification@nyu.edu";

// if subject is one of the following ones, means no requests and not worth attention
var subjects = [
	'NO Shanghai Paging Requests to Report',			// 2:00AM 8:00PM
	'NO NYUSH Booking Requests to Report',				// 8:00AM 3:00PM
	'There were NO Shanghai Expired Holds to Report',	// 12:01PM
	'Based on the report criteria, there is no data to display for the designated time period.' // length 89
]; 

// mark as read, label with LibNoty (Library Notifications), and remove monthly(?)

// get the first 50 threads from inbox and the needed label
var threads = GmailApp.getInboxThreads(0,50);
var libNoty = GmailApp.getUserLabelByName('LibNoty');

// ====================================== this works ======
var toBuy   = GmailApp.getUserLabelByName('To Buy/Ordered');
toBuy.removeFromThread(threads[8]);
Logger.log(threads[8]);

function libNotyWatcher() {
	Logger.log(threads[4].getMessages()[0].getPlainBody());
	Logger.log(threads[4].getRawContent());

	for (var i = 0; i < threads.length; i++) {


		// get the subject of the first message from each thread
		var subject = threads[i].getFirstMessageSubject();
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
	// return count;	
};


// run every 4 hours
function manager() {
	var builder = ScriptApp.newTrigger('libNotyWatcher').timeBased();
		builder.everyHours(4);
		builder.create();	
}

