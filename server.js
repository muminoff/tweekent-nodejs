var twitter = require('twit'),
    nedb = require('nedb'),
    tweetsDB = new nedb({
        filename: './tweets.db',
        autoload: true
    }),
    creds = require('./credentials.json');

twit = new twitter(creds);

var tashkent = [
  '69.12597656249999',
  '41.178653972331674',
  '69.4281005859375',
  '41.39741506646461'
  ];


var stream = twit.stream('statuses/filter', {locations:tashkent});
stream.on('tweet', function (tweet) {
  console.log(tweet);
  tweetsDB.insert(JSON.stringify(tweet));
});
