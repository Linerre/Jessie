/* 
calculate the turns the patrons will take 
to borrow the two books 
*/

// Patron
var PATRONS = {
  stuA: 'Jerry',
  stuB: 'Zeping',
  stuC: 'Kennedy',
  intr: 'Stavros'
};

// Status
var STATUS = {
  bookA: 'See Yourself Sensing',
  bookB: 'See Yourself X',
  wait : 'Waiting'
};

// algorithm
function test() {
  // default way of getting the active (woriking) sheet [ATM, subject to change]
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];

  // Passing only two arguments returns a "range" with a single cell.
  var range = sheet.getRange('B2');
  var value = range.getValues();

  // get the patrons and their status in last round

  // loop over them
  // if status is book a or book b, then waiting

  // else if status is waiting + book_a (last round), then book_b

  // else if status is waiting + book_b (last round), then book_a

  // rowN += 4, colN remains the same

}

