import React, { Component } from "react";
import request from 'superagent';
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";

export default class GetMap extends Component {
	constructor(props) {
		super(props);
		console.log(this.props)

		this.state = {
			startRoom: "",
			destGoal: "exit",
			path: [],
			floors: [],
			img: '',
			ctx: ''
		};

		this.handleChange = event => {
			this.setState({
				[event.target.id]: event.target.value
			});
		}

		this.handleSubmit = event => {
			event.preventDefault();
			console.log("state: ", this.state);
			request.post('/api/map_gen/get_map_path').send({'src':this.state.startRoom, 'dest':this.state.destGoal}).end( (err, res) => {
				if (err) return
				if (res.body['result'] == "success"){	
					this.state.path = res.body['path'];
					this.state.floors = res.body['floors'];
					this.drawMaps()
					console.log(this.state.path)
					console.log(this.state.floors)
				} else {
					console.log('didnt make it')
				}
			})	
		}

		this.drawMaps = event => {
			var canvas1 = document.getElementById("first_floor_canvas");
			var canvas2 = document.getElementById("second_floor_canvas");
			var canvas3 = document.getElementById("third_floor_canvas");
			var canvas4 = document.getElementById("fourth_floor_canvas");
			canvas1.style.display="none";
			canvas2.style.display="none";
			canvas3.style.display="none";
			canvas4.style.display="none";
			
			document.getElementById("first_floor_para").innerHTML = "";
			document.getElementById("second_floor_para").innerHTML = "";
			document.getElementById("third_floor_para").innerHTML = "";
			document.getElementById("fourth_floor_para").innerHTML = "";
			
			var img1 = document.getElementById("first_floor")
			var img2 = document.getElementById("second_floor")
			var img3 = document.getElementById("third_floor")
			var img4 = document.getElementById("fourth_floor")
			console.log(this.state.floors);
			console.log(this.state.floors.length);
			for(var i = 0; i < this.state.floors.length; i++) {
				console.log("for loop, i = ", i);
				if(this.state.floors[i] == 1) {
					document.getElementById("first_floor_para").innerHTML = "First Floor Map:";
					this.state.img = img1;
					var canvas = document.getElementById("first_floor_canvas");
					canvas.style.display="inline";
					this.state.ctx = canvas.getContext("2d");
					this.drawImageScaled();
				} else if(this.state.floors[i] == 2) {
					document.getElementById("second_floor_para").innerHTML = "Second Floor Map:";
					this.state.img = img2;
					var canvas = document.getElementById("second_floor_canvas");
					canvas.style.display="inline";
					this.state.ctx = canvas.getContext("2d");
					this.drawImageScaled();
				} else if(this.state.floors[i] == 3) {
					document.getElementById("third_floor_para").innerHTML = "Third Floor Map:";
					this.state.img = img3;
					var canvas = document.getElementById("third_floor_canvas");
					canvas.style.display="inline";
					this.state.ctx = canvas.getContext("2d");
					this.drawImageScaled();
				} else if(this.state.floors[i] == 4) {
					document.getElementById("fourth_floor_para").innerHTML = "Fourth Floor Map:";
					this.state.img = img4;
					var canvas = document.getElementById("fourth_floor_canvas");
					canvas.style.display="inline";
					this.state.ctx = canvas.getContext("2d");
					this.drawImageScaled();	
				}
				this.state.ctx.beginPath();
				this.state.ctx.lineWidth = 2;
				this.state.ctx.moveTo(this.state.path[i][0][0], this.state.path[i][0][1]);
				for(var j = 1; j < this.state.path[i].length; j++) {
					console.log("for loop, j = ", j);
					this.state.ctx.lineTo(this.state.path[i][j][0], this.state.path[i][j][1]);
				}
				this.state.ctx.strokeStyle = '#ff0000';
				this.state.ctx.stroke();
			}
		}
		
		this.drawImageScaled = event => {
			var ctx = this.state.ctx;
			var img = this.state.img;
			var canvas = ctx.canvas;
			var hRatio = canvas.width  / img.width    ;
			var vRatio =  canvas.height / img.height  ;
			var ratio  = Math.min ( hRatio, vRatio );
			var centerShift_x = ( canvas.width - img.width*ratio ) / 2;
			var centerShift_y = ( canvas.height - img.height*ratio ) / 2;  
			ctx.clearRect(0,0,canvas.width, canvas.height);
			ctx.drawImage(img, 0, 0, img.width, img.height, centerShift_x,
					centerShift_y,img.width*ratio, img.height*ratio);  
		}
	}

	validateForm() {
		return this.state.startRoom.length > 0 && this.state.destGoal.length > 0;
	}
	
	validateMapData() {
		return this.state.path.length > 0 && this.state.floors.length > 0;
	}

	render() {
		return (
			  <div id="div1" className="Map">
				<form onSubmit={this.handleSubmit}>
				  <FormGroup controlId="startRoom" bsSize="large">
					<ControlLabel>Starting Room Number</ControlLabel>
					<FormControl
					  autoFocus
					  type="username"
					  onChange={this.handleChange}
					  value={this.state.startRoom}
					/>
				  </FormGroup>	
				  <FormGroup controlId="destGoal" bsSize="large">
      				<ControlLabel>Destination Goal</ControlLabel>
     				<FormControl componentClass="select" placeholder="select" onChange={this.handleChange}>
        			  <option value="exit">Nearest Exit</option>
        			  <option value="extinguisher">Nearest Fire Extinguisher</option>
        			  <option value="first_aid">Nearest First-Aid</option>
    				</FormControl>
    			  </FormGroup>
				  <Button
					block
					bsSize="large"
					disabled={!this.validateForm()}
					type="submit"
				  >
					Get Path!
				  </Button>
				  <img id="first_floor" style={{display: 'none'}} src='https://i.imgur.com/cxmgQvl.jpg'></img>
				  <img id="second_floor" style={{display: 'none'}} src='https://i.imgur.com/L2pGJmt.jpg'></img>
				  <img id="third_floor" style={{display: 'none'}} src='https://i.imgur.com/Je5ked5.jpg'></img>	
				  <img id="fourth_floor" style={{display: 'none'}} src='https://i.imgur.com/hAwT1tK.jpg'></img>
				  <p id="first_floor_para" style={{font_size:'24pt'}}></p>
				  <canvas id="first_floor_canvas" width="540" height="529">
					Your browser does not support the HTML5 canvas tag.
				  </canvas>
				  <p id="second_floor_para" style={{font_size:'24pt'}}></p>
				  <canvas id="second_floor_canvas" width="540" height="597">
					Your browser does not support the HTML5 canvas tag.
				  </canvas>
				  <p id="third_floor_para" style={{font_size:'24pt'}}></p>
				  <canvas id="third_floor_canvas" width="460" height="600">
					Your browser does not support the HTML5 canvas tag.
				  </canvas>
				  <p id="fourth_floor_para" style={{font_size:'24pt'}}></p>
				  <canvas id="fourth_floor_canvas" width="456" height="600">
					Your browser does not support the HTML5 canvas tag.
				  </canvas>
				</form>
			  </div>
		);
	}
}
