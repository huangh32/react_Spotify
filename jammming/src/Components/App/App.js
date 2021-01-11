
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import TrackList from '../TrackList/TrackList';
import Track from '../Track/Track';
import Spotify from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'My Playlist',
      playlistTracks: []
    }
    //bind functions
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);

  }
  
  addTrack(track) {
    if(this.state.playlistTracks.find(saved => saved.id === track.id)){
      return ;
    }
    this.state.playlistTracks.push(track);
    this.setState({playlistTracks: this.state.playlistTracks});
    console.log('this is function addTrack with onAdd attribute!');
  }
  
  removeTrack(track){
    this.state.playlistTracks = this.state.playlistTracks.filter(n =>
      
        n.id !== track.id
      );
    this.setState({playlistTracks: this.state.playlistTracks});
  }

  updatePlaylistName(name){
    this.setState({playlistName:name});
  }
  
  savePlaylist(){
    const trackURIs = this.state.playlistTracks.map(track =>track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(() =>
    this.setState ({
      playlistName: 'New Playlist',
      playlistTracks: []
    }));
    console.log('Click SavePlayList button');
  }

  search(term){
    Spotify.search(term).then(searchResults =>
      {
        this.setState({searchResults: searchResults})
      })

  }

  render(){
    return (
      <div>
      <h1>Pu<span className="highlight">Song</span>Pu</h1>
      <div className="App">
        <SearchBar onSearch = {this.search}/>
        <div className="App-playlist">
          <SearchResults searchResults={this.state.searchResults}
                          onAdd = {this.addTrack}
          />
          <PlayList playlistName = {this.state.playlistName}
          playlistTracks = {this.state.playlistTracks}
          onRemove = {this.removeTrack}
          onNameChange = {this.updatePlaylistName} 
          onSave = {this.savePlaylist}/>
        </div>
      </div>
      </div>
    )
  }
}
export default App;
