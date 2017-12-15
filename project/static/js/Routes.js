import React from "react";
import { Route, Switch } from "react-router-dom";
import AppliedRoute from "./AppliedRoutes";
import Home from "./Home";
import About from "./About";
//import Hello from "./Hello";
import LoginForm from "./LoginForm";
import SignUp from "./Signup";
import IceForm from "./IceForm";
//import Landing from "./Landing";
import Example from "./Landing";
import Info from "./Info";
import Map from "./Map";
import GetMap from "./GetMap";
import NotFound from "./NotFound";



export default ({ childProps }) =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} props={childProps} />
	<AppliedRoute path="/about" component={About} props={childProps} />
	<AppliedRoute path="/login" component={LoginForm} props={childProps} />
	<AppliedRoute path="/signup" component={SignUp} props={childProps} />
	<AppliedRoute path ="/iceform" component={IceForm} props={childProps} />
	<AppliedRoute path ="/landing" component={Example} props={childProps} />
	<AppliedRoute path="/map" component={GetMap} props={childProps} />
	<AppliedRoute path ="/info" component={Info} props={childProps} />
	<Route component={NotFound} />
  </Switch>;
