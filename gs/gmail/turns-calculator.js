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
  wait : 'Waiting'
};

// coordinates
const COOR = {
	row: 7, // starting point, ever-changing
	col: 3 //  fixed, unless further adjustment
};

// algorithm
function test() {
  // default way of getting the active (woriking) sheet [ATM, subject to change]
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheets()[0];
  sheet.appendRow(['Patron', 'Status', 'Last Round']);
  
  for (var i = COOR.row; i < COOR.row + 4; i++) {
  	var patronInfo = sheet.getRange(`A${i}:C${i}`).getValues();
  	var patronName = patronInfo[0][0];
  	var patronStat = patronInfo[0][1];
  	var patronLast = patronInfo[0][2];
  	// if status is book a or book b, then waiting
  	if (patronStat == STATUS.bookA || patronStat == STATUS.bookB) {
  		sheet.appendRow([patronName, 'waiting', patronStat]);
  	} else continue;
	}
  // else if status is waiting + book_a (last round), then book_b

  // else if status is waiting + book_b (last round), then book_a

  // rowN += 4, colN remains the same

}

