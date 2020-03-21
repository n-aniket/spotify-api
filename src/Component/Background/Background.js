import React from 'react';
import classes from './Background.css';
import spotifylogo from '../../Assets/Images/spotify-logo.png';

import Auxilary from '../../hoc/Auxilary';

const backlayout =( props ) =>(
    <Auxilary>
    <div className={classes.ful} >
    <img src={spotifylogo} className={classes.logo}/>
     <div className={classes.top} >
        <div className={classes.box1}>
            <div className={classes.box2}>
              {props.children}
            </div>
        </div>
     </div>
    </div>
    </Auxilary>
);
export default backlayout;
