import React, { Component } from 'react';
import './index.css';
import Background from './Component/Background/Background';
import Musicplayer from './Component/Musiclayout/Musiclayout';

class App extends Component {
  render() {
    return (
        <Background>
          <Musicplayer/>
        </Background>
    );
  }
}

export default App;
