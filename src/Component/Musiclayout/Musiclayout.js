import React from 'react';
import classes from './Musiclayout.css';
import like from '../../Assets/Images/like.png';
import cross from '../../Assets/Images/cross.png';
import play from '../../Assets/Images/play.png';

let Musicplayer = (props) => {
   
        return(
            <div className={classes.base} >
        <img className={classes.image} src={props.image} alt="no image available"></img>
        <div className={classes.artistname}>{props.artist}</div>
        <div className={classes.songname}>{props.songname}</div>
        {/* <div className={classes.bar}></div> */}
        <input className={classes.like}  type="image" src={like} onClick={props.likeb}></input>
        <input className={classes.cross} type="image" src={cross} onClick={props.dislikeb}></input>
        <input className={classes.play} type="image" src={play} onClick={props.playb} ></input>
     </div>
        )
    
}

export default Musicplayer;