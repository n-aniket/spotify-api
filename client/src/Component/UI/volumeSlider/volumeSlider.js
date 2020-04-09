import React from 'react';
import ReactSlider from 'react-slider';
import styled from 'styled-components';
import classes from './volumeSlider.css';
import Aux from '../../../hoc/Auxilary';
import speakerMin from '../../../Assets/Images/speakermin.png';
import speakerMax from '../../../Assets/Images/speakermax.png';

const StyledSlider = styled(ReactSlider)`
    width: 80%;
    height: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledThumb = styled.div`
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    background-color: #858585;
    color: #black;
    border-radius: 50%;
    cursor: grab;
    z-index: 25;
`;

const Thumb = (props) => <StyledThumb {...props}></StyledThumb>;

const StyledTrack = styled.div`
    top: 0;
    bottom: 0;
    background: ${props => props.index === 0 ? '#c9c9c9' : '#262626'};
    border-radius: 999px;
    z-index: -25;
`;

const Track = (props, state) => <StyledTrack {...props} index={state.index} />;

const volumeSlider = (props)=> {

    return( 
        <Aux>
        <div className={classes.row}>
           <img className={classes.img} src={speakerMin} alt="vol-min"></img>
            <div><StyledSlider
                    className={classes.main}
                    renderTrack={Track}
                    renderThumb={Thumb}
                    min={props.min}
                    max={props.max}
                    step={props.step}
                    value={props.value}     
                    orientation={props.orientation}            
                    onChange={props.onChange}
                /> 
            </div>
            <img  className={classes.img} src={speakerMax} alt="vol-max"></img>
        </div>
        </Aux>
    );
}

export default volumeSlider;