import React from 'react';


import './App.css';


const angleText = {
  "height": "60px",
  "margin": "15px auto",
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      hours: 0,
      minutes: 0,
      angle: '',
      showClock: false
    }
  }



  handleChange = (e, name) => {
    this.setState({
      [name]: e.target.value,
      showClock: false,
      angle: ''
    })
  }

  getAngle = (e) => {
    if (this.state.hours < 0 || this.state.hours > 12 || this.state.minutes < 0 || this.state.minutes > 60) {
      this.setState({
        angle: 'Enter the valid time to convert i.e in range as 0-12 for hours and 0-60 for minutes'
      })
      return;
    }
    let h = (this.state.hours * 360) / 12 + (this.state.minutes * 360) / (12 * 60);

    let m = (this.state.minutes * 360) / (60);

    let angle = Math.abs(h - m);

    if (angle > 180) {
      angle = 360 - angle;
    }

    this.setState({
      angle: angle,
      showClock: true
    }, () => {
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext("2d");
      let radius = canvas.height / 2;
      ctx.translate(radius, radius);
      radius = radius * 0.90
      this.drawClock(ctx, radius);
      this.drawNumbers(ctx, radius);
      this.drawTime(ctx, radius);
    })

  }

  drawClock = (ctx, radius) => {
    this.drawFace(ctx, radius)
  }

  drawFace = (ctx, radius) => {
    let grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'white';
    ctx.fill();

    grad = ctx.createRadialGradient(0, 0, radius * 0.95, 0, 0, radius * 1.05);
    grad.addColorStop(0, '#333');
    grad.addColorStop(0.5, 'white');
    grad.addColorStop(1, '#333');
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.1;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.1, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
  }


 drawNumbers = (ctx, radius) => {
  var ang;
  var num;
  ctx.font = radius*0.15 + "px arial";
  ctx.textBaseline="middle";
  ctx.textAlign="center";
  for(num = 1; num < 13; num++){
    ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius*0.85);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius*0.85);
    ctx.rotate(-ang);
  }
}


  drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }

  drawTime(ctx, radius) {
    let hour = this.state.hours;
    let minute = this.state.minutes;
    let second = 0;
    hour = hour % 12;
    hour = (hour * Math.PI / 6) +
      (minute * Math.PI / (6 * 60)) +
      (second * Math.PI / (360 * 60));
    this.drawHand(ctx, hour, radius * 0.5, radius * 0.07);
    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    this.drawHand(ctx, minute, radius * 0.8, radius * 0.07);
    second = (second * Math.PI / 30);
    this.drawHand(ctx, second, radius * 0.9, radius * 0.02);
  }

  render(props) {
    return (
      <React.Fragment>
        <div className="form">
        <input id='hh' placeholder="enter hours" onChange={e => { this.handleChange(e, 'hours') }} /> : <input id='mm' placeholder="enter minutes" onChange={e => { this.handleChange(e, 'minutes') }} />
        <button className="btn"  onClick={e => { this.getAngle(e) }}>submit</button>
        <div style={angleText}>
          <span>Then angle for the given time is {this.state.angle}</span>
        </div>
        </div>
        <div className="clock">
          {this.state.showClock && <canvas className="clockStyle" id="canvas" width="200" height="200" ></canvas>}
        </div>
      </React.Fragment>
    );
  }
}

export default App;