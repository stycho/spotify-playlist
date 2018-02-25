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
        name: 'Favorites count',
        songs: ['Thing Thing', 'Nevermind', 'Take it away'],
        duration: 9
      },
      {
        name: 'Michelle',
        songs: ['Frog toots', 'Screaming toads', 'Yoddling goats', 'whispering Dirt'],
        duration: 17
      },
      {
        name: 'Country',
        songs: ['My truck', 'My Horse', 'My gun', 'My girl'],
        duration: 16
      }
    ],
  }
}

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '30%', display: 'inline-block'}}>
        <img/>
        <h3>{this.props.playlist.name}</h3>
        <ul>
          {this.props.playlist.songs.map(songs => {
            return <li>{songs}</li>
          })}
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
        <input type="text" onKeyUp={event => this.props.onTextChange(event.target.value)} />
      </div>
    );
  }
}

class HoursCounter extends Component {
  render() {
    let totalDuration = this.props.playlists.reduce((acc, cur) => {
      return acc + cur.duration;
    }, 0);

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
    this.state = {
      serverData: {},
      filterString: ''
    };
  }
  
  componentDidMount() {
    setTimeout(() => {
      this.setState({serverData: fakeData});
    }, 1000);

    setTimeout(() => {
      this.setState({filterString: ''});
    }, 2000);
  }

  render() {
    let playlistsToRender = this.state.serverData.user ? this.state.serverData.user.playlists
    .filter(playlist => 
      playlist.name.toLowerCase()
        .includes(this.state.filterString.toLowerCase())
    ) : []
    return (
      <div className='App' style={{...defaultStyle}}>
      {this.state.serverData.user ? 
      <div>
        <h1>{this.state.serverData.user.name}'s Playlists</h1>
        <PlaylistCounter playlists={playlistsToRender}/>
        <HoursCounter playlists={playlistsToRender}/>
        <Filter onTextChange={text => this.setState({filterString: text})}/>
        {playlistsToRender.map(playlist => 
          <Playlist playlist={playlist}/>
        )}

        </div> : <h1>Loading...</h1>
      }
      </div>
    );
  }
}

export default App;
