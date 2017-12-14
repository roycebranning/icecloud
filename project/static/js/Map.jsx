import React, { Component } from "react";
import "./Home.css";

export default class About extends Component {
	constructor(props) {
		super(props); 
		console.log(props)
	} 

	render() {

		if (!this.props.isAuthenticated) {
			this.props.history.push("/login");
		}
		else if (this.props.accessGroup != 2) {
			return (<h3>Not Authorized</h3>);
		}

		function drawImageScaled(img, ctx) {
			var canvas = ctx.canvas ;
			var hRatio = canvas.width  / img.width    ;
			var vRatio =  canvas.height / img.height  ;
			var ratio  = Math.min ( hRatio, vRatio );
			var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
			var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x,
					centerShift_y,img.width*ratio, img.height*ratio);  
		}


		window.onload = function() {
			var canvas = document.getElementById("first_floor_canvas");
			var ctx = canvas.getContext("2d");
			var img = document.getElementById("first_floor");
			drawImageScaled(img, ctx);

			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.moveTo(40,99);
			ctx.lineTo(64,99);
			ctx.lineTo(64,24);
			ctx.lineTo(82,24);
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();

			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.moveTo(88,294);
			ctx.lineTo(64,294);
			ctx.lineTo(64,466);
			ctx.lineTo(131,466);
			ctx.lineTo(131,446);
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();
		};

		return (
				<div className="Home">
				  <div className="lander">
				    <h1>Map</h1>
				    <body>

					  <img id="first_floor" style="display:none"
					  src="images/105502.jpg" alt="First Floor Floorplan"></img>

					  <p>Canvas:</p>

					  <canvas id="first_floor_canvas" width="540" height="597">
					  Your browser does not support the HTML5 canvas tag.
					  </canvas>
					</body>
					<p></p>
				  </div>
				</div>
			   );
	}
}
