
import React, { Component } from 'react';
import classes from './MusicPlayer.css';
import Summary from '../Summary/Summary';
import Spinner from '../UI/Spinner/Spinner';
import axios from 'axios';
import Aux from '../../hoc/Auxilary';
import Playbutton from '../../Component/UI/playButton/playButton';
import Likebutton from '../../Component/UI/likeButton/likeButton';
import Dislikebutton from '../../Component/UI/dislikeButton/dislikeButton';
import Volumeslider from '../UI/volumeSlider/volumeSlider';
import Songinfo from '../SongInfo/songInfo';
import ReactTooltip from 'react-tooltip'
import firebase from '../../Firebase';

var db = firebase.firestore();
let songList = db.collection("song-list")

class Musicplayer extends Component {
    state ={
        songData:[],
        songStats:[],
        loading: false,
        trackno: 0,
        currentAudio: {},
        showSummary: false,
        name: "",
        artistName:"",
        albumName:"",
        image: "",
        energy: 0,
        acoustic: 0,
        dance: 0,
        spotifyTrack: "",
        spotifyArtist: "",
        fromDb: null,
      }
    
      componentDidMount =()=> {
          this.setState({loading:true});
          // var config = {
          //   headers: {'Access-Control-Allow-Origin': '*'}
          // };
          axios.get('/api/getsong')
            .then(res =>{
              this.setState({loading:false});
              let songData =res.data[0];
              let songStats = res.data[1];
              this.setState({songData,songStats}, ()=> this.loadTrack() );
            });
           ;
      }

      componentWillUnmount =()=>{
        if(this.state.loading === false){
        this.pauseTrackHandler();
        }
      }
      
      loadTrack =()=>{
        // console.log(this.state);
        let url = this.state.songData[this.state.trackno].previewurl;
        let audio = new Audio(url);
        this.nameHandler();
        this.imageHandler();
        audio.volume = 0.5;
        if (this.state.trackno !== 0)
        {audio.play()}
        this.setState({currentAudio: audio});
        
      }
    
      playTrackHandler =()=>{
        console.log(this.state);
        let audio = this.state.currentAudio;
        audio.play();
        this.setState({currentAudio: audio});
      }
    
      pauseTrackHandler =() =>{
        let audio = this.state.currentAudio;
        audio.pause();
        this.setState({currentAudio: audio});  
      }
    
      updateTrack =(trackno)=>{
        
        let update = trackno + 1;
        this.setState({trackno: update});
      }
    
      nameHandler =() => {
        
          let newname = (this.state.songData[this.state.trackno].name);
          let newalbumName = (this.state.songData[this.state.trackno].albumName);
          let newartistName = (this.state.songData[this.state.trackno].artists[0].name);
          let newSpotitrack = this.state.songData[this.state.trackno].spotify;
          let newSpotiartist = this.state.songData[this.state.trackno].artists[0].external_urls.spotify;

          this.setState({name: newname,artistName: newartistName,albumName: newalbumName,spotifyTrack: newSpotitrack,spotifyArtist: newSpotiartist});
          
      }
    
      imageHandler =() => {
        
        let newimage = (this.state.songData[this.state.trackno].images[0].url);
        this.setState({image: newimage});
        
    }

    docIdGenerate =(songName)=>{
        let id = songName.replace(/[^A-Z0-9]/ig, "_");
        return id;
    }
    
      
      playClickHandler = () => {
        if (this.state.showSummary === false)
          {
            if (this.state.trackno === (this.state.songData.length - 1) && this.state.currentAudio.ended) //9
            {this.setState({showSummary: true})}
            else
            {
            
              
            // console.log(this.state.currentAudio.pause);
              
              this.setState({showSummary: false});
              if (this.state.currentAudio.paused)
              {           

                this.playTrackHandler()}
              else
              {this.pauseTrackHandler()}
              
            }
        }
        
      }
    
