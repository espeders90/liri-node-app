console.log("hello Liri");
var request = require('request');
var fs = require('fs');

// var twitterKeys = require('./keys.js');
var Twitter = require('twitter');
// var omdb = require('omdb');

//var client = Twitter(twitterKeys);
var client = new Twitter({
  consumer_key: 'jntaEsHslV2UILfGB9UuKO34Y',
  consumer_secret: 'NEly509Wr4sWILA1hDDDPa7dIPWpHWAxYpe1uH7JNwLc1BC0jf',
  access_token_key: '935696673694781440-xmg8YekpU8gHimTaHxB7F9Li4UIcehi',
  access_token_secret: 'yfdTrcQgsLzhIF6og5tY47QexYtdXslbekwwryFgzVpes'
});

//Spotify variables
var Spotify = require('node-spotify-api');
var spotify = new Spotify({
  id: "4cc7c6444ad240829cead2921f1199d1",
  secret: "7980d6fcf11d4361b0a9b8885cb66b54"
});
var songName = process.argv[3];

//Movie variables
var movieName = "";
for (var i = 3; i < process.argv.length; i++) {
  movieName += process.argv[i];
}
console.log("test:" + movieName);
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=trilogy";


//end of global variables, start of my-tweets -> spotify-this-song -> movie-this


switch (process.argv[2]) {
  case 'my-tweets':

    var params = { screen_name: 'edsen90', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
      console.log(error);
      for (var i in tweets) {
        console.log("..................");
        console.log("Tweet:" + tweets[i].text);
        //console.log(JSON.stringify(tweets[i], null, 2));
      }
    });
    break;
    // end of my-tweets

    //start of spotify
  case 'spotify-this-song':
    if (songName == undefined) {
      songName = "The Sign by Ace of Base";
      console.log("No User input for the Song Name. Default is the 'Sign' by Ace of Base");
    }

    spotify.search({ type: 'track', query: songName, limit: 3 }, function(error, data) {
      console.log(error);
      console.log("artists:");
      for (var i in data.tracks.items[0].artists) {
        console.log(data.tracks.items[0].artists[i].name);
      }
      console.log("The song's name: " + data.tracks.items[0].name);
      console.log("Preview link: " + data.tracks.items[0].preview_url);
      console.log("The album: " + data.tracks.items[0].album.name);
    });
    break;
    //end of spotify    

    //start of movie-this
  case 'movie-this':
    if (movieName == undefined) {
      movieName = "Mr.Nobody";
      console.log("No user input for the Movie Name. Default is 'Mr.Nobody'");
    }

    request(queryUrl, function(error, response, body) {
      console.log("Movie name: " + movieName);
      console.log(error);
      body = JSON.parse(body);
      console.log(body);
      console.log("The title of the Movie is: " + body.Title);
      console.log("Year the movie came out: " + body.Year);
      console.log("IMDB Rating of the movie: " + body.imdbRating);
      console.log("Rotten Tomatoes Rating of the movie: " + body.Ratings[1].Value);
      console.log("Country where the movie was produced: " + body.Country);
      console.log("Language of the movie: " + body.Language);
      console.log("Plot of the movie: " + body.Plot);
      console.log("Actors in the movie: " + body.Actors);
    });

    break;
    //end of movie-this

  case "do-what-it-says":
    fs.readFile("random.txt", "utf8", function(error, data) {
      if (error) {
        return console.log(error);
      }
      data = data.split(",");
      console.log(data);
      var dataArr = data[0];
      console.log(dataArr);
    });
    break;

}
