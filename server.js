var app = require("express")();
var url = require("url");

app.use("/", function (req, res) {
  var parsedUrl = decodeURI(url.parse(req.url, true).path.slice(1));
  
  var dateFormattingOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
  }
  
  if (isNaN(parsedUrl)) {
    var naturalDate = new Date(parsedUrl);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
    var unixTime = new Date(parsedUrl).getTime() / 1000;
  }
  else if (!parsedUrl) {
    var unixTime = null, naturalDate = null;
  }
  else {
    var unixTime = parsedUrl;
    var naturalDate = new Date(parsedUrl * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormattingOptions);
  }
  
  res.json({unix: unixTime, natural: naturalDate});
  
});

app.listen(8000);