import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import 'react-rangeslider/lib/index.css';
import Background from './Component/Background/Background';
import Musicplayer from './Component/MusicPlayer/MusicPlayer';
import TopLiked from './Component/TopLiked/TopLiked';
import About from './Component/About/About';
import Aux from './hoc/Auxilary';

class App extends Component {
  

  render() {
    return (
      <BrowserRouter>
        <Aux>
          <Background>
           <Route path="/" exact component={Musicplayer} />
           <Route path="/top-liked" exact component={TopLiked} />
           <Route path="/help-about" exact component={About} />
          </Background>
        </Aux>
      </BrowserRouter>
    );
  }
}

export default App;
