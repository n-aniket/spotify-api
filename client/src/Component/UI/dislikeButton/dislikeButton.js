import React from 'react';
import classes from './dislikeButton.css';
import dislike from '../../../Assets/Images/dislike.png';
import Aux from '../../../hoc/Auxilary';

const playButton = (props) =>{

    
    return (
        <Aux>
        <input  data-tip="Downvote and Move on to the next track"   disabled={props.disabled}
                className={classes.dislike} type="image" src={dislike} onClick={props.dislikeHandle} alt="dislikebutton" ></input>
        </Aux>
    );


}

export default playButton;