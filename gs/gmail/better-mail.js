// check inbox to automate some daily routines

/* ------------------- constants ----------------- */
/* ------------------- frequent senders ---------- */
// frequent senders: non-reply & group
const CONTACTS = {
	// lib-related reports: holds, paging request, etc.
	LIB : "lib-dba@nyu.edu",
	ALL : "lib-all@nyu.edu",
	// group study room reservation report, discard
	EMS : "DoNotReply_EMS_Notification@nyu.edu",
	RES : "shanghai.reserves@nyu.edu",
	CIR : "shanghai.circulation@nyu.edu",
	ARE : "do-not-reply-nyu-classes-group@nyu.edu",
	NTF : "notify@google.com",
	SHL : "shanghai.library@nyu.edu"
	HRG : "shanghai.hr@nyu.edu",
	HRL : "wg22@nyu.edu", // HR Director
	OFF : "lib-offsite@nyu.edu"
};

// Direcotr, Dean, Provost, Librarian
const HEADS = {
	'Ashley Maynor'      : 'arm12@nyu.edu', //Director, Library Lab & Special Projects
	'Austin Booth'       : 'austin.booth@nyu.edu', // Dean, Division of Libraries
	'Joanna Waley-Cohen' : 'joanna.waleycohen@nyu.edu', // Provost, NYU Shanghai 
	'Susan Kaplan Jacobs': 'susan.jacobs@nyu.edu', //Health Sciences Librarian


	'Wei Guo'            : ''
}


// any empty reports or notificationRead
const TO_CAST_SUB = [
  'NO Shanghai Paging Requests to Report',
  'NO NYUSH Booking Requests to Report',
  'There were NO Shanghai Expired Holds to Report',
  'Return Receipt',
  'NYU Shanghai Group Study Room Schedule'
];

