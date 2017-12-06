import React, { Component } from "react";
import { Nav, NavItem } from "react-bootstrap";
import "./Box.css"

export default class Info extends Component {
	constructor(props) {
		super(props);

		this.state = {
			info: 1,
			active_key: 1
		}

		this.handleSelect = (number) => {
			console.log(number)
		}

	}

	render() {
	  let card_display;
	  if ( this.state.info == 1){
		card_display = (
		  <div>
			<p>ND ID: </p>
			<p>NetID: </p>
			<p>DOB: </p>
			<p>Year: </p>
			<p>Hall: </p>
			<p>Room #: </p>
			<p>Cell Phone #: </p>
		  </div>
		)
	  } else if( this.state.info == 2){
		card_display = (
		  <div>
			<p>Emergency Contact: </p>
			<p>Emergency Contact Phone: </p>
			<p>Emergency Contact Relation: </p>
			<hr></hr>
		  </div>
		)
	  } else {
		card_display = (
		  <div>
			<p>Filler</p>
		  </div>
		)
	  }
	  return (
		<div className="Home">
			<div className="lander">
				<Nav bsStyle="tabs" justified activeKey={this.state.active_key}>
          			<NavItem eventKey={1}>
						Basic Information
					</NavItem>
          			<NavItem eventKey={2}>
						Emergency Contact
					</NavItem>
          			<NavItem eventKey={3}>
						Health Information
					</NavItem>
        		</Nav>	
				<div className="Box">
					<h1>Royce Branning</h1>
					<hr></hr>
					{ card_display }
				</div>
			</div>
		</div>
	  )
	}
}
