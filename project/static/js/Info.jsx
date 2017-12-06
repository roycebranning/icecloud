import React, { Component } from "react";
import { Nav, NavItem, Button } from "react-bootstrap";
import "./Box.css"

export default class Info extends Component {
	constructor(props) {
		super(props);

		this.state = {
			info: 1,
			active_key: 1
		}

		this.handleSelect = event => {
			this.setState({info:3});
			this.setState({active_key:3});
		}

		this.goToMap = event => {
			this.props.history.push("/map")
		}

	}

	render() {
	  let card_display;
	  if ( this.state.info == 1){
		card_display = (
		  <div>
			<p>ND ID: 901732945</p>
			<p>NetID: cbrown4</p>
			<p>DOB: 01/01/1995</p>
			<p>Year: Senior</p>
			<p>Hall: Keenan</p>
			<p>Room #: 111</p>
			<p>Cell Phone #: 111-111-1111</p>
		  </div>
		)
	  } else if( this.state.info == 2){
		card_display = (
		  <div>
			<p>Emergency Contact: Snoopy</p>
			<p>Emergency Contact Phone: N/A</p>
			<p>Emergency Contact Relation: Pet Dog</p>
			<hr></hr>
		  </div>
		)
	  } else {
		card_display = (
		  <div>
			<p>Allergies: Peanut Butter, Bees</p>
			<p>Conditions: Hypoglycemia</p>
			<p>Medications: Allergy Medication</p>
		  </div>
		)
	  }
	  return (
		<div className="Home">
			<div className="lander">
				<Nav bsStyle="tabs" justified activeKey={this.state.active_key} onSelect={this.handleSelect}>
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
					<h1>Charlie Brown</h1>
					<hr></hr>
					{ card_display }
				</div>
				<br></br>
				<Button onClick={this.goToMap}>Map</Button>
			</div>
		</div>
	  )
	}
}
