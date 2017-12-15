// App.jsx
import React, { Component } from "react";
import { PageHeader, Nav, Navbar, NavItem } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import Routes from "./Routes";
import RouteNavItem from "./RouteNavItem";
//import HeaderBackgroundImage from '../images/header.jpg';
import request from "superagent";

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

require('../css/fullstack.css');


class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			isAuthenticated : false,
			usr : 'none',
			res_netid : 'none',
			accessGroup: 0,
			mapsNeeded: 'none',
			pointsToDraw: 'none'
		};

		this.userHasAuthenticated = (authenticated) => {
			this.setState({ isAuthenticated : authenticated});
		}
	
		this.addUsername = (addUser) => {
			this.setState({ usr : addUser})
		}

		this.userAccessGroup = (group) => {
			this.setState({accessGroup : group});
		}
		
		this.setMaps = (maps) => {
			this.setState({mapsNeeded : maps});
		}
		
		this.setPointsToDraw = (pts) => {
			this.setState({pointsToDraw : pts});
		}

		this.handleLogout = event => {
			request.get('/api/auth/logout').end( (err, res) => {
	  			if (err) return
	  			if (res.body['result'] == "success"){
					this.userHasAuthenticated(false);
					this.userAccessGroup(0);
					this.props.history.push("/login");
	  			} else {
		  			console.log('didnt make it')
	  			}
			});
		}

	}

		render () {

		const childProps = {
			isAuthenticated: this.state.isAuthenticated,
			userHasAuthenticated: this.userHasAuthenticated,
			addUsername: this.addUsername,
			usr: this.state.usr,
			userAccessGroup: this.userAccessGroup,
			accessGroup: this.state.accessGroup,

			mapsNeeded: this.state.mapNeeded,
			setMaps: this.setMaps,
			pointsToDraw: this.state.pointsToDraw,
			setPointsToDraw: this.setPointsToDraw
		};

		let navbar_items;
	
		if (this.state.isAuthenticated && this.state.accessGroup === 2) {
			navbar_items = (
			<Nav pullRight>
				<RouteNavItem key={1} href="/landing">
					Search
				</RouteNavItem>
				<RouteNavItem key={2} href="/iceform">
					IceForm
				</RouteNavItem>
				<RouteNavItem key={3} href="/map">
					Map
				</RouteNavItem>
				<NavItem key={4} onClick={this.handleLogout}>
					Logout
				</NavItem>
			</Nav>)
		}
		else if (this.state.isAuthenticated) {
			navbar_items = (
			<Nav pullRight>
				<RouteNavItem key={1} href="/iceform">
					IceForm
				</RouteNavItem>
				<RouteNavItem key={2} href="/map">
					Map
				</RouteNavItem>
				<NavItem key={3} onClick={this.handleLogout}>
					Logout
				</NavItem>
			</Nav>)
		}
		else {
			navbar_items = (
			<Nav pullRight>
				<RouteNavItem key={1} href="/signup">
					Signup
				</RouteNavItem>
				<RouteNavItem key={2} href="/login">
					Login
				</RouteNavItem>
			</Nav>)
		}

		return (
			<div>
					<div className="App container">
						<Navbar fluid collapseOnSelect>
						  <Navbar.Header>
							<Navbar.Brand>
							  <Link to="/">IceCloud</Link>
							</Navbar.Brand>
							<Navbar.Toggle />
						  </Navbar.Header>
						  <Navbar.Collapse>
							{navbar_items}
						  </Navbar.Collapse>
						</Navbar>
						<Routes childProps={ childProps } />
					</div>
			</div>
		);
	}
}
export default withRouter(App);
