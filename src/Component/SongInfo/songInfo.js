import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './songInfo.css';

const songInfo =(props)=>{
    
    return (
    <Aux>
        <img className={classes.image} src={props.imageLink} alt="Album art"></img>
            <div className={classes.artistname}>{props.artist}</div>
            <div className={classes.songname}>{props.songname}</div>
    </Aux>
    );
    
}

export default songInfo;