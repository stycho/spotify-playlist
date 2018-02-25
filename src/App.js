import React, { Component } from 'react';
import './App.css';

//#222222 dark grey
//#000000 black
//#FFA200 orange
//#002957 dark blue
//#C2C2C2 light grey

let defaultStyle = {
  color: '#C2C2C2',
  margin: '5px'
};

let fakeData = {
  user: {
    name: 'Sean',
    playlists: [
      {
        name: 'Bangers',
        songs: ['Womp', 'Fissures', 'bloopin'],
        duration: 12
      },
      {
        name: 'Favorites',
        songs: ['Thing Thing', 'Nevermind', 'Take it away'],
        duration: 9
      },
      {
        name: 'Michelles soul',
        songs: ['Frog toots', 'Screaming toads', 'Yoddling goats', 'whispering Dirt'],
        duration: 17
      }
    ],
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '30%', display: 'inline-block'}}>
        <img/>
        <h3>Playlist Name</h3>
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

class HoursCounter extends Component {
  render() {
    let totalDuration = this.props.playlists.reduce((acc, cur) => {
      return acc + cur.duration;
    }, 0);

    console.log(totalDuration);

    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2>{totalDuration} Hours</h2>
      </div>
    );
  }
}

class PlaylistCounter extends Component {
  render() {
    return(
      <div style={{...defaultStyle, display: 'inline-block'}}>
        <h2>{this.props.playlists.length} Playlists</h2>
      </div>
    );
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {serverData: {}};
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeData});
    }, 1000)
  }

  render() {
    return (
      <div className='App' style={{...defaultStyle}}>
      {this.state.serverData.user ? 
      <div>
        <h1>{this.state.serverData.user.name}'s Playlists</h1>
        <PlaylistCounter playlists={this.state.serverData.user.playlists}/>
        <HoursCounter playlists={this.state.serverData.user.playlists}/>
        <Filter/>
        <Playlist/>
        <Playlist/>
        <Playlist/>
        </div> : <h1>Loading...</h1>
      }
      </div>
    );
  }
}

export default App;