// any non-empty or with-attachments reports exclude nightly overdue
const TO_KEEP_SUB = [
	// attachment: true
	'NYU52 ILL Rush Orders Report',
	'Shanghai Patrons who owe more than 100 Report',
	'NYU SH Inventory Report',

	//attachment: false
	'Shanghai New Holds Report',
	'ALEPH SHANGHAI Paging Request Report',
	'CLANCY Offsite Requests'
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


/* --------------------------- ATTENTION  -------------------------*/
/*
1. time-drive triggers better be created using GUI, unless in need of conditions
2. catagorize email from within inbox and clean the useless later regularly
3. self-made array not working with arrays created by gmail class
+  use its class to add a group of similar threads at one time
4. can star ONLY msgs, though hasStarredMessages() can detect such threads
+  thus, for thds with a single msg, it is good to star them, leaving imp for others

*/

/* --------------------------- run hourly ----------------------- */
/* libnoty watcher */
// deal with daily lib notifications with various subjects, which can be divided
// into two groups: 1. nth to report; 2. sth to report 
// run every 4 hours
function libNotyWatcher() {
	var libThreadsFilters = `from:${CONTACTS.LIB} OR from:${CONTACTS.EMS} OR from:${CONTACTS.OFF} label:inbox is:unread`;
	var libThreads = find(libThreadsFilters, batchLength=50);

  for (var i = 0; i < libThreads.length; i++) {
    // get the subject of the first message from each thread
    var subject = libThreads[i].getFirstMessageSubject();

    // if nth to report, discard
 		subjectChecker(libThreads[i], subject, TO_CAST_SUB, LIB_NOTY.CAST)
 		// if sth to report, label keep first
 		subjectChecker(libThreads[i], subject, TO_KEEP_SUB, LIB_NOTY.KEEP)
  }
}


/* --------------------------- run daily ----------------------- */
/* libAll.gs */
// take care of messages to lib-all@nyu.edu
// run daily at noon 12:00-1:00PM
function libAll() {
	// lib-all invitations --> discard all except workshops
	var inviteFilters = `to:${CONTACTS.ALL} (invite.ics OR invite.vcs) has:attachment -subject:workshop`;
	var inviteThreads = find(inviteFilters);
	preClean('LibNoty/Discard', inviteThreads);

	// to:lib-all from:heads 
}



/* notify@google and ares class reprot */
/* notify google */
// deal with ares class report and notify google
// run every 24 hours at 12:00PM-1:00PM
function notifyGoogle() {
	// if read, label discard + unimport and archive
	var readFilters = `from:${CONTACTS.NTF} label:inbox is:read`;
	var read = find(readFilters);

	// if unread for more than one day, 
	// label discard + unimportant and archive
	var unreadForeverFilters = `from:${CONTACTS.NTF} label:inbox is:unread older_than:1d`;
  var unreadForever = find(unreadForeverFilters);

  // if unread for less than one day, keep it unread until the next loop
	var unreadOneDayFilters = `from:${CONTACTS.NTF} label:inbox is:unread newer_than:1d`;
	var unreadOneDay = find(unreadOneDayFilters);
	
	if (read.length !== 0) {
		preClean('LibNoty/Discard', read)
	}
  
	if (unreadForever.length !== 0) {
		preClean('LibNoty/Discard', unreadForever);
	}
	if (unreadOneDay.length !== 0) {
		GmailApp.markThreadsUnimportant(unreadOneDay);
  	label('LibNoty/Keep').addToThreads(ureadOneDay);
	}

	// trash those older than 1d regardless of label and (un)read status
	var oldNotiFilters = `from:${CONTACTS.NTF} older_than:1d`;
	var oldNotiThreads = find(oldNotiFilters);
	forceClean(oldNotiThreads);
}

/* Ares Merged Classes */
// deal with merged classes report
// run every 24 hours at 2:00PM
function aresMergedClasses() {
	var aresFilters = `from:${CONTACTS.ARE} label:inbox`;
	var aresThreads = find(aresFilters);
    // in case some are important by default, undo this!
  GmailApp.markThreadsUnimportant(aresThreads);
    
    // star the NoSH message (a thread with a single msg) 
	for (var thread of aresThreads) {
		var msgnum = thread.getMessageCount();
        var msg = thread.getMessages();   
		if (msgnum == 1) {GmailApp.starMessages(msg);}
  }
  
	// find those starred NoSH threads and trash
	var aresNoSHFilters = `from:${CONTACTS.ARE} label:inbox is:starred`;
	var aresNoSHThreads = find(aresNoSHFilters);
	forceClean(aresNoSHThreads);
  
  // deal with SH threads, if (unread and older than 1d or more), discard
  var aresSHUnreadFilters = `from:${CONTACTS.ARE} label:inbox is:unread older_than:1d`;
  var aresSHUnreadThreads = find(aresSHUnreadFilters);
  preClean('LibNoty/Discard', aresSHUnreadThreads);
    
  // if read, trash
  var aresSHReadFilters = `from:${CONTACTS.ARE} label:inbox is:read`;
  var aresSHReadThreads = find(aresSHReadFilters);
  forceClean(aresSHReadThreads);
}



/* --------------------------- run weekly ----------------------- */



/* --------------------------- run monthly----------------------- */
// change label to discard for notification previously labelled 'keep'
function libNotyCleaner() {
	// first, discard attach-free threads
	var noAttachFilters = `label:${LIB_NOTY.KEEP} -has:attachment`;
	var noAttachthreads = find(noAttachFilters);
	labelSwap(LIB_NOTY.KEEP, LIB_NOTY.CAST, noAttachthreads);

	// then, find all the 'discard' threads
	// do the trash n=length/100 times
	do {
		var discards = find('LibNoty/Discard', shouldLimit=false);
		var times = discards.length/100;
		GmailApp.moveThreadsToTrash(discards);
	}
	while (times > 1);
	
	
};

/* ------------------------ customized funcs --------------------- */
// check subject and label accordingly
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

// get things ready for cleaner
// mark read + unimportant, label discard, archive
function preClean(labelName, threads) {
	for (var thread of threads) {
		var messages = thread.getMessages();
		GmailApp.unstarMessages(messages);
	}
	GmailApp.markThreadsUnimportant(threads);
	GmailApp.markThreadsRead(threads);
	label(labelName).addToThreads(threads);
	GmailApp.moveThreadsToArchive(threads);
};

/* force clean */
// {unimportant + read + trash} threads
function forceClean(threads) {
	GmailApp.markThreadsUnimportant(threads);
	GmailApp.markThreadsRead(threads);
	GmailApp.moveThreadsToTrash(threads);
}

/* find.gs */
function find(searchString, shouldLimit, batchLength) {
  // The Gmail Service won't make changes to more than 100 threads
  // at a time, so batchLength defaults to 100.
  // shouldLimit here is like a switch, when defiend, it means
  // no need to limit, which is rarely the case
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

/* label swapper */
function labelSwap(oldLabel, newLable, threads) {
	oldLabel.removeFromThreads(threads);
	newLable.addToThreads(threads);
}


/* ===================== triggers ================ */
/* ===================== deprecated ================ */
// run every 4 hours
// function manager() {
// 	// run every 4 hours
//   var hourjob = ScriptApp.newTrigger('libNotyWatcher').timeBased();
//   hourjob.everyHours(4)
//   .create();

//   // run every two months
//   var fortnightjob = ScriptApp.newTrigger('libNotyCleaner').timeBased();
//   fortnightjob.atHour(10)
//   .onWeekDay(ScriptApp.WeekDay.SATURDAT)
//   .everyWeeks(8)
//   .create();
// };