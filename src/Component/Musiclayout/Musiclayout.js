import React,{Component} from 'react';
import classes from './Musiclayout.css';
import like from '../../Assets/Images/like.png';
import cross from '../../Assets/Images/cross.png';
import play from '../../Assets/Images/play.png';

class Musicplayer extends Component {
    render() {
        return(
            <div className={classes.base} >
        <div className={classes.image}></div>
        <div className={classes.songname}>songname</div>
        <div className={classes.artistname}>artistname</div>
        <div className={classes.artistname}></div>
        <div className={classes.bar}></div>
        <input className={classes.like}  type="image" src={like}></input>
        <input className={classes.cross} type="image" src={cross}></input>
        <input className={classes.play} type="image" src={play}></input>
     </div>
        );
    }
}

export default Musicplayer;