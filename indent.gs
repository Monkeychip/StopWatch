var ss = SpreadsheetApp.getActiveSpreadsheet();

function moveText(direction) {
  var values = ss.getActiveRange().getValues();
  var cols = ss.getActiveRange().getNumColumns();
  var rows = ss.getActiveRange().getNumRows();

  var newValues = new Array();

  for (x = 1; x <= rows; x++) {
    for (y = 1; y <= cols; y++) {
      var cell = ss.getActiveRange().getCell(x, y);
      var value = cell.getValue();
      var formula = (direction == ">>>") ? '=CONCAT(REPT( CHAR( 160 ), 5),"' + value + '")'
      : '=IF(TRIM(LEFT("' + value + '", 5))=CONCAT(REPT( CHAR( 160 ), 5),""), MID("' + value + '", 6, LEN("' + value + '")), TRIM("' + value + '"))';
      
      if (value != '') {
        cell.setFormula([formula]);
        cell.setValue(cell.getValue());
      } else {
        cell.setValue(['']);
      }
    }
  }
};

function indentText() {
  moveText(">>>");
};

function flushLeft() {
  moveText("<<<");

};

function onOpen() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet();

  var entries = [{
    name : ">>>",
    functionName : "indentText"
  },{
    name : "<<<",
    functionName : "flushLeft"

  }];
  sheet.addMenu("Indent Text", entries);
};