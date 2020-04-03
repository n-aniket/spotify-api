import React from 'react';
import classes from './dislikeButton.css';
import dislike from '../../../Assets/Images/dislike.png';

const playButton = (props) =>{

    return (
        <input className={classes.dislike} type="image" src={dislike} onClick={props.dislikeHandle} alt="dislikebutton" ></input>
    );


}

export default playButton;