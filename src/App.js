import React, { Component } from 'react';
import './index.css';
import Background from './Component/Background/Background';
import Musicplayer from './Component/Musiclayout/Musiclayout';

class App extends Component {

  ClickHandler = () => {
    console.log("button was clicked");
  }

  render() {
    return (
        <Background>
          <Musicplayer wasClicked={this.ClickHandler} />
        </Background>
    );
  }
}

export default App;
