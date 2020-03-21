// check inbox to automate some daily routines

const CONTACTS = {
	// lib-related reports: holds, paging request, etc.
	LIB : "lib-dba@nyu.edu",
	// group study room reservation report, discard
	EMS : "DoNotReply_EMS_Notification@nyu.edu",
	RES : "shanghai.reserves@nyu.edu",
	CIR : "shanghai.circulation@nyu.edu"，
	ARE : "do-not-reply-nyu-classes-group@nyu.edu"
};


// any empty reports or notifications
const TO_CAST_SUB = [
  'NO Shanghai Paging Requests to Report',
  'NO NYUSH Booking Requests to Report',
  'There were NO Shanghai Expired Holds to Report',
  'Return Receipt',
  'NYU Shanghai Group Study Room Schedule'
];

// any non-empty or with-attachments reports 
const TO_KEEP_SUB = [
	'NYU52 ILL Rush Orders Report',
	'Shanghai Patrons who owe more than 100 Report',
	'Shanghai New Holds Report',
	'ALEPH SHANGHAI Paging Request Report',
	'CLANCY Offsite Requests',
	'NYU SH Inventory Report'
];


// Labels
const LIB_NOTY = {
  CAST: GmailApp.getUserLabelByName('LibNoty/Discard'),
  KEEP: GmailApp.getUserLabelByName('LibNoty/Keep'),
};

  

// get the first 100 threads from inbox and the needed label
// The Gmail Service won't make changes to more than 100 threads \
// at a time, so batchLength defaults to 100.
var threads = GmailApp.getInboxThreads(0,100);
    
  
function libNotyWatcher() {
  for (var i = 0; i < threads.length; i++) {
    // get the subject of the first message from each thread
    var subject = threads[i].getFirstMessageSubject();
    var sender = threads[i].getMessages()[0].getFrom();
    var attach = threads[i].getMessages()[0].getAttachments();
 		
 		subjectChecker(threads[i], subject, TO_CAST_SUB, LIB_NOTY.CAST)
 		subjectChecker(threads[i], subject, TO_KEEP_SUB, LIB_NOTY.KEEP)
  }
};

// clean notifications previously labelled 'keep' but without any attachement
function libNotyCleaner() {
	// array of threads labelled 'libnoty/keep' 
	var targets = LIB_NOTY.KEEP.getThreads(0, 100);
	for (var target of targets) {
		var msg = target.getMessages()[0];
		var ats = target.getMessages()[0].getAttachments();
		if (ats.length == 0) {
			LIB_NOTY.KEEP.removeFromThread(target);
			LIB_NOTY.CAST.addToThread(target);
		} else continue;
	}

	// clean all the 'discard' messages/threads to trash
	var discards = LIB_NOTY.CAST.getThreads(0, 100);
	GmailApp.moveThreadsToTrash(discards);
};


// run every 4 hours
function manager() {
	// run every 4 hours
  var hourjob = ScriptApp.newTrigger('libNotyWatcher').timeBased();
  hourjob.everyHours(4)
  .create();

  // run every two months
  var fortnightjob = ScriptApp.newTrigger('libNotyCleaner').timeBased();
  fortnightjob.atHour(10)
  .onWeekDay(ScriptApp.WeekDay.SATURDAT)
  .everyWeeks(8)
  .create();
};


function subjectChecker(thread, subject, subList, label) {
	for (var sub of subList) {
		if (subject == sub) {
			thread.markUnimportant();
			thread.markRead();
			label.addToThread(thread);
			thread.moveToArchive();
		} else continue;
	}
}