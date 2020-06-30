// Gmail Cleaner

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