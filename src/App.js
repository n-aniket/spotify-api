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
    artistName:"",
    image: "",
    energy: 0,
    acoustic: 0,
    dance: 0
  }

  componentDidMount (){
    this.setState({loading:true});
    var config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    };
    axios.get('https://spotipre-server.herokuapp.com' , config)
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
      let newartistName = (this.state.songData[this.state.trackno].artistsName);
      this.setState({name: newname,artistName: newartistName});
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
    if(this.state.trackno ===10)
      {return}

      try{
        if (this.state.songStats[this.state.trackno].error.status === 404)
          {return}
      }
      catch (error)
      {
        let newEnergy = this.state.energy + (this.state.songStats[this.state.trackno].energy);
        let newAcoustic = this.state.acoustic + (this.state.songStats[this.state.trackno].acousticness);
        let newDance = this.state.dance + (this.state.songStats[this.state.trackno].danceability);
        this.setState({
                      energy: newEnergy, 
                      acoustic: newAcoustic, 
                      dance: newDance })

        console.log("like button was clicked");
        console.log(this.state)
      }    
  }

  dClickHandler = () => {
    if(this.state.trackno ===10)
      {return}

    try{
      if (this.state.songStats[this.state.trackno].error.status === 404)
      {return}
    }
    catch (error)
      {
        let newEnergy = this.state.energy - (this.state.songStats[this.state.trackno].energy);
        let newAcoustic = this.state.acoustic - (this.state.songStats[this.state.trackno].acousticness);
        let newDance = this.state.dance - (this.state.songStats[this.state.trackno].danceability);
        this.setState({
                      energy: newEnergy, 
                      acoustic: newAcoustic, 
                      dance: newDance })
        console.log("dislike button was clicked");
      }
  }

  render() {
    let showSpinner = null;
    let musicPlayer =null;
    let summary = null;

    function max_of_three(x, y, z) 
    {
      let max_val = 0;
      if (x > y)
      {
        max_val = x;
      } else
      {
        max_val = y;
      }
      if (z > max_val) 
      {
        max_val = z;
      }
      return max_val;
    }

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
        artist={this.state.artistName}
        image={this.state.image} />
    }

     if(this.state.showSummary)
     {
        let e = this.state.energy;
        let a = this.state.acoustic;
        let d = this.state.dance;
        let text = null;

      if (max_of_three(e,a,d) === e)
      {text=" You love songs that have high energy... Keep Grooving" }

      if (max_of_three(e,a,d) === a)
      {text=" You love songs that are acoustic and easy to listen to.." }

      if (max_of_three(e,a,d) === d)
      {text=" You love songs that you can dance to and keep moving...." }

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
