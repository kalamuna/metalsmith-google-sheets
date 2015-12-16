/*
 * metalsmith-kalastatic-dot-module
*/

'use strict';

var request = require("request");

module.exports = function plugin(opts) {

    opts = opts || {};

    var stylesURL = opts.stylesURL,
        scriptsURL = opts.scriptsURL;

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

      function asyncDone(done){
        if(metadata.kstatic.styles && metadata.kstatic.scripts) {
          done();
        }
      }

      var metadata = metalsmith.metadata();
      metadata.kstatic = {};
      requestResource(stylesURL, function(res){
          metadata.kstatic.styles = res;
          asyncDone(done);
      });
      requestResource(scriptsURL, function(res){
        metadata.kstatic.scripts = res;
        asyncDone(done);
      });


    };
}
