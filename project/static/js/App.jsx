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
			res_netid : 'none'		
		};

		this.userHasAuthenticated = (authenticated) => {
			this.setState({ isAuthenticated : authenticated});
		}
	
		this.addUsername = (addUser) => {
			this.setState({ usr : addUser})
		}


		this.handleLogout = event => {
			request.get('/api/auth/logout').end( (err, res) => {
	  			if (err) return
	  			if (res.body['result'] == "success"){
					this.userHasAuthenticated(false);
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
			usr: this.state.usr
		};

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
						    <Nav pullRight>
							  {this.state.isAuthenticated
  								? [
									<RouteNavItem key={1} href="/landing">
										Search
									</RouteNavItem>,
									<RouteNavItem key={2} href="/iceform">
										IceForm
									</RouteNavItem>,
									<NavItem key={3} onClick={this.handleLogout}>
										Logout
									</NavItem>
								  ]
  								: [
      								<RouteNavItem key={1} href="/signup">
        								Signup
		      						</RouteNavItem>,
									<RouteNavItem key={2} href="/login">
										Login
									</RouteNavItem>
								 ]}
						    </Nav>
						  </Navbar.Collapse>
						</Navbar>
						<Routes childProps={ childProps } />
					</div>
			</div>
		);
	}
}
export default withRouter(App);
