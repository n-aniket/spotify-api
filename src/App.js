import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import Background from './Component/Background/Background';
import Musicplayer from './Component/Musiclayout/Musiclayout';
import Spinner from './Component/UI/Spinner/Spinner';

class App extends Component {
  state ={
    songData:[],
    songStats:[],
    loading: false
  }

  componentDidMount (){
    this.setState({loading:true});
    axios.get('/display')
      .then(res =>{
        this.setState({loading:false});
        const songData =res.data[0];
        const songStats = res.data[1];
        this.setState({songData,songStats});
      });
  }

  pClickHandler = () => {
    console.log("play button was clicked");
    console.log(this.state);
  }

  lClickHandler = () => {
    console.log("like button was clicked");
  }

  dClickHandler = () => {
    console.log("dislike button was clicked");
  }

  render() {
    let showSpinner = null;
    if(this.state.loading){
      showSpinner = <Spinner />
    }
    return (
        <Background>
          {showSpinner}
          <Musicplayer playb={this.pClickHandler} likeb={this.lClickHandler} dislikeb={this.dClickHandler} />
      </Background>
    );
  }
}

export default App;
