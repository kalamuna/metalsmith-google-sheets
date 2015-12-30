# metalsmith-kalastatic-dot-module
Metalsmith plugin to automatically ingest Drupal resources (css/js) provided by [kalastatic-dot-module](https://www.drupal.org/sandbox/sonictruth/2624634)

Given ```stylesURL``` and ```scriptsURL``` (of a drupal instance with the  eg: ```http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css``` and ```http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js``` metalsmith-kalastatic-dot-module creates metadata of the snippets for your kalastatic build to include those assets in your prototype (to prototype against the same base-styles and scripts of the final site).

## Usage
```npm install metalsmith-kalastatic-dot-module --save```

### CLI
add to metalsmith.json up top…
```
    "metalsmith-kalastatic-dot-module": {
      "stylesURL": "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css",
      "scriptsURL": "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js"
    },
```

### JS
```
  var kstatDotMod = require('metalsmith-kalastatic-dot-module');
  var Metalsmith = require('metalsmith');

  var m = Metalsmith()
  .use(kstatDotMod({
    stylesURL: "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-css",
    scriptsURL: "http://kalastatic-kalatheme.at.kalamuna.com/kalastatic/drupal-js"
  }))
  m.build();
  ```
  
  your variables will now be available as
  ```kstatic.scripts``` and ```kstatic.styles```
