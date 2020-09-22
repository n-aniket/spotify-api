import React from 'react';
import classes from './likeButton.css';
import like from '../../../Assets/Images/next.png';
import Aux from '../../../hoc/Auxilary';


const playButton = (props) =>{

    
    return (
        <Aux>
        <input  data-tip="Next track"  disabled={props.disabled}
            className={classes.like} type="image" src={like} onClick={props.likeHandle} alt="likebutton"></input>
        </Aux>
    );


}

export default playButton;