      likeClickHandler = () => {
        // console.log(this.state);
        let song = songList.doc(this.docIdGenerate(this.state.name));
        console.log(this.docIdGenerate(this.state.name));
        let pr1 = song.get().then(function(doc) {
          if (doc.exists) {
            return doc.data();
              
          } else {
              // console.log("No such document!");
              return -1;
                  }
          })
          pr1.then(returned =>  this.setState({fromDb: returned},
            ()=>{
              if (this.state.fromDb === -1)
              {
                song.set({
                    name: this.state.name,
                    artistName: this.state.artistName,
                    trackURL: this.state.spotifyTrack,
                    likes: 1
                    });
                    console.log("new entry created");
              }
              else
              {
                let likeupdate = this.state.fromDb.likes + 1;
                song.set({
                  likes: likeupdate
                  },{ merge: true });
                  console.log("Like updated");
              }

              
              if(this.state.trackno === (this.state.songData.length - 1))
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
                    dance: newDance },this.loadTrack);
                  this.pauseTrackHandler();
                  this.updateTrack(this.state.trackno);
                }  
              })
            )
           
        
        // .then(()=>{
        // if(this.state.trackno ===9)
        //   {
        //     this.setState({showSummary: true});
        //     return;
        //   }
    
        //   try{
        //     if (this.state.songStats[this.state.trackno].error.message === "analysis not found")
        //       {
        //         return;
        //       }
        //   }
        //   catch (error)
        //   {
        //     let newEnergy = this.state.energy + (this.state.songStats[this.state.trackno].energy);
        //     let newAcoustic = this.state.acoustic + (this.state.songStats[this.state.trackno].acousticness);
        //     let newDance = this.state.dance + (this.state.songStats[this.state.trackno].danceability);
        //     this.setState({
        //       energy: newEnergy, 
        //       acoustic: newAcoustic, 
        //       dance: newDance },this.loadTrack);
        //     this.pauseTrackHandler();
        //     this.updateTrack(this.state.trackno);
        //     console.log(this.state.fromDb);
        //   }  
        // })
        
        // console.log(exists);

        // if (exists===false)
        // {
        //   song.set({
        //   name: this.state.name,
        //   artistName: this.state.artistName,
        //   trackURL: this.state.spotifyTrack,
        //   likes: 1
        //   });
        //   console.log("new entry created");
        // }
         
      }
    
      dislikeClickHandler = () => {
        
        if(this.state.trackno ===(this.state.songData.length - 1))
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
                          dance: newDance },this.loadTrack);
            this.pauseTrackHandler();
            this.updateTrack(this.state.trackno);
            }
      }

      handleVolumeChange = (value) => {
        let audio = this.state.currentAudio;
        audio.volume = value;
        this.setState({
          currentAudio: audio
        })
      }
   
  render()
  {
    let showSpinner = null;
    let player = null;
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
    else{
      player = <Aux>
                <Songinfo
                  imageLink= {this.state.image}
                  artist= {this.state.artistName}
                  songname= {this.state.name}
                  album={this.state.albumName}
                  spotifytrack={this.state.spotifyTrack}
                  spotifyartist={this.state.spotifyArtist}
                  
                /> 
                <Volumeslider
                  min={0}
                  max={1}
                  step={0.001}
                  value={this.state.currentAudio.volume}     
                  orientation="horizontal"            
                  onChange={this.handleVolumeChange}
                />
                <Likebutton likeHandle={this.likeClickHandler} ></Likebutton>
                <Dislikebutton dislikeHandle= {this.dislikeClickHandler}></Dislikebutton>
                <Playbutton  playHandle= {this.playClickHandler} isPaused={this.state.currentAudio.paused}  ></Playbutton>
                <ReactTooltip/>
              </Aux>
    }

    if(this.state.showSummary)
    {
    let e = this.state.energy;
    let a = this.state.acoustic;
    let d = this.state.dance;
    let text = null;

    if (max_of_three(e,a,d) === e)
    {text="We think the upvoted songs were pretty High Energy... Feel free to refresh the page and continue exploring" }

    if (max_of_three(e,a,d) === a)
    {text="We think the songs you upvoted were a solid 11/10 on the Acoustic meter... Feel free to refresh the page and continue exploring" }

    if (max_of_three(e,a,d) === d)
    {text="We believe the upvoted tracks will make you 'Lose Yourself to Dance'...(pun intended)... Feel free to refresh the page and continue exploring" }

    if (a === 0 && e === 0 && d === 0)
    {text = "Couldnt quite get a read on you mate.....Could you please Refresh the page and try again?? "}

    summary = <Summary description={text} />
    }

        return (
            <Aux>
              {summary}
              <div className={classes.base} >
                {showSpinner}
                {/* <div className={classes.bar}></div> */}
                {player}
              </div>
            </Aux>
        )
        }
    
}

export default Musicplayer;

// componentDidMount =()=> {
//   const rehydrate = JSON.parse(localStorage.getItem('someSavedState'));
//   this.setState(rehydrate,()=> );
//   if (this.state.songData.length === 0)
//   {
//   this.setState({loading:true});
//   // var config = {
//   //   headers: {'Access-Control-Allow-Origin': '*'}
//   // };
//   axios.get('/api/getsong')
//     .then(res =>{
//       this.setState({loading:false});
//       let songData =res.data[0];
//       let songStats = res.data[1];
//       this.setState({songData,songStats}, ()=> this.loadTrack() );
//     });
//   }
// }