import React from 'react';
import classes from './Summary.css';
import Aux from '../../hoc/Auxilary';
import Auxilary from '../../hoc/Auxilary';

const summary = () => (
    <Auxilary>
        <div className={classes.bg}>
            <div className={classes.Summ}>SUMMARY</div>
        </div> 
    </Auxilary> 
);

export default summary;