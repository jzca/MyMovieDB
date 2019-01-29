import React, { Component } from 'react';

class EaMov2 extends Component {
  render() {
		const data2=this.props.data2;
    return (
      <div className="eaMov">
      <img src={data2.Poster} alt={data2.imdbID}></img>
			<p>{data2.Title}</p>
      </div>
    );
  }
}

export default EaMov2;