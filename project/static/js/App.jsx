// App.jsx
import React from "react";
import Hello from "./Hello";
import { PageHeader } from "react-bootstrap";
//import HeaderBackgroundImage from '../images/header.jpg';

require('../css/fullstack.css');


export default class App extends React.Component {
	/*addHeaderImg() {
  		let headerBg = new Image();
  		headerBg.src = HeaderBackgroundImage;
	}*/
	render () {
		return (
    		<PageHeader>
      			<div className='header-contents'>
        		<Hello name='Chiggins' />
      			</div>
    		</PageHeader>
  		);
	}
}

