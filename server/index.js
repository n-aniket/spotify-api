const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');

require('dotenv').config();

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const randomSongs = require('./routes/randomSong');
// const startPage = require('./routes/startPage');

app.use(randomSongs.router);
//app.use(startPage);  
app.listen(3000);