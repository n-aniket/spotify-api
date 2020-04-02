import React, { Component } from 'react';
import './index.css';
import Background from './Component/Background/Background';
import Musicplayer from './Component/MusicPlayer/MusicPlayer';

import Aux from './hoc/Auxilary';

class App extends Component {
  

  render() {
    return (
        <Aux>
          <Background>
            <Musicplayer/>
          </Background>
        </Aux>
    );
  }
}

export default App;
