window.onload = function(){
  if(location.search.indexOf("mouseSpy=true") === -1){
		// track mouse positions & update them every 5 seconds
    mousePoints = new Array();
    document.body.onmousemove = function(event){
      mousePoints.push({x: event.pageX, y: event.pageY});
    };
    setInterval("uploadMousePoints()", 5000);
  }
  else{
		// display saved mouse positions
    document.body.appendChild(createCanvas());
		getMousePoints();
  }
};

function createCanvas(){
  var canvas = document.createElement("canvas");
	
	// set canvas properties
  canvas.id = "mouseSpyCanvas";
	
	canvas.height = document.body.clientHeight;
	canvas.width = document.body.clientWidth;
	
	canvas.style.top = 0;
	canvas.style.left = 0;
  canvas.style.position = "absolute";
	
  return canvas;
}

function uploadMousePoints(){
  ajax("/MouseSpy/saveMousePoints.php", null, JSON.stringify(mousePoints), "POST");
	mousePoints = new Array();
}

// wrapper function for ajax call
function ajax(url, callback, data, type){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function(){
    if (xhr.readyState === 4 && xhr.status === 200){
      if(callback !== null)
        eval(callback + "(" + xhr.responseText +  ")");
    }
  };
  xhr.open(type, url, false);
  xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
  xhr.send(data);
}

function getMousePoints(theOption){
  ajax("/MouseSpy/getMousePoints.php", "drawPoints", null, "POST");
}

function drawPoints(records){
  canvas = document.getElementById("mouseSpyCanvas");
  ctx = canvas.getContext("2d");
	
	// setting color and opacity for the circles
	ctx.fillStyle = "rgba(100, 200, 200, 0.1)";
	
  for(record in records){
    var points = JSON.parse(records[record][0]);
    for(point in points){
      drawCirlce(points[point].x, points[point].y, 10);
    }
  }
}

function drawCirlce(x, y, radius){
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2*Math.PI);
	ctx.fill();
}