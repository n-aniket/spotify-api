import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './songInfo.css';
import spotify from '../../Assets/Images/spotify-logo.png';

const songInfo =(props)=>{
    
    return (
    <Aux>
        <img className={classes.image} src={props.imageLink} alt="Album art"></img>
            <div className={classes.songname}>{props.songname}</div>
            <div className={classes.artistname}>In {props.album} by {props.artist} </div>
            <a className={classes.link} href={props.spotifytrack} target="_blank" rel="noopener noreferrer">
            <div className={classes.fulltrack} >Listen to the full track on 
                    <img className={classes.logo} src={spotify} alt="spotify-logo" ></img>
            </div>
            </a>
            <a className={classes.link} href={props.spotifyartist} target="_blank" rel="noopener noreferrer">
            <div className={classes.morebyartist} >More by {props.artist}</div>
            </a>
            
    </Aux>
    );
    
}

export default songInfo;