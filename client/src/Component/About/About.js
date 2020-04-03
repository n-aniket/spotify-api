import React from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './About.css';
import github from '../../Assets/Images/github.png'

const about = () => {

    return (
        <Aux>
            
            <div className={classes.Head}>ABOUT
                <div className={classes.desc}>Hey there kind Stranger..!</div>
                <div className={classes.desc1}>Having trouble finding new songs? Fear not, we have got you covered...</div>
                <div className={classes.desc1}>We developed this application with hopes of helping those who want to listen to something new and exciting.</div>
                <div className={classes.source}>Find the source on GitHub:</div>
                <a href="https://github.com/n-aniket/spotify-api" target="_blank" rel="noopener noreferrer">
                    <img className={classes.logo} src={github} alt="github-logo" ></img>
                </a>
            </div>

        </Aux>
            

    );

}

export default about;

