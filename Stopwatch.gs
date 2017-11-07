function setValue(cellName, value){
  SpreadsheetApp.getActiveSpreadsheet().getRange(cellName).setValue(value);
}

function getNextRow(){
  return SpreadsheetApp.getActiveSpreadsheet().getLastRow() +1;
}

function getValue(cellName){
  return SpreadsheetApp.getActiveSpreadsheet().getRange(cellName).getValue();
}

/*TO DO: ******
convert to ES6
clear values on one line of code per function
Convert the row starting number to a function based on title value of header
MS converter into one const and replace throughout
**************/

function Personal(){
  setValue('c14',new Date()); //sets timestamp when you hit instruction button
  setValue('d14',''); //clear that timestamp
  setValue('e14','');
  setValue('f14','');
  setValue('g14','');
}

function Instruction() {
  setValue('d14',new Date()); //sets timestamp when you hit instruction button
  setValue('c14',''); //clear that timestamp
  setValue('e14','');
  setValue('f14','');
  setValue('g14','');
}

function Project() {
  setValue('e14',new Date());
  setValue('c14',''); //clear that timestamp
  setValue('d14','');
  setValue('f14','');
  setValue('g14','');
}

function Formstack() {
  setValue('f14',new Date());
  setValue('c14',''); //clear that timestamp
  setValue('d14','');
  setValue('e14','');
  setValue('g14','');
}

function enterNotes() {
  setValue('g14', new Date());  //sets finish timestamp
  var durationPersonal = (getValue('c14') != '') ? ((new Date() - getValue('c14'))/(1000*60*60*24)) : ''; //convert from ms back to timestamp duration
  var durationI = (getValue('d14') != '') ? ((new Date() - getValue('d14'))/(1000*60*60*24)) : ''; //convert from ms back to timestamp duration
  var durationProj = (getValue('e14') != '') ? ((new Date() - getValue('e14'))/(1000*60*60*24)) : ''; //convert from ms back to timestamp duration
  var durationF = (getValue('f14') != '') ? ((new Date() - getValue('f14'))/(1000*60*60*24)) : ''; //convert from ms back to timestamp duration
  
  addRecord(new Date(),durationPersonal,durationI,durationProj,durationF);

  //run sum function
  var row = getNextRow()-1;
  var rowBefore = getNextRow()-2;
  var cell = SpreadsheetApp.getActiveSpreadsheet().getRange("h"+row);
  var cellBefore = 'h'+rowBefore;
  cell.setFormula('=SUM(C'+row+':F'+row+')+'+cellBefore+'');
}

function addRecord(b,c,d,e,f) {
  var row = getNextRow();
  setValue('B' + row, b);
  setValue('C' + row, c); //where C is the column, and c is the value
  setValue('D' + row, d);
  setValue('E' + row, e);
  setValue('F' + row, f);
}


