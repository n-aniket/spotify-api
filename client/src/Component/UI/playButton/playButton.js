import React from 'react';
import classes from './playButton.css';
import play from '../../../Assets/Images/play.png';

const playButton = (props) =>{

    return (
        <input className={classes.play} type="image" src={play} onClick={props.playHandle} alt="playbutton" ></input>
    );


}

export default playButton;