// Header.jsx
import React from "react";
require('../css/cover.css');

class Header extends React.Component {
	render (){
		return (
			<head>
	    		<meta charset="utf-8"></meta>
	    		<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no"></meta>
		    	<meta name="description" content=""></meta>
		    	<meta name="author" content=""></meta>
		    	<link rel="icon" href="../../../../favicon.ico"></link>

		    	<title>ICEcloud</title>

		    	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous"></link>

		    	<link rel="stylesheet" href="css/cover.css"></link>
		    	<link rel="stylesheet" href="dist/styles.css"></link>
		  	</head>
		  );
	}
}