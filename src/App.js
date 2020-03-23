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
    showSummary: false,
    name: "",
    image: "",
    energy: 0,
    acoustic: 0,
    dance: 0
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
        if (this.state.trackno === 10)
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
    let newEnergy = this.state.energy + (this.state.songStats[this.state.trackno].energy);
    let newAcoustic = this.state.acoustic + (this.state.songStats[this.state.trackno].acousticness);
    let newDance = this.state.dance + (this.state.songStats[this.state.trackno].danceability);
    this.setState({
                  energy: newEnergy, 
                  acoustic: newAcoustic, 
                  dance: newDance })

    console.log("like button was clicked");
  }

  dClickHandler = () => {
    let newEnergy = this.state.energy - (this.state.songStats[this.state.trackno].energy);
    let newAcoustic = this.state.acoustic - (this.state.songStats[this.state.trackno].acousticness);
    let newDance = this.state.dance - (this.state.songStats[this.state.trackno].danceability);
    this.setState({
                  energy: newEnergy, 
                  acoustic: newAcoustic, 
                  dance: newDance })
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
        let e = this.state.energy;
        let a = this.state.acoustic;
        let d = this.state.dance;
        let text = null;

      if (e >= 1 && (a && d < 1 ))
      {text="You love songs with tons of Energy"}

      if (a >= 1 && (e && d < 1 ))
      {text="You love songs that have are Acoustic and easy on the ear <3"}

      if (d >= 1 && (e && a < 1 ))
      {text="You love songs that you can dance to and keep GROOOOOOOVING!!!!"}

      if (d <= 1 && (e && a > 1 ))
      {text="No idea how this is possible but you seem to love songs that are High Energy and Acoustic at the same time, xD"}

      if (e <= 1 && (d && a > 1 ))
      {text="Ah quite the mellow fellow we have here...You love songs that are easy to Dance to and Acoustic :)"}

      if (a <= 1 && (d && e > 1 ))
      {text="You love to groove the songs that are High Energy and make you Dance at the same time :D"}

      if (a >1 && e>1 && d>1)
      {text="You seem to have a nice balance in your taste of music..Good on you :*"}

      if (a <1 && e <1 && d<1)
      {text = "Couldnt quite get a read on you mate.....Could you please Refresh the page and try again?? Maybe press the Like/Dislike buttons a few more times per track"}

     summary = <Summary description={text} />
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
