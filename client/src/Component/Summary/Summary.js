import React from 'react';
import classes from './Summary.css';
import Aux from '../../hoc/Auxilary';

const summary = (props) => {

    return (
    <Aux>
        <div className={classes.bg}> </div> 
            <div className={classes.Summ}>SUMMARY
                <div className={classes.desc}>{props.description}</div>
            </div>
       
        
    </Aux>
    );
        
        
    
};

export default summary;