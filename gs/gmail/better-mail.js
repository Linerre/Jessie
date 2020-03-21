// check inbox to automate some daily routines

const CONTACTS = {
	// lib-related reports: holds, paging request, etc.
	LIB : "lib-dba@nyu.edu",
	// group study room reservation report, discard
	EMS : "DoNotReply_EMS_Notification@nyu.edu",
	RES : "shanghai.reserves@nyu.edu",
	CIR : "shanghai.circulation@nyu.edu",
	ARE : "do-not-reply-nyu-classes-group@nyu.edu",
	NTF : "notify@google.com"
};


// any empty reports or notificationRead
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
  KEEP: GmailApp.getUserLabelByName('LibNoty/Keep')
};

const ACTION = {
	TODO : GmailApp.getUserLabelByName('Action/ToDo'),
	DOING: GmailApp.getUserLabelByName('Action/Doing'),
	DONE : GmailApp.getUserLabelByName('Action/Done'),
	NOTED: GmailApp.getUserLabelByName('Action/Noted')
};

  

// get the first 100 threads from inbox and the needed label
// The Gmail Service won't make changes to more than 100 threads \
// at a time, so batchLength defaults to 100.
var inboxThreads = GmailApp.getInboxThreads(0,100);
    
  
function libNotyWatcher() {
  for (var i = 0; i < inboxThreads.length; i++) {
    // get the subject of the first message from each thread
    var subject = inboxThreads[i].getFirstMessageSubject();
    var sender = inboxThreads[i].getMessages()[0].getFrom();
    var attach = inboxThreads[i].getMessages()[0].getAttachments();
 		
 		subjectChecker(inboxThreads[i], subject, TO_CAST_SUB, LIB_NOTY.CAST)
 		subjectChecker(inboxThreads[i], subject, TO_KEEP_SUB, LIB_NOTY.KEEP)
  }
};

// clean notification previously labelled 'keep'
function libNotyCleaner() {
	var targets = LIB_NOTY.KEEP.getThreads(0, 100);
	for (var target of targets) {
		var msg = target.getMessages()[0];
		var ats = target.getMessages()[0].getAttachments();
		// trash non-attach
		if (ats.length == 0 || ats.length == 2) {
			LIB_NOTY.KEEP.removeFromThread(target);
			LIB_NOTY.CAST.addToThread(target);
		} 
	}

	// clean all the 'discard' messages/threads to trash
	var discards = LIB_NOTY.CAST.getThreads(0, 100);
	GmailApp.moveThreadsToTrash(discards);
};

// deal with ares class report and notify google
// run every 12 hours
function gNotifyAndAres() {
	// if read, label discard + unimport and archive
	var read = `in:inbox is:read from:${CONTACTS.NTF}`;
	var unread = `in:inbox is:unread from:${CONTACTS.NTF}`;
  var notifyUnread = find (unread);
	var notifyRead = find(read);

	if (read.length !== 0) {
		GmailApp.markThreadsUnimportant(notifyRead);
  	label('LibNoty/Discard').addToThreads(notifyRead);
  	GmailApp.moveThreadsToArchive(notifyRead);
	}
  
	if (unread.length !== 0) {
		GmailApp.markThreadsUnimportant(notifyUnread);
  	label('LibNoty/Keep').addToThreads(notifyUnread);
	}
}

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
};

function labelSwap(oldLabel, newLabel, thread) {
	oldLabel.removeFromThread(thread);
	newLabel.addToThread(thread);
};

/* find.gs */
function find(searchString, shouldLimit, batchLength) {
  // The Gmail Service won't make changes to more than 100 threads
  // at a time, so batchLength defaults to 100.
  shouldLimit = (typeof shouldLimit !== 'undefined') ?  shouldLimit : true;
  batchLength = (typeof batchLength !== 'undefined') ?  batchLength : 100;
  if (shouldLimit) {
    return GmailApp.search(searchString, 0, batchLength);
  } else {
    return GmailApp.search(searchString);
  }
};

/* label.gs */

function label(name) {
  // This only works for user-defined labels,
  // not system labels like "Spam."
  return GmailApp.getUserLabelByName(name);
}