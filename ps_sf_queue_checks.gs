function ps_sf_queue_checks() {
  
  //Feel free to modify 'Full report' so that it matches the name of the sheet where the Salesforce Report will be pasted.
  var important_sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Full report');
  
  //Feel free to modify 'Outcome' so that it matches the name of the sheet where the processed info should be landing.
  var important_sheet2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Outcome');
  
  var dataRange_important_sheet1 = important_sheet1.getDataRange();
  var values_important_sheet1 = dataRange_important_sheet1.getValues();
  
  var dataRange_important_sheet2 = important_sheet2.getDataRange();
  var values_important_sheet2 = dataRange_important_sheet2.getValues();
  
  
  var FriendlyQueueCheck = '';
  var NearSLA = '';
  var OutofSLA = '';
  
  var queue = '';
  var amount = 0;
  
  var days;
  var hours;
  var ID;
  
  var ui = SpreadsheetApp.getUi();
  
  for (var i = 2; i <= values_important_sheet1.length; i++){
    queue = values_important_sheet1[i-1][1].toString();
    if (FriendlyQueueCheck.indexOf(queue) == -1){
      amount = amount + 1;
      for (var j = i + 1; j <= values_important_sheet1.length; j++){
        if (values_important_sheet1[j-1][1].toString() == queue){
          amount = amount + 1;
        }
      }
      if (FriendlyQueueCheck == ''){
        FriendlyQueueCheck = queue + ' - ' + amount;
      }
      else{
        FriendlyQueueCheck = FriendlyQueueCheck + '\n' + queue + ' - ' + amount;
      }
      amount = 0;
    }
    
    hours = values_important_sheet1[i-1][2];
    
    if (hours >= 12 && hours <= 24){
      ID = values_important_sheet1[i-1][0];
      if (NearSLA == ''){
        NearSLA = queue + ' - ' + ID;
      }
      else{
        NearSLA = NearSLA + '\n' + queue + ' - ' + ID;
      }
    }
    else if (hours > 24){
      ID = values_important_sheet1[i-1][0];
      if (OutofSLA == ''){
        OutofSLA = queue + ' - ' + ID + ' - (' + Math.floor(hours/24)  + ' days old)';
      }
      else{
        OutofSLA = OutofSLA + '\n' + queue + ' - ' + ID + ' - (' + Math.floor(hours/24) + ' days old)';
      }
    }
  }
  important_sheet2.getRange(2,1).setValue(FriendlyQueueCheck);
  important_sheet2.getRange(2,2).setValue(OutofSLA);
  important_sheet2.getRange(2,3).setValue(NearSLA);
}
