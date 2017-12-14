import React, { Component } from "react";
import { Nav, NavItem, Button } from "react-bootstrap";
import request from 'superagent';
import "./Box.css"

export default class Info extends Component {
	constructor(props) {
		super(props);
		console.log(props)

		/*request.get('/api/iceform/resident_info/rsmick').end( (err, res) => {
			if (err) return

			console.log(res.body)
		})*/
		this.db_info = {
			'response': 'success',
			'name':'Jimmer Fredette',
			'ndid': '901883126',
			'netid': 'rbranning',
			'dob':'05/26/1996',
			'year': 'Senior',
			'dorm': 'Keenan',
			'room': '111',
			'phone_num': '659-154-9425',
			'ec_name': 'Dianna Branning',
			'ec_phone': '650-XXX-XXXX',
			'ec_relation': 'Mother',
			'allergies': 'none',
			'conditions':'none',
			'medications':'none'	

		};

		this.state = {
			active_key: 1
		}

		this.handleSelect = (eventKey) => {
			this.setState({active_key:eventKey});
		}

		this.goToMap = event => {
			this.props.history.push("/map")
		}

	}

	render() {
	  let card_display;
	  if ( this.state.active_key == 1){
		card_display = (
		  <div>
			<p>ND ID: {this.db_info['ndid']}</p>
			<p>NetID: {this.db_info['netid']}</p>
			<p>DOB: {this.db_info['dob']}</p>
			<p>Year: {this.db_info['year']}</p>
			<p>Hall: {this.db_info['dorm']}</p>
			<p>Room #: {this.db_info['room']}</p>
			<p>Cell Phone #: {this.db_info['phone_num']}</p>
		  </div>
		)
	  } else if( this.state.active_key == 2){
		card_display = (
		  <div>
			<p>Emergency Contact: {this.db_info['ec_name']}</p>
			<p>Emergency Contact Phone: {this.db_info['ec_phone']}</p>
			<p>Emergency Contact Relation: {this.db_info['ec_relation']}</p>
		  </div>
		)
	  } else {
		card_display = (
		  <div>
			<p>Allergies: {this.db_info['allergies']}</p>
			<p>Conditions: {this.db_info['conditions']}</p>
			<p>Medications: {this.db_info['medications']}</p>
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
					<h1>{this.db_info['name']}</h1>
					<hr></hr>
					{ card_display }
					<hr></hr>
				</div>
				<br></br>
				<Button href='/map'>Map</Button>
				<Button onClick={this.goToMap}>Map</Button>
			</div>
		</div>
	  )
	}
}
