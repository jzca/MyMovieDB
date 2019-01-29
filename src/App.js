import React, { Component } from 'react';
import './App.css';
import { Route, Link } from 'react-router-dom'
import EaMov from './EaMov'
import EaMov2 from './EaMov2'

class App extends Component {

  state={
  so:'', // informal short name of Search in Chinese
  movies:[], // all movies are here
  already:[], // yesWatched
  notYet:[], //  noWatched
  reload:[], // Reload to the Bottom after hitting the 'Add' button
  added:[], // Check if the movie is added or not.
  }

  updateSou=(event)=>{
    this.setState({
      so:event.target.value
    })
  };

  formSubmit = (event) => {
    event.preventDefault();
    const apiKey=`e8479f82`;
    const input = this.state.so;
    fetch(`https://www.omdbapi.com/?apikey=${apiKey}&s=${input}`)
    .then(response => response.json())
    .then(movO => this.setState({ 
      so: "",
      movies: movO.Search,
      reload:[],
    }));
  } 

  yesWatched =(data)=>{
      this.setState((prevState) => ({
        already: [...prevState.already, data],
        added: [...prevState.added, data],
        reload: [data, ...prevState.reload],
        movies: prevState.movies.filter((m) => (
          m.Title !== data.Title
        )),
      })) 
    }

  noWatched =(data)=>{
      this.setState((prevState) => ({
        notYet: [...prevState.notYet, data],
        added: [...prevState.added, data],
        reload: [data, ...prevState.reload],
        movies: prevState.movies.filter((m) => (
          m.Title !== data.Title
        )),
      }))     
  }

  render() {
    return (
      <div className="App">
      <Route exact path="/" render={() => (
        <div>
            <h1>Jerry's MovDB</h1>
              <Link 
                to="/sou" // formal short name of Search in Chinese
                id='LinkGoTo'
                >Search for a Movie
              </Link>
           <div id='FieldAlready'>
              {this.state.already.length > 0 && <h2 id='oneH2'>AlreadyWatched</h2>}
              {this.state.already.length > 0 && this.state.already.map((one)=>(
                <EaMov2 key={one.imdbID+'yes'} data2={one}></EaMov2>
                ))
              }
            </div>
            <div id='FieldWanted'>
              {this.state.notYet.length > 0 && <h2 id='twoH2'>Want to Watch</h2>}
              {this.state.notYet.length > 0 && this.state.notYet.map((one)=>(
                <EaMov2 key={one.imdbID+'no'} data2={one}></EaMov2>
                ))
              }
            </div> 
        </div>
      )} />


      <Route path="/sou" render={() => (
          <div id='PageSou'>
            <Link 
              to="/"
              id='LinkBack'
            >Back to My Movies</Link>
            <form onSubmit={this.formSubmit}> 
            <input type='text' placeholder='Movie Title'
             value={this.state.so}
            onChange={this.updateSou}></input>
            <button type="submit" id='ButSou'>Search</button>
            </form>
            { this.state.movies !== undefined && this.state.movies.length>0 && this.state.movies.map((one)=>(
              <EaMov key={one.imdbID} data={one} added={this.state.added} yes={this.yesWatched} no={this.noWatched}></EaMov>
              ))
            }
            {this.state.reload.length>0 && this.state.reload.map((one)=>(
              <EaMov2 key={one.imdbID+'reload'} data2={one}></EaMov2>
              ))}
            {this.state.movies === undefined &&
            <address id='warnMsg'><strong>Illegal Input!</strong> No movies found for the search term.</address>}    
          </div>
        )} /> 

      </div>
    );
  }
}

export default App;

