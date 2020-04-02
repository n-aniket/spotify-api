import React from 'react';
import classes from './Background.css';
import spotifylogo from '../../Assets/Images/spotify-logo.png';
import Auxilary from '../../hoc/Auxilary';

const backlayout =( props ) =>(
    <Auxilary>
      <div className={classes.box2}>
          <div className={classes.top} ></div> 
              {props.children}
        </div>
        
    </Auxilary>
);
export default backlayout;
