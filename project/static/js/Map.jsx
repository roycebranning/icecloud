import React, { Component } from "react";
import "./Home.css";

export default class Map extends Component {
  constructor(props) {
    super(props); 
    console.log(props)
  } 

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Map</h1>
          <p></p>
        </div>
      </div>
    );
  }
}
