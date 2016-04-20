document.onmousemove = handleMouseMove;
window.onresize = handleResize;

function handleMouseMove(event) {
    turnTowards(event.pageX)
}
function handleResize(event){
  turnTowards(0)
}

function turnTowards(xPos){
  event = event || window.event; // IE-ism

  var percentWidth =  xPos / window.innerWidth

  var totalFrames = 13;
  var aspectRatio = .56295525494;

  var frame = Math.floor(totalFrames*percentWidth);

  var offset = getOffSet({'rows': 5, 'columns':3, 'width':window.innerWidth * 3, 'height':window.innerWidth * aspectRatio * 5}, frame);
  document.getElementById("turningSprite").style.left = offset[0]*-1 +"px";
  document.getElementById("turningSprite").style.top = offset[1]*-1 +"px";
}


function getOffSet(specs, frame){
  var imgWidth = specs.width / specs.columns;
  var imgHeight = specs.height / specs.rows;
  var x = imgWidth * (frame % specs.columns);
  var y = imgHeight * Math.floor(frame / specs.columns);
  return [x, y]
}
