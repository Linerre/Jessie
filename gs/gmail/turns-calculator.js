/* 
calculate the turns the patrons will take 
to borrow the two books 
*/

// Patron
const PATRONS = {
  stuA: 'Jerry',
  stuB: 'Zeping',
  stuC: 'Kennedy',
  intr: 'Stavros'
};

// Status
const STATUS = {
  bookA: 'See Yourself Sensing',
  bookB: 'See Yourself X',
  wait : 'waiting'
};

// algorithm
function changeTurns() {
  // default way of getting the active (woriking) sheet [ATM, subject to change]
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  sheet.appendRow(['Patron', 'Status', 'Last Round']);

  // get the newly added and set font and bg color to it
  var last = sheet.getLastRow();
  sheet.getRange(`A${last}:C${last}`).setFontColor('#EBCB8B');
  sheet.getRange(`A${last}:C${last}`).setBackgroundColor('#2E3440');

  for (var i = last + 1; i < last + 5; i++) {
  	var patronInfo = sheet.getRange(`A${i-5}:C${i-5}`).getValues();
  	var patronName = patronInfo[0][0];
  	var patronStat = patronInfo[0][1];
  	var patronLast = patronInfo[0][2];
  	// if status is book a or book b, then waiting
  	if (patronStat == STATUS.bookA || patronStat == STATUS.bookB) {
  		sheet.appendRow([patronName, STATUS.wait, patronStat]);
  	} 
		// else if status is waiting + book_a (last round), then book_b
  	else if (patronStat == STATUS.wait && patronLast == STATUS.bookA) { 
  		sheet.appendRow([patronName, STATUS.bookB, patronStat]);
  	} 
  	// else if status is waiting + book_b (last round), then book_a
	else if (patronStat == STATUS.wait && patronLast == STATUS.bookB) {
		sheet.appendRow([patronName, STATUS.bookA, patronStat]);
  	}
    }
}

