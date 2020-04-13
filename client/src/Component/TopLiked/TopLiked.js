import React,{Component} from 'react';
import firebase from '../../Firebase';
import classes from './TopLiked.css';
import Aux from '../../hoc/Auxilary';
import Spinner from '../UI/Spinner/Spinner';
import spotify from '../../Assets/Images/spotify-logo.png';

let db = firebase.firestore();
let songList = db.collection("song-list");
let query = songList.orderBy("likes","desc").limit(10);
let data = [];

class TopLiked extends Component {
    state={
        songs: null,
        loading: true
    }
    componentDidMount =()=>{
        this.setState({loading: true});
       let pr1 = query.get()
        .then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                //console.log(doc.id, " => ", doc.data());
                data.push(doc.data());
            });
        })
        pr1.then(returned => this.setState({songs: data,loading: false}))
    }

    display =()=>{
        console.log(this.state.songs[0]);
    }
   
    render(){
        let display = null;

        if (this.state.loading)
        {
            display = <Spinner />
        }
        else{
            display =
            <Aux>
                <div className={classes.container}>
                    <div className={classes.track}>{this.state.songs[0].artistName} - {this.state.songs[0].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[0].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[0].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[1].artistName} - {this.state.songs[1].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[1].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[1].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[2].artistName} - {this.state.songs[2].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[2].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[2].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[3].artistName} - {this.state.songs[3].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[3].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[3].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[4].artistName} - {this.state.songs[4].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[4].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[4].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[5].artistName} - {this.state.songs[5].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[5].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[5].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[6].artistName} - {this.state.songs[6].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[6].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[6].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[7].artistName} - {this.state.songs[7].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[7].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[7].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[8].artistName} - {this.state.songs[8].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[8].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[8].likes}</span> </div>
                    <div className={classes.track}>{this.state.songs[9].artistName} - {this.state.songs[9].name} <span className={classes.likes}><a className={classes.logo} href={this.state.songs[9].trackURL} target="_blank" rel="noopener noreferrer"><img className={classes.logo} src={spotify} alt="spotify-logo" ></img></a>Upvotes: {this.state.songs[9].likes}</span> </div>
                    

                </div>
            </Aux>
        }
        
        return(
            <Aux>
            {display}
            </Aux>
        )
    }

}

export default TopLiked;