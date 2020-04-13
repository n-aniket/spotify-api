import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Background.css';
import Auxilary from '../../hoc/Auxilary';
import { useLocation } from 'react-router-dom';

const backlayout =( props ) =>{
  let location = useLocation();
  let currentURL = location.pathname;

  let discover = classes.navElementInactive;
  let topLiked = classes.navElementInactive;
  let about = classes.navElementInactive;
  
  if(currentURL === "/")
  {
    discover = classes.navElementActive;
    topLiked = classes.navElementInactive;
    about = classes.navElementInactive;
  }
  else if(currentURL === "/top-liked")
  {
    discover = classes.navElementInactive;
    topLiked = classes.navElementActive;
    about = classes.navElementInactive;
  }
  else
  {
    discover = classes.navElementInactive;
    topLiked = classes.navElementInactive;
    about = classes.navElementActive;
  }


  return(
    <Auxilary>
      <div className={classes.box2}>
            <div className={classes.navbar} >
              <ul>
                <li><Link to="/" className={classes.navelement}  ><div className={discover}>Discover</div></Link></li>
                <li><Link to="/top-liked"className={classes.navelement}   ><div className={topLiked}>Top liked</div></Link></li>
                <li><Link to="/help-about"className={classes.navelement}   ><div className={about}>Need Help ?</div></Link></li>
              </ul>
            </div> 
              {props.children}
        </div>
        
    </Auxilary>
  );
};
export default backlayout;
