import React from 'react';
import classes from './playButton.css';
import play from '../../../Assets/Images/play.png';
import Aux from '../../../hoc/Auxilary';


const playButton = (props) =>{
    
    
    return (
        <Aux>
            <input   data-tip="Play / Pause"
                    className={classes.play} type="image" src={play} onClick={props.playHandle} alt="playbutton" ></input>
             
        </Aux>
    );


}

export default playButton;