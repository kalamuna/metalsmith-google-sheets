/*
 * metalsmith-kalastatic-dot-module
*/

'use strict';

var debug = require("debug")("metalsmith-kalastatic-dot-module"),
    request = require("request");

module.exports = function plugin( data ) {

    data = (('object' === typeof data)? data : undefined) || {};

    var stylesURL = data.stylesURL,
        scriptsURL = data.scriptsURL;

    return function through (files, metalsmith, done) {

      function requestResource(url,cb) {
        request(url, function(err,res,bod){
          if( !err && res.statusCode === 200 ) {
            cb(bod);
          } else {
            console.log(err);
            cb(err);
          }
        });
      }

      function asyncDone(){
        if(metadata.kstaticResources.styles && metadata.kstaticResources.scripts) {
          done();
        }
      }

      var metadata = metalsmith.metadata();
      metadata.kstaticResources = {};
      requestResource(stylesURL, function(res){
          metadata.kstaticResources.styles = res;
          asyncDone();
      });
      requestResource(scriptsURL, function(res){
        metadata.kstaticResources.scripts = res;
        asyncDone();
      });


    };
}
