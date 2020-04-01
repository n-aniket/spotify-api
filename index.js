const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'client/build')));

const randomSongs = require('./routes/randomSong');
// const startPage = require('./routes/startPage');


    
app.use(randomSongs.router);
    
 

//  app.get('*', (req, res) => {
//      res.sendFile(path.join(__dirname+'/client/build/index.html'));
//  });

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Song generator listening on ${port}`);



//app.use(startPage);  
// app.listen(process.env.PORT || 3000);
//app.listen(3001);