function playPause(songId){
    song = document.getElementById(songId);
    if (song.paused && song.currentTime >= 0 && !song.ended) {
       song.play();
    } else {
       song.pause();
    }
 }        