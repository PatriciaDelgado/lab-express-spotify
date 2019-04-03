const express = require('express');
const hbs = require('hbs');
const SpotifyWebApi = require('spotify-web-api-node');

const app = express();
const path = require('path');

//----------------------------------------------
// Remember to insert your credentials here
const clientId = 'b428a17f314347589a483ab7012dc91d',
      clientSecret = 'ef26d50c4fc2491b96f8e4b3c1254844';

const spotifyApi = new SpotifyWebApi({
  clientId : clientId,
  clientSecret : clientSecret
});
// Retrieve an access token
spotifyApi.clientCredentialsGrant()
  .then( data => {
    spotifyApi.setAccessToken(data.body['access_token']);
  })
  .catch(error => {
    console.log('Something went wrong when retrieving an access token', error);
  })
//----------------------------------------------
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));


// setting the spotify-api goes here:







// the routes go here:
app.get('/', (req, res, next) => {
  res.render('index');
});
app.get('/artists', (req, res, next) => {
  

  spotifyApi.searchArtists("bisbal")
    .then(data => {
      console.log("The received data from the API: ", data.body);
      res.send(data.body)
      //res.render('artists');
      // ----> 'HERE WHAT WE WANT TO DO AFTER RECEIVING THE DATA FROM THE API'
    })
    .catch(err => {
      console.log("The error while searching artists occurred: ", err);
    })
});


app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
