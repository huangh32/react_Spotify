
import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import PlayList from '../PlayList/PlayList';
import TrackList from '../TrackList/TrackList';
import Track from '../Track/Track';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [{
        name:'a',
        artist: 'aa',
        album: 'aaa',
        id: '1'
      },
      {
        name:'b',
        artist: 'bb',
        album: 'bbb',
        id: '2'
      },
      {
        name:'c',
        artist: 'cc',
        album: 'ccc',
        id: '3'
      }],
      playlistName: 'My Playlist',
      playlistTracks: [{
        name:'playlist name1',
        artist: 'playlist artist 1',
        album: 'playlist album1',
        id: '5'
      },
      {
        name:'playlist name2',
        artist: 'playlist artist 2',
        album: 'playlist album2',
        id: '6'
      }]
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
    console.log('Click SavePlayList button');
  }

  search(term){
    console.log('the search term is:', term);

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
