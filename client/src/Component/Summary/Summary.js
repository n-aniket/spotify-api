import React from 'react';
import classes from './Summary.css';
import Aux from '../../hoc/Auxilary';
import {Link} from 'react-router-dom';

const summary = (props) => {

    return (
    <Aux>
        <div className={classes.bg}> </div> 
            <div className={classes.Summ}>This is not the end....
                <div className={classes.desc}>{props.description}</div>
                <button className={classes.ref} onClick={() => window.location.reload(false)}>Refresh</button>
            </div>
       
        
    </Aux>
    );
        
        
    
};

export default summary;