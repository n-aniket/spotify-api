const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const app = express();



app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const randomSongs = require('./routes/randomSong');
// const startPage = require('./routes/startPage');

app.use(cors());

app.use(randomSongs.router);
//app.use(startPage);  
app.listen(process.env.PORT || 3000);
//app.listen(3001);