
import React, { Component } from 'react';
import classes from './MusicPlayer.css';
import Summary from '../Summary/Summary';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
import Aux from '../../hoc/Auxilary';
import Playbutton from '../../Component/UI/playButton/playButton'
import Likebutton from '../../Component/UI/likeButton/likeButton'
import Dislikebutton from '../../Component/UI/dislikeButton/dislikeButton'

class Musicplayer extends Component {
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
    
      componentDidMount =()=> {
        this.setState({loading:true});
        var config = {
          headers: {'Access-Control-Allow-Origin': '*'}
        };
        axios.get('https://spotipre-server.herokuapp.com' , config)
          .then(res =>{
            this.setState({loading:false});
            let songData =res.data[0];
            let songStats = res.data[1];
            this.setState({songData,songStats});
            this.loadTrack();
            
          });
         
      }
      
      loadTrack =()=>{
        
        let url = this.state.songData[this.state.trackno].previewurl;
        let audio = new Audio(url);
        this.nameHandler();
        this.imageHandler();
        this.setState({currentAudio: audio});
        
      }
    
      playTrackHandler =()=>{
        
        let audio = this.state.currentAudio;
        audio.play();
        // this.setState({currentAudio: audio});
        
      }
    
      pauseTrackHandler =() =>{
        
        let audio = this.state.currentAudio;
        audio.pause();
        // this.setState({currentAudio: audio})
        
      }
    
      updateTrack =(trackno)=>{
        
        let update = trackno + 1;
        this.setState({trackno: update});
        
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
    
      
      playClickHandler = () => {
        
        if (this.state.showSummary === false)
          {
            if (this.state.trackno === 10 && this.state.currentAudio.ended)
            {this.setState({showSummary: true})}
            else
            {
              this.playTrackHandler();
            }
        }
        console.log(this.state)
      }
    
      likeClickHandler = () => {
        
        if(this.state.trackno ===10)
          {
            this.setState({showSummary: true});
            return;
          }
    
          try{
            if (this.state.songStats[this.state.trackno].error.message === "analysis not found")
              {
                return;
              }
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
            this.pauseTrackHandler();
            this.updateTrack(this.state.trackno);
            this.loadTrack();
            
      
            
          }    
      }
    
      dislikeClickHandler = () => {
        
        if(this.state.trackno ===10)
          {
            this.setState({showSummary: true});
            return;
          }
    
        try{
          if (this.state.songStats[this.state.trackno].error.message === "analysis not found")
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
            this.pauseTrackHandler();
            this.updateTrack(this.state.trackno);
            this.loadTrack();
            
            }
      }
   
        render(){
            let showSpinner = null;
   
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
    }

    if(this.state.showSummary)
    {
    let e = this.state.energy;
    let a = this.state.acoustic;
    let d = this.state.dance;
    let text = null;

    if (max_of_three(e,a,d) === e)
    {text=" You love songs that have lots of energy... Keep Grooving" }

    if (max_of_three(e,a,d) === a)
    {text=" You love songs that are acoustic and easy to listen to.." }

    if (max_of_three(e,a,d) === d)
    {text=" You love songs that you can dance to and keep moving...." }

    if (a === 0 && e === 0 && d === 0)
    {text = "Couldnt quite get a read on you mate.....Could you please Refresh the page and try again?? "}

    summary = <Summary description={text} />
    }

        return (
            <Aux>
            {summary}
            {showSpinner}
            <div className={classes.base} >
            <img className={classes.image} src={this.state.image} alt="no image available"></img>
            <div className={classes.artistname}>{this.state.artistName}</div>
            <div className={classes.songname}>{this.state.name}</div>
            {/* <div className={classes.bar}></div> */}
            <Likebutton likeHandle={this.likeClickHandler} ></Likebutton>
            <Dislikebutton playHandle= {this.playClickHandler}></Dislikebutton>
            <Playbutton playHandle= {this.playClickHandler}></Playbutton>
            </div>
            </Aux>
        )
        }
    
}

export default Musicplayer;