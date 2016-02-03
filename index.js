/*
 * metalsmith-google-sheets
*/

'use strict';

var GoogleSpreadsheet = require("google-spreadsheet"),
    asForEach = require('async-foreach').forEach;

module.exports = function plugin(opts) {

  var worksheets = {};

  opts = opts || {};

  function uploader(i) {
    if( i < filenames.length ) {
      upload( filenames[i], function(err) {
        if( err ) {
          console.log('error: '+err)
        }
        else {
          uploader(i+1)
        }
      })
    }
  }
  uploader(0)




// spreadsheet key is the long id in the sheets URL
// @todo, set it up to handle an array
var creds = {
  client_email: opts.serviceAccountEmail,
  private_key: opts.privateKey
}

return function through (files, metalsmith, done) {

  // loop through the keys
  for( var key in opts.sheetKeys ) {

    var myGSheet = new GoogleSpreadsheet(key);

    function getSheets(i) {

        // if opts.publicSheet
        // else if opts.privateSheet
        if(key.private){
          loadPrivateSheet(myGSheet,creds);
        } else {
          loadPublicSheet(nyGSheet);
        }
      }
    }
  }
}

function loadPrivateSheet(creds){
  myGSheet.useServiceAccountAuth(creds, function(err){
    if( err ) console.log( "Error:", err);
    console.log( "myGSheet »»", myGSheet );
    myGSheet.getInfo( function( err, info ){
      var url = info.id.substr(0, info.id.indexOf("private/full"));
      // console.log( "url", url );
      if( err ) console.log(err);
      var sheets = info.worksheets;
      sheets.forEach(function(aSheet){
        aSheet.getCells(function(err, cells){
          var outputCells = {};
          for( var aCell in cells ){
            var cellId = cells[aCell].id;
            var newId = cellId.substr( cellId.lastIndexOf("/")+1, cellId.length );
            outputCells[newId] = cells[aCell];
          }
          // console.log("»» cells",cells);
        });

loadPublicSheet(nyGSheet);      })
    };
  });
}

function spreadSheetLoaded(aSheet){
  worksheets[aSheet.title] = {
    title: aSheet.title,
    id: aSheet.id,
    cells: outputCells
  };
  if(done) allDone();
}

function allDone(){
  var metadata = metalsmith.metadata();
  metadata.gSheets = worksheets;
  // console.log("D2",worksheets["Sheet1"].cells["R2C4"]);
  done();
}
