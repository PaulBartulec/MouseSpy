window.onload = function(){
  mousePoints = new Array();
  document.body.onmousemove = function(event){
    mousePoints.push({x: event.x, y: event.y});
  };
};

window.onbeforeunload = function(){
  //uploadMousePoints();
};

function uploadMousePoints(){
  ajax("index.php", null, JSON.stringify(mousePoints), "POST");
}

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
  ajax("getMousePoints.php", "drawPoints", "option=" + theOption, "POST");
}

function drawPoints(records){
  canvas = document.getElementById("myCanvas");
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgba(100, 200, 200, 0.2)";
  for(record in records){
    var points = JSON.parse(records[record][0]);
    for(point in points){
      ctx.beginPath();
      ctx.arc(points[point].x, points[point].y, 10, 0, 2*Math.PI);
      ctx.fill();
    }
  }
}