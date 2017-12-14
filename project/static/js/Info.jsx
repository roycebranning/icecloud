import React, { Component } from "react";
import { Nav, NavItem, Button } from "react-bootstrap";
import request from 'superagent';
import "./Box.css"

export default class Info extends Component {
	constructor(props) {
		super(props);
		console.log(props)

		this.db_info = {}

		
		this.state = {
			active_key: 1,
			db_data: {}
		}

		this.handleSelect = (eventKey) => {
			this.setState({active_key:eventKey});
		}

		this.goToMap = event => {
			this.props.history.push("/map")
		}

	}

	componentDidMount() {
		request.get('/api/iceform/resident_info/'+this.props.usr).end( (err, res) => {
			if (err) return

			console.log(res.body)
			this.db_info['name'] = res.body['data']['first_name'] + ' ' +
								res.body['data']['last_name']
			this.db_info['ndid'] = res.body['data']['ndid']
			this.db_info['netid'] = res.body['data']['netid']
			this.db_info['dob'] = res.body['data']['birthday']
			this.db_info['year'] = res.body['data']['class_level']
			this.db_info['dorm'] = res.body['data']['dorm']
			this.db_info['room'] = res.body['data']['room_num']
			this.db_info['phone_num'] = res.body['data']['phone_number']
			this.db_info['ec_name'] = res.body['data']['emergency_contacts'] ? res.body['data']['emergency_contacts'][0]['name'] : null
			this.db_info['ec_phone'] = res.body['data']['emergency_contacts'] ? res.body['data']['emergency_contacts'][0]['phone'] : null
			this.db_info['ec_relation'] =res.body['data']['emergency_contacts'] ? res.body['data']['emergency_contacts'][0]['relation'] : null
			this.db_info['allergies'] = 'none'
			this.db_info['condiions'] = 'none'
			this.db_info['medications'] = 'none'

			
			this.setState({db_data: this.db_info})
		})


	}

	render() {
	  let card_display;
	  if ( this.state.active_key == 1){
		card_display = (
		  <div>
			<p>ND ID: {this.state.db_data['ndid']}</p>
			<p>NetID: {this.state.db_data['netid']}</p>
			<p>DOB: {this.state.db_data['dob']}</p>
			<p>Year: {this.state.db_data['year']}</p>
			<p>Hall: {this.state.db_data['dorm']}</p>
			<p>Room #: {this.state.db_data['room']}</p>
			<p>Cell Phone #: {this.state.db_data['phone_num']}</p>
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

	  if (!this.props.isAuthenticated) {
		this.props.history.push('/login');
	  }
	  else if (this.props.accessGroup != 2) {
		return (<h3>Not Authorized</h3>);
	  }

	  return (
		<div className="Home">
			<div className="lander">
				<Nav bsStyle="tabs" justified activeKey={this.state.active_key} onSelect={this.handleSelect}>
          			<NavItem eventKey={1}>
						Baesic Information
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
