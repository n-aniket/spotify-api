import React, { Component } from 'react';
import axios from 'axios';
import './index.css';
import Background from './Component/Background/Background';
import Musicplayer from './Component/Musiclayout/Musiclayout';
import Summary from './Component/Summary/Summary';
import Spinner from './Component/UI/Spinner/Spinner';
import Aux from './hoc/Auxilary';

class App extends Component {
  state ={
    songData:[],
    songStats:[],
    loading: false,
    trackno: 0,
    currentAudio: {ended: "true"},
    showSummary: true,
    name: "",
    image: "",
  }

  componentDidMount (){
    this.setState({loading:true});
    axios.get('/display')
      .then(res =>{
        this.setState({loading:false});
        const songData =res.data[0];
        const songStats = res.data[1];
        this.setState({songData,songStats});
        this.nameHandler();
        this.imageHandler();
      });
  }

  playTrackHandler =(url)=>{
    let audio = new Audio(url);
    audio.play();
    this.setState({currentAudio: audio});
  }

  loadNextTrack =()=>{
    let update = this.state.trackno + 1;
    this.setState({trackno: update});
    this.nameHandler();
    this.imageHandler();
  }

  nameHandler =() => {
      let newname = (this.state.songData[this.state.trackno].name);
      this.setState({name: newname});
  }

  imageHandler =() => {
    let newimage = (this.state.songData[this.state.trackno].images[1].url);
    this.setState({image: newimage});
}

  
  pClickHandler = () => {
    if (this.state.currentAudio.ended && this.state.showSummary === false)
      {
        if (this.state.trackno === 2)
        {this.setState({showSummary: true})}
        else
        {
          this.playTrackHandler(this.state.songData[this.state.trackno].previewurl);
          this.loadNextTrack();}
    }
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
    let musicPlayer =null;
    let summary = null;

    if(this.state.loading){
      showSpinner = <Spinner />
      musicPlayer =null;
    }
    else
    { 
      musicPlayer = <Musicplayer 
        playb={this.pClickHandler} 
        likeb={this.lClickHandler} 
        dislikeb={this.dClickHandler}
        songname={this.state.name}
        image={this.state.image} />
    }

     if(this.state.showSummary)
     {
     summary = <Summary/>
    }

    return (
        <Aux>
          {summary}
          <Background>
          {showSpinner}
          {musicPlayer}
          </Background>
        </Aux>
    );
  }
}

export default App;
