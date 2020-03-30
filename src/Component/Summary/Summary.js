import React from 'react';
import classes from './Summary.css';
import Aux from '../../hoc/Auxilary';

const summary = (props) => (
    <Aux>
        <div className={classes.bg}>
            <div className={classes.Summ}>SUMMARY
                <div className={classes.desc}>{props.description}</div>
            </div>
        </div> 
        
    </Aux>
        
        
    
        
    
);

export default summary;