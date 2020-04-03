import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Background.css';
import Auxilary from '../../hoc/Auxilary';

const backlayout =( props ) =>(
    <Auxilary>
      <div className={classes.box2}>
            <div className={classes.navbar} >
              <ul>
                <li><Link to="/" >Discover</Link></li>
                <li><Link to="/top-liked" >Top liked</Link></li>
                <li><Link to="/about" >About</Link></li>
              </ul>
            </div> 
              {props.children}
        </div>
        
    </Auxilary>
);
export default backlayout;
