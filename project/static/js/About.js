import React, { Component } from "react";
import "./Home.css";

export default class About extends Component {
  constructor(props) {
    super(props); 
    console.log(props)
  } 

  render() {
    return (
      <div className="Home">
        <div className="lander">
          <h1>Form Submitted!</h1>
          <p>Quick access to the In Case of Emergency Forms for your organization.</p>
        </div>
      </div>
    );
  }
}
