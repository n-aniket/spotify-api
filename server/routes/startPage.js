const express = require('express');
const randomSongs = require('./randomSong');

const router = express();

router.use('/',(req,res,next) =>{

    res.render('index',{
        songs : randomSongs.songsList
    });
});

module.exports = router;