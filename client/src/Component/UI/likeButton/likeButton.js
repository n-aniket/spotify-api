import React from 'react';
import classes from './likeButton.css';
import like from '../../../Assets/Images/like.png';

const playButton = (props) =>{

    return (
        <input className={classes.like} type="image" src={like} onClick={props.likeHandle} ></input>
    );


}

export default playButton;