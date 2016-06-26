// https://jsfiddle.net/leaverou/zXPzY/
//http://codepen.io/katmai7/pen/jCAhv?editors=0100
//http://stackoverflow.com/questions/15692353/animate-a-canvas-circle-to-draw-on-load
//http://www.w3schools.com/tags/canvas_arc.asp
//http://stackoverflow.com/questions/839899/how-do-i-calculate-a-point-on-a-circle-s-circumference

//http://stackoverflow.com/questions/5927284/how-can-i-make-setinterval-also-work-when-a-tab-is-inactive-in-chrome

function sec2min(seconds) {
  // starts at 19:0;

  var colon = ":";

  if (Math.round(seconds) % 60 < 1) {
    return Math.round(seconds / 60) + colon + "00";
  } else {
    if (Math.round(seconds) % 60 < 10) {
      colon = ":0";
    }
    return Math.floor(seconds / 60) + colon + Math.round(seconds) % 60;
  }
}

function runFunction() {

  curTime = Math.round(new Date().getTime() / 100);
  var timePassed = curTime - oldTime;

  // 600 times has to equal 2

  var circleMove = timePassed / (mil / 2);

  var secsPassed = timePassed / 10;

  secs = secs - secsPassed;
  x = x + circleMove;

  //secs = Math.round(secs);
  document.getElementById("time").innerHTML = sec2min(secs);

  // 2000
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.beginPath();
  ctx.arc(160, 160, r, 1.5 * Math.PI, x * Math.PI);
  ctx.lineWidth = 5;
  ctx.strokeStyle = curcolor;
  ctx.stroke();
  ctx.closePath;
  ctx.beginPath();
  var x1 = 160 + r * Math.cos(x * Math.PI);
  var y = 160 + r * Math.sin(x * Math.PI);
  ctx.arc(x1, y, 10, -2 * Math.PI, 2 * Math.PI);
  ctx.fillStyle = curcolor;
  ctx.fill();
  ctx.closePath;

  oldTime = Math.round(new Date().getTime() / 100);
  if (secs < .01) {
    if (document.getElementById("currentSession").innerHTML === "SESSION") {
      document.getElementById("currentSession").innerHTML = "BREAK!";
      secs = parseInt(document.getElementById("breakMins").innerHTML) * 60;

      document.getElementById("time").innerHTML = sec2min(secs);
      curcolor = "#f80";
      x = 1.5;
      document.getElementById('timer').style.color = curcolor;
      // document.getElementById('circle').style.boxShadow = "0 0 20px 10px #d60";
      mil = secs * 10;
    } else {
      document.getElementById("currentSession").innerHTML = "SESSION";
      secs = parseInt(document.getElementById("sessionMins").innerHTML) * 60;
      curcolor = "#55f";
      x = 1.5;
      document.getElementById('timer').style.color = curcolor;
      // document.getElementById('circle').style.boxShadow = "0 0 20px 10px #33d";
      mil = secs * 10;
    }

  }

}

function playPause() {

  if (pause === false) {
    clearInterval(go);
    pause = true;
    document.getElementById("icon").className = "fa fa-play";
  } else {
    document.getElementById("icon").className = "fa fa-pause";
    oldTime = Math.round(new Date().getTime() / 100);
    go = setInterval(runFunction, 100);
    pause = false;
  }
}

function session() {

}

function breakTime(obj) {
  if (pause === true) {
    var symbol = obj.text;
    if (symbol === "+") {
      document.getElementById("breakMins").innerHTML = parseInt(document.getElementById("breakMins").innerHTML) + 1;
    } else {
      if (document.getElementById("breakMins").innerHTML !== "1") {
        document.getElementById("breakMins").innerHTML = parseInt(document.getElementById("breakMins").innerHTML) - 1;
      }

    }
    if (document.getElementById("currentSession").innerHTML === "BREAK!") {
      document.getElementById("time").innerHTML = document.getElementById("breakMins").innerHTML;
      secs = parseInt(document.getElementById("time").innerHTML) * 60;
      x = 1.5;
      clearInterval(go);
      mil = secs * 10;
      ctx.clearRect(0, 0, c.width, c.height);
    }
  }
}

function session2(obj) {
  if (pause === true) {
    var symbol = obj.text;

    if (symbol === "+") {
      document.getElementById("sessionMins").innerHTML = parseInt(document.getElementById("sessionMins").innerHTML) + 1;
    } else {
      if (document.getElementById("sessionMins").innerHTML !== "1") {
        document.getElementById("sessionMins").innerHTML = parseInt(document.getElementById("sessionMins").innerHTML) - 1;
      }

    }
    if (document.getElementById("currentSession").innerHTML === "SESSION") {
      document.getElementById("time").innerHTML = document.getElementById("sessionMins").innerHTML;
      secs = parseInt(document.getElementById("time").innerHTML) * 60;
      x = 1.5;
      clearInterval(go);
      mil = secs * 10;
      ctx.clearRect(0, 0, c.width, c.height);
    }
  }
}

var x = 1.5;
var c = document.getElementById("myCanvas");
var r = 142.5
var ctx = c.getContext("2d");
var session = true;
document.getElementById("sessionMins").innerHTML;

document.getElementById("timer").innerHTML;

var secs = parseInt(document.getElementById("time").innerHTML) * 60;
var mil = secs * 10;

var oldTime;
var curTime;
var curcolor = "#55f";
var pause = true;
var go;