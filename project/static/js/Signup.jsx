import React, { Component } from "react";
import request from 'superagent';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class SignUp extends Component {
  constructor(props) {
    super(props);
	console.log(this.props)

    this.state = {
      username: "",
      password: "",
      first_name: "",
      last_name: "",
      ndid: "",
      dorm: "",
      room_num: "",
      email: ""
    };

    
    this.handleChange = event => {
      this.setState({
        [event.target.id]: event.target.value
      });
    }

    this.handleSubmit = event => {
      event.preventDefault();
	  request.post('/api/account/create_account').send({'username':this.state.username, 'password':this.state.password, 'first_name':this.state.first_name, 'last_name':this.state.last_name,'ndid':this.state.ndid, 'dorm':this.state.dorm, 'room_num':this.state.room_num,'email':this.state.email}).end( (err, res) => {
    if (err) return
    console.log(res.body)
    if (res.body['result'] == "success") {
      console.log('Success')
      //redirect here
      this.props.userHasAuthenticated(true);
      this.props.addUsername(this.state.username);  
      this.props.history.push("/iceform")
    } else {
      alert(res.body['message'])
    }
/*
	  if (res.body['result'] == "Logged in"){
		console.log('logged in username: ' + this.state.username);
		console.log('state usr: ' + this.props.usr)
		this.props.userHasAuthenticated(true);
		this.props.addUsername(this.state.username);	
		this.props.history.push("/iceform")
		console.log('user = ' + this.props.usr);
		console.log(this.props)
	  } else {
		  console.log(res.body)
	  }
*/
	})

    }

  }

  validateForm() {
      return this.state.username.length > 0 && this.state.password.length > 0;
  }

  
  render() {
    return (
      <div className="Signup">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bsSize="large">
            <ControlLabel>Netid</ControlLabel>
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
          <FormGroup controlId="first_name" bsSize="large">
            <ControlLabel>First Name</ControlLabel>
            <FormControl
              type="first_name"
              value={this.state.first_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="last_name" bsSize="large">
            <ControlLabel>Last Name</ControlLabel>
            <FormControl
              type="last_name"
              value={this.state.last_name}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="ndid" bsSize="large">
            <ControlLabel>NDid</ControlLabel>
            <FormControl
              type="ndid"
              value={this.state.ndid}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="dorm" bsSize="large">
            <ControlLabel>Dorm</ControlLabel>
            <FormControl
              type="dorm"
              value={this.state.dorm}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="room_num" bsSize="large">
            <ControlLabel>Room Number</ControlLabel>
            <FormControl
              type="room_num"
              value={this.state.room_num}
              onChange={this.handleChange}
            />
          </FormGroup>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Create Account
          </Button>
        </form>
      </div>
    );
  }
}
