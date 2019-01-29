import React, { Component } from 'react';

class EaMov extends Component {
  render() {
    const data=this.props.data;
    const added=this.props.added;
    return (
      <div className="eaMov">
        <img src={data.Poster} alt={data.imdbID}></img>
        <p>{data.Title}</p>
        {!added.map((a)=>(a.Title)).includes(data.Title) &&
          <div>
            <button id='butA' onClick={()=>{this.props.yes(data)}}>Already Watched</button>
            <button id='butB' onClick={()=>{this.props.no(data)}}>Want to Watch</button>
          </div>
        }
      </div>
    );
  }
}

export default EaMov;