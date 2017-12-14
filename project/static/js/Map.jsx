import React, { Component } from "react";
import "./Home.css";

export default class Map extends Component {
	constructor(props) {
		super(props); 
		console.log(props)
	} 

	render() {

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
		
			var par = document.getElementById("location_par");
			par.style.fontSize = "24px";
			var par = document.getElementById("stairs_par");
			par.style.fontSize = "24px";
			var canvas = document.getElementById("third_floor_canvas");
			var ctx = canvas.getContext("2d");
			var img = document.getElementById("third_floor");
			img.style.display = "none";
			drawImageScaled(img, ctx);

			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.moveTo(138,337);
			ctx.lineTo(116,337);
			ctx.lineTo(116,469);
			ctx.lineTo(182,469);
			ctx.lineTo(182,450);
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();
			
			var canvas = document.getElementById("first_floor_canvas");
			var ctx = canvas.getContext("2d");
			var img = document.getElementById("first_floor");
			img.style.display = "none";
			drawImageScaled(img, ctx);
			
			ctx.beginPath();
			ctx.lineWidth = 2;
			ctx.moveTo(147,398);
			ctx.lineTo(147,416);
			ctx.lineTo(280,416);
			ctx.lineTo(280,438);
			ctx.strokeStyle = '#ff0000';
			ctx.stroke();
		};

		return (
				<div className="Home">
				  <div className="lander">
				    <h1>Map</h1>
					<p id="location_par">The nearest first aid kit is in room 103. Here is your fastest path:
					</p>
					<img id="third_floor" src='https://i.imgur.com/Je5ked5.jpg'>
					</img>
					<img id="first_floor" src='https://i.imgur.com/cxmgQvl.jpg'>
					</img>
					<canvas id="third_floor_canvas" width="460" height="600">
					  Your browser does not support the HTML5 canvas tag.
					</canvas>
					<p id="stairs_par">Take the stairs to the first floor.
					</p>
					<canvas id="first_floor_canvas" width="540" height="529">
					  Your browser does not support the HTML5 canvas tag.
					</canvas>
				  </div>
				</div>
			   );
	}
}
