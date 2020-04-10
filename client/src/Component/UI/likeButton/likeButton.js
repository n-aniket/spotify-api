import React from 'react';
import classes from './likeButton.css';
import like from '../../../Assets/Images/like.png';
import Aux from '../../../hoc/Auxilary';


const playButton = (props) =>{

    
    return (
        <Aux>
        <input  data-tip="Upvote and Move on to the next track" 
            className={classes.like} type="image" src={like} onClick={props.likeHandle} alt="likebutton"></input>
        </Aux>
    );


}

export default playButton;