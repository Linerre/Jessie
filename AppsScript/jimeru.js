// Gmail Cleaner

/* ------------------- Tool 1 ------------------- */ 
// check labeled threads in the inbox and archive them automatically
function archiver()
{
  var threads = GmailApp.getInboxThreads();
  for (var thread of threads)
  {
    // get user-created labels, so inbox will be excluded
    labels = thread.getLabels();

    if (labels.length > 0) 
    {
      thread.markUnimportant();
      thread.moveToArchive();
    }
    else continue;
  }
}


/* ------------------- Tool 2 ------------------- */ 
// find and clean the "someone mentioned you in a comment" notifications from Google
function commentsCleaner()
{
  // criteria
  var filters = 'from:comments-noreply@docs.google.com label:inbox is:read';
  
  // get a list of such threads; there might also be none
  var threads = GmailApp.search(filters);
  
  if (threads.length > 0) //if there is any
  {
    // mark unimportant and throw to trash
    GmailApp.markThreadsUnimportant(threads);
    GmailApp.moveThreadsToTrash(threads);
  }
}

/* ------------------- Tool 3 ------------------- */ 
// create a list of newsletter sources
const NEWS = [
  //newletter0,
  'noreply@mail.bloombergbusiness.com',
 
  // newsletter1,
  
  // newsletter2,
  
  // ...
  
];  


function newsCleaner() 
{
  for (var news of NEWS)
  {
    // find those alraedy read 
    var threadsRead = GmailApp.search(`from:${news} is:read label:inbox`);
  
    // also those unread for one day
    var threadsUnread = GmailApp.search(`from:${news} is:unread label:inbox older_than:1d`);
  
    // Trash them regardless of reading or not
    GmailApp.moveThreadsToTrash(threadsRead);
    GmailApp.moveThreadsToTrash(threadsUnread);
  }
}