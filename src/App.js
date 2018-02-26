import React, { Component } from 'react';
import './App.css';
import queryString from 'query-string';

//#222222 dark grey
//#000000 black
//#FFA200 orange
//#002957 dark blue
//#C2C2C2 light grey

let defaultStyle = {
  color: '#C2C2C2',
  margin: '5px'
};

class Playlist extends Component {
  render() {
    return(
      <div style={{...defaultStyle, width: '30%', display: 'inline-block'}}>
        <img src={this.props.playlist.image} style={{width: '80px', borderRadius: '40px'}}/>
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
      user: '',
      dispPic: '',
      filterString: '',
      playlists: []
    };
  }
  
  componentDidMount() {
    let parsed = queryString.parse(window.location.search);
    let accessToken = parsed.access_token;

    if (!accessToken)
      return;

    fetch('https://api.spotify.com/v1/me', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    })
      .then(resp => resp.json())
      .then(data => {
        this.setState({user: data.display_name});
        this.setState({dispPic: data.images[0].url});
          console.log(data.images[0].url);
    });

    fetch('https://api.spotify.com/v1/me/playlists', {
      headers: {'Authorization': 'Bearer ' + accessToken}
    }).then(resp => resp.json())
      // .then(data => {
      //   data.items.map(playlist => {
      //     fetch(playlist.tracks.href, )
      //   })
      // })
      .then(data => {
        return this.setState({playlists: data.items
          .map(item => ({
            name: item.name,
            image: item.images[0].url,
            songs: [],
            duration: 14
          })
        )})
        console.log(this.state.playlists);
      })
  }

  render() {
    let playlistsToRender = 
      this.state.user && 
      this.state.playlists 
        ? this.state.playlists.filter(playlist => 
          playlist.name.toLowerCase()
          .includes(this.state.filterString.toLowerCase())) 
        : []
    return (
      <div className='App' style={{...defaultStyle}}>
      {console.log(this.state)}
      {
        this.state.user ? 
        <div>
          <img src={this.state.dispPic} style={{width: '120px', borderRadius: '50%'}}/>
          <h1 style={{color: '#FFA200'}}>{this.state.user}</h1>
          <PlaylistCounter playlists={playlistsToRender}/>
          <HoursCounter playlists={playlistsToRender}/>
          <Filter onTextChange={text => this.setState({filterString: text})}/>
          {playlistsToRender.map(playlist => 
            <Playlist playlist={playlist}/>
          )}
        </div> : 
        <button style={{padding: '20px', backgroundColor: '#1db954', fontSize: '1.5em', borderWidth: '0', color: 'white', borderRadius: '35px'}} 
          onClick={() => {
            if (window.location.href.includes('localhost')){
              return window.location='http://localhost:8888/login';
            } else {
              return window.location='https://better-pl-backend.herokuapp.com/login';
            }
          }}>Sign in with Spotify</button>
      }
      </div>
    );
  }
}

export default App;
