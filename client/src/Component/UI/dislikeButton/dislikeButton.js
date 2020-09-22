import React from 'react';
import classes from './dislikeButton.css';
import dislike from '../../../Assets/Images/prev.png';
import Aux from '../../../hoc/Auxilary';

const playButton = (props) =>{

    
    return (
        <Aux>
        <input  data-tip="Previous track"   disabled={props.disabled}
                className={classes.dislike} type="image" src={dislike} onClick={props.dislikeHandle} alt="dislikebutton" ></input>
        </Aux>
    );


}

export default playButton;