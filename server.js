var twitter = require('ntwitter'),
    sqlite3 = require('sqlite3').verbose(),
    twitterCredentials = require('./credentials.json');

var db = new sqlite3.Database('tweekent.db');
twit = new twitter(twitterCredentials);

var tashkent = '69.12597656249999,41.178653972331674,69.4281005859375,41.39741506646461';

db.serialize(function() {
  //TODO: workaround this in future
  db.run("CREATE TABLE tweets(user VARCHAR, tweet TEXT)");
  var stmt = db.prepare("INSERT INTO tweets VALUES (?, ?)");
  twit.stream('statuses/filter', {'locations':tashkent}, function(stream) {
    stream.on('data', function (tweet) {
      try {
        stmt.run(tweet.user.name, tweet.text);
        console.log(tweet.user.name, "--->", tweet.text);
        console.log(tweet.geo, tweet.created_at, tweet.id);
      }
      catch (e) {
        console.log("Error occured.", e);
      }
    });
  });
});
