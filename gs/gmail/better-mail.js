// check inbox to automate some daily routines

// senders
const LIBREPORT = "lib-dba@nyu.edu";
const GROUPSTUD = "DoNotReply_EMS_Notification@nyu.edu";

// Subjects
var subjects = [
  'NO Shanghai Paging Requests to Report',			// 2:00AM 8:00PM
  'NO NYUSH Booking Requests to Report',			// 8:00AM 3:00PM
  'There were NO Shanghai Expired Holds to Report',	// 12:01PM
];


// Labels
const LIBNOTY = {
  DISCARD: GmailApp.getUserLabelByName('LibNoty/Discard'),
  KEEP   : GmailApp.getUserLabelByName('LibNoty/Keep'),
  REVIEW : GmailApp.getUserLabelByName('LibNoty/Review')
};

  

// get the first 200 threads from inbox and the needed label
var threads = GmailApp.getInboxThreads(0,200);
  

// deal with group study room report
function testFeature() {
  for (var i = 0; i < threads.length; i++) {
    // no group study room report
    if (threads[i].getMessages()[0].getFrom() == GROUPSTUD && threads[10].getMessages()[0].getAttachments().length == 0) {
      // mark as read, label with Discard and archive
      threads[i].markRead();
      LIBNOTY.DISCARD.addToThread(threads[i]);
      threads[i].moveToArchive();
  
    // with report attahcment
    } else if (threads[i].getMessages()[0].getFrom() == GROUPSTUD && threads[10].getMessages()[0].getAttachments().length != 0) {
      // keep it unread, label with Review but archive later
      LIBNOTY.Review.addToThread(threads[i]);
    }
  }
}
  
  
function libNotyWatcher() {
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
}


// run every 4 hours
function manager() {
  var builder = ScriptApp.newTrigger('libNotyWatcher').timeBased();
  builder.everyHours(4);
  builder.create();
}