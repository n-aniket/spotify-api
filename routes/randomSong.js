const express = require('express');
const request = require('request'); 

const router = express();


const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;

var songsList = [];
var tempSongsList = [];
var tempJ = 0;
var j = 0;

var stats = [];
var tempStats = [];
var tempI = 0;
var i = 0;

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var k = 0; k < length; k++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var authOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

router.use('/api/getsong',(req,res,next) =>{
  const a = generateRandomString(3);
  request.post(authOptions, (error, response, body) => {
    if (!error && response.statusCode === 200) {
      var token = body.access_token;
      var options = {
        url: `https://api.spotify.com/v1/search?q=${a}&type=track&limit=1&offset=0`,
        headers: {
          'Authorization': 'Bearer ' + token
        },
        json: true
      };
      request.get(options, (error, response, body) => {
        if(!error){
          j = tempJ; 
          songsList = tempSongsList;  

          if(body.tracks.items[0].preview_url != null){
            songsList[j++] = {
            id : body.tracks.items[0].id,
            previewurl : body.tracks.items[0].preview_url,
            name : body.tracks.items[0].name,
            playonspotify : body.tracks.items[0].uri,
            images : body.tracks.items[0].album.images,
            artistsName : body.tracks.items[0].artists[0].name
            };

            var optionsStats = {
              url: `https://api.spotify.com/v1/audio-features/${body.tracks.items[0].id}`,
              headers: {
                'Authorization': 'Bearer ' + token
              },
              json: true
            };
          }
            
          request.get(optionsStats, (error, response, body) => {
            if(!error){
              i = tempI;
              stats = tempStats;
              stats[i++] = body;
            }

            if(songsList.length < 10){
              tempSongsList = songsList;
              tempJ = j;
              tempStats = stats;
              tempI = i;
              res.redirect('/api/getsong');
            }else{
              tempJ = 0;
              tempSongsList = [];
              tempI = 0;
              tempStats = [];
              res.json([songsList,stats]);
              // res.render('displayall',{     //if front-end was'nt handelled seperately
              // songs : songsList
              // });
            }                
          });
        }else{
          res.render('404');
        }
      });
    }        
  });  
      
});

exports.router = router;