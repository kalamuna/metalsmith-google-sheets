var googleSheets = require('..'),
    assert = require('assert'),
    equal = require('fs-equals'),
    swig = require('swig'),
    Metalsmith = require('metalsmith'),
    templates = require('metalsmith-templates'),
    markdown = require('metalsmith-markdown'),
    rm = require('rimraf').sync;


describe('metalsmith-google-sheets', function(){

  it('should match the value of coulumn D2', function(done){

    rm('test/fixtures/build');

    var m = Metalsmith('test/fixtures')
        .use(googleSheets({
          key: "1s_8wOCJWO8RrY74W9JvpPj417-GbW5mQ0jYRgf4hsQ0",
          serviceAccountEmail: "kstat-885@poetic-diorama-112722.iam.gserviceaccount.com",
          privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQChnt/NH/5AvgVH\niZvI4mN7N4GSR2Sp0yeXKL3GUVvCeo3/hQrxvwSUGHIGEoX9K+faOsFhLCHxsb+p\nXL2h3wPnBI79tvNLM9QbDLXJ9W5x1zMjE767mK6NDA6znibSeJpSAg80BJNKsS/6\n1KQDiisj2RSCCm58HmjS65rSwj7pffymYCKkYh5X4rcn8if/OpVlviIjGCWS/GNq\nWXsvVJSqkzi4t7jnvZjr9gdt7SR+NYm4n3bd+pO7EPeOwSxi1eqTKcAhbvFukuQE\nfL5RtSpuznKJDEVpDT3jBfv1pg84QX2hGUnbE7bOUJyfjdNSftmcpNnfHqT74jhJ\nOMFNY2ixAgMBAAECggEAYqGtXOZoaKROXoD5JFgcc+bE2TtekFE/eP0xC2U9RWs7\nWzObITr8lVBxzYjiYkW4IbL3rtCbCn/6QmZJiA6suABNL0LGKR/BEpzoGA8CztCQ\n8ZgsLxoXdBZmpnEeqhVVwDRniMw+Azgs2ruIOGzKtP7WiCHLmU2JlSaZfoNyl1UG\nFmwPvAI48Vea6XUYt59tQPwtZsijxB9Z/lf1ZhcI3NwDMpt8wX3n/eVzJu/QPOVa\nsKGENkD7SejAqFwFq1C2VhF460eLSKcXUoOxjU25zzFnOO0DFKwfmzfMzm00Hddk\ndCf4kObQ+0Ldl1TPBH+tCaPvP2b0vqEPNtnIwLyvTQKBgQDVviiFZN8/GSAMF11K\nY5sKdWzRVy2PEdVWi8z/i69aHed/kZgOV2cLcP6XdD2DTs2OQj6z+ExfhvKChwC5\n4k5WbJ/FoMm1UDYmY7aENjd7gSo8AQHa0/BtcFl46+4bT85ahrWknDd75B28sPbs\nIRPcC9+8lgq78mn9h7Zqwgn5BwKBgQDBkrvNdV4p7ROIyByRYfAzM0lU0qmcIDy9\n6TgdnHYBACX/U8VzeOaJGnwF9NdDI9ybhVrCJLOXBRRIW76+lhJ/XLXODPEOG7+T\nXbaJxzW36Lyxg6eWg1/n2NqIkRoRMP5ADonkXVnqwC9Sv49rF6TUwiVbh/U69qcN\naCQj2L66hwKBgA/2GVSMydcOa0Q74m2RrpxDVJL1baOHc2T5H5/dsISMQyNVngNE\nJ5/FGl35AjbyBYugCsqpuhpQG3//0OAQtETj67J4ZVey27hWLeUFn3MLnDnK4XaT\n6RpjD2tmQuurM/+ym5HlUIdh646RsH7FoZQHFvggREDww1V5cvfZ8aC1AoGAB19P\nR8Pwkig1VkBI1kCkpU6OvGxJiWiw54q6WGZdGCypRdAq9PrlzNL1ZkSs7iGvhTzO\n+BXtwRKwcxELcrbEfZVKV06m36Ku6S3ohdbQdPCoPxqEh3b5cBsSN6FPHNiA1m+3\nULs9cXNgWgZxr+J2pKPASHwlGtnKAvi0Z6kZmoECgYAQLi6PspNwFc+GONtyIAm8\nxLPn/ZW5Pr9YOjn7AyiyPD3aPFQeEQDdvrgHFEeelfh9j6mkHipmhNypyuFzEtcQ\nQjwTkQy3HnZFW/Lf0f0L/kFdPxxAlFICfFBXyIW/695XnePkAayDlLmyNwgvtPuF\nvWXNZbQnrWA0VSDBZKjAsA==\n-----END PRIVATE KEY-----\n"
        }))
        .use(markdown({}))
        .use(templates({
          engine: 'swig',
          directory: 'templates'
        }))

    m.build(function(err){
      if (err) return done(err);
      assert(true);
      equal('test/fixtures/build/output.html', 'test/fixtures/expected/output.html');
      done();
    });
  });

});
