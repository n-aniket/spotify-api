import React from 'react';
import classes from './playButton.css';
import play from '../../../Assets/Images/play.png';
import pause from '../../../Assets/Images/pause.png';
import Aux from '../../../hoc/Auxilary';


const playButton = (props) =>{

    let button = null;
    if(props.isPaused)
    {
        button = 
                <input   data-tip="Play"
                        className={classes.play} type="image" src={play} onClick={props.playHandle} alt="playbutton" ></input>   
                
    }
    else
    {
        button = 
                <input   data-tip="Pause"
                        className={classes.play} type="image" src={pause} onClick={props.playHandle} alt="playbutton" ></input>   
                
    }
    
    return (
        <Aux>
        {button}
        </Aux>
    );

 
}

export default playButton;