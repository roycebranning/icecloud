import React, { Component } from "react";
import request from 'superagent';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
	console.log(this.props)

    this.state = {
      username: "",
      password: ""
    };

    
    this.handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    this.handleSubmit = event => {
      event.preventDefault();
	  request.post('/api/login').send({'username':this.state.username, 'password':this.state.password}).end( (err, res) => {
	  if (err) return
	  if (res.body['result'] == "Logged in"){
		console.log('logged in username: ' + this.state.username);
		console.log('state usr: ' + this.props.usr)
		this.props.userHasAuthenticated(true);
		this.props.addUsername(this.state.username);
		this.props.history.push("/landing")
		console.log('user = ' + this.props.usr);
		console.log(this.props)
	  } else {
		  console.log('didnt make it')
	  }
	})

    }

  }

  validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
  }

  
  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
