import React, { Component } from 'react';
import logo from './logo.svg';
import './StyleSheets/App.css';
import ScrollingText from './Components/ScrollingText.js'
import CharacterList from './Components/CharactersList.js'

class App extends Component {
  render() {
    return (
      <div className="App">
          <CharacterList/>
          <ScrollingText/>
      </div>
    );
  }
}

export default App;
