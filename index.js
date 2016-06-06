var express = require('express');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.set('trust proxy', true);


app.get('/api/whoami', function(request, response) {
  var resObj = {
    ipaddress: request.ip,
    language: request.get('Accept-Language').split(',')[0],
    software: "unknown"
  };

  var userAgent = request.get('User-Agent');
  var matched = userAgent.match(/^Mozilla\/[^ ]+ \(([^\)]+)\) /);
  if (matched) {
    resObj.software = matched[1];
  }
  response.send(resObj);
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

