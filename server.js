var twitter = require('twit'),
    twitterCredentials = require('./credentials.json');

twit = new twitter(twitterCredentials);

var tashkent = [
  '69.12597656249999',
  '41.178653972331674',
  '69.4281005859375',
  '41.39741506646461'
  ];

var stream = twit.stream('statuses/filter', {locations:tashkent});
stream.on('tweet', function (tweet) {
  console.log(tweet.text);
});
