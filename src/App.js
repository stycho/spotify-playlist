import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//#222222 dark grey
//#000000 black
//#FFA200 orange
//#002957 dark blue
//#C2C2C2 light grey

let defaultStyle = {
  color: '#C2C2C2',
};

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '30%', display: 'inline-block'}}>
        <img/>
        <h1>Playlist Name</h1>
        <ul>
          <li>Song 1</li>
          <li>Song 2</li>
          <li>Song 3</li>
        </ul>
      </div>
    );
  }
}

class Filter extends Component {
  render() {
    return(
      <div style={{...defaultStyle}}>
        <img/>
        <input type="text"/>
      </div>
    );
  }
}

class Aggregate extends Component {
  render() {
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2>Number Text</h2>
      </div>
    );
  }
}

class App extends Component {

  render() {
    return (
      <div style={{...defaultStyle}}>
      <h1>Spotify Plalists</h1>
        <Aggregate/>
        <Aggregate/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
      </div>
    );
  }
}

export default App;
