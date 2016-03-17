# metalsmith-google-sheets
Metalsmith plugin to ingest google-sheets using node-google-spreadsheets

## Configuring the sheets and the API
See [node-google-spreadsheet docs](https://github.com/theoephraim/node-google-spreadsheet/#authentication)

## Installation

```npm --save metalsmith-google-sheets```

## Usage
For now please review the [tests](https://github.com/kalamuna/metalsmith-google-sheets/tree/master/test)

You need to have a Google API account, and set up your sheet accordingly, instructions here: [node-google-spreadsheet docs](https://github.com/theoephraim/node-google-spreadsheet/#authentication)


### CLI
```
"metalsmith-google-sheets": {
  "key": "THE_SPREADSHEET_KEY",
  "serviceAccountEmail": "YOUR_APP_EMAIL_ADDRESS",
  "privateKey": "YOUR_API_PRIVATE_KEY_HERE"
}
```

### JS
```
.use(googleSheets({
  key: "THE_SPREADSHEET_KEY",
  serviceAccountEmail: "YOUR_APP_EMAIL_ADDRESS",
  privateKey: "YOUR_API_PRIVATE_KEY_HERE"
}))
```
