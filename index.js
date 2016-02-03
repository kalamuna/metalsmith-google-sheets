/*
 * metalsmith-google-sheets
*/

'use strict';

var GoogleSpreadsheet = require("google-spreadsheet");

module.exports = function plugin(opts) {

  opts = opts || {};

  // spreadsheet key is the long id in the sheets URL
  // @todo, set it up to handle an array
  var myGSheet = new GoogleSpreadsheet(opts.key);
  var creds = {
    client_email: opts.serviceAccountEmail,
    private_key: opts.privateKey
  }

  return function through (files, metalsmith, done) {

    var worksheets = {};
    function getSheets(cb) {
      myGSheet.useServiceAccountAuth(creds, function(err){
        if( err ) console.log( "Error:", err);
        // console.log( "myGSheet »»", myGSheet );
        myGSheet.getInfo( function( err, info ){
          var url = info.id.substr(0, info.id.indexOf("private/full"));
          // console.log( "url", url );
          if( err ) console.log(err);
          var sheets = info.worksheets;
          sheets.forEach(function(aSheet){
            var sheetRows = [];
            aSheet.getRows(function(err, rows){
              if( err ){
                console.log(err);
              } else {
                for( var row in rows ) {
                  sheetRows.unshift(rows[row]);
                }
              }
            });
            aSheet.getCells(function(err, cells){
                var outputCells = {};
                for( var aCell in cells ){
                  var cellId = cells[aCell].id;
                  var newId = cellId.substr( cellId.lastIndexOf("/")+1, cellId.length );
                  outputCells[newId] = cells[aCell];
                }
                worksheets[aSheet.title] = {
                  title: aSheet.title,
                  id: aSheet.id,
                  cells: outputCells,
                  rows: sheetRows
                };
                if(Object.keys(worksheets).length == sheets.length) {
                  allDone();
                }
            });
          });
        });
      });
    }

    function allDone(){
      var metadata = metalsmith.metadata();
      metadata.gSheets = worksheets;
      done();
    }

    getSheets(allDone);

  }
}
