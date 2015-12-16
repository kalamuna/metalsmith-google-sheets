var kstatDotMod = require('..'),
    equal = require('fs-equals'),
    swig = require('swig'),
    Metalsmith = require('metalsmith'),
    templates = require('metalsmith-templates'),
    markdown = require('metalsmith-markdown'),
    rm = require('rimraf').sync;


describe('metalsmith-kalastatic-dot-module', function(){

  it('should have cssURL metadata', function(done){

    rm('test/fixtures/build');

    var m = Metalsmith('test/fixtures')
        .use(kstatDotMod({
          stylesURL: "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css",
          scriptsURL: "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js"
        }))
        .use(markdown({}))
        .use(templates({
          engine: 'swig',
          directory: 'templates'
        }))

    m.build(function(err){
      if (err) return done(err);
      equal('test/fixtures/build/scripts.html', 'test/fixtures/expected/scripts.html');
      equal('test/fixtures/build/styles.html', 'test/fixtures/expected/styles.html');
      done();
    });
  });

});
