// Gmail Cleaner


/* ------------------- Tool 1 ------------------- */ 
// find and clean the "someone mentioned you in a comment" notifications from Google
function commentsCleaner()
{
  // criteria
  var filters = 'from:comments-noreply@docs.google.com label:inbox is:read';
  
  // get a list of such threads; there might also be none
  var threads = GmailApp.find(filters);
  
  if (threads.length > 0) //if there is any
  {
    // mark unimportant and throw to trash
    GmailApp.markThreadsUnimportant(threads);
    GmailApp.moveThreadsToTrash(threads);
  }
}

/* ------------------- Tool 2 ------------------- */ 
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
    var threadsRead = GmailApp.find(`from:${news} is:read label:inbox`);
  
    // also those unread for one day
    var threadsUnread = GmailApp.find(`from:${news} is:unread label:inbox older_than:1d`);
  
    // Trash them regardless of reading or not
    GmailApp.moveThreadsToTrash(threadsRead);
    GmailApp.moveThreadsToTrash(threadsUnread);
  }
}


/* ------------------- Tool 3 ------------------- */ 
// trash and label invitations sent to me (lunch&learn; meetings; events, etc)
// rather than sent to a list which inludes me
function invitationCleaner() {
  // if read, trash
  var inviteAttch = '(invite.ics OR invite.vcs)';
  var inviteReadFilters = `to:me ${inviteAttch} label:inbox has:attachment is:read`;
  var inviteReadThreads = find(inviteReadFilters);
  label('RSVP?').removeFromThreads(inviteReadThreads);
  forceClean(inviteReadThreads);

  // if unread for over one day, trash
  var inviteUnreadLongFilters = `to:me ${inviteAttch} label:inbox has:attachment is:unread older_than:1d`;
  var inviteUnreadLongThreads = find(inviteUnreadLongFilters);
  label('RSVP?').removeFromThreads(inviteUnreadLongThreads);
  forceClean(inviteUnreadLongThreads);

  // if unread within one day (To Be Decided), label RSVP? and remain unread
  var inviteTBDFilters = `to:me ${inviteAttch} label:inbox has:attachment is:unread newer_than:1d`;
  var inviteTBDThreads = find(inviteTBDFilters);
  label('RSVP?').addToThreads(inviteTBDThreads);
}


/* -------------------------- auxiliary tools -------------------------- */
// The Gmail Service won't make changes to more than 100 threads \
// at a time, so batchLength defaults to 100.
/* find */
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
}


/* label */
function label(name) {
  // This only works for user-defined labels,
  // not system labels like "Spam."
  return GmailApp.getUserLabelByName(name);
}

/* force clean */
// {unimportant + read + trash} threads
function forceClean(threads) {
  GmailApp.markThreadsUnimportant(threads);
  GmailApp.markThreadsRead(threads);
  GmailApp.moveThreadsToTrash(threads);
}