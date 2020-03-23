import React from 'react';
import classes from './Summary.css';
import Aux from '../../hoc/Auxilary';
import Auxilary from '../../hoc/Auxilary';

const summary = () => (
    <Aux>
        <div className={classes.bg}></div> 
        <div className={classes.Summ}>SUMMARY
            <div className={classes.desc}>You seem to like so and so songs</div>
        </div>
        
    </Aux>
        
        
    
        
    
);

export default summary;