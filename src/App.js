import React, { Component } from 'react';

import Game from './components/game';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <Game running={true}></Game>
      </div>
    );
  }
}

export default App;
