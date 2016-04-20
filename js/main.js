document.onmousemove = handleMouseMove;
function handleMouseMove(event) {
    var dot, eventDoc, doc, body, pageX, pageY;

    event = event || window.event; // IE-ism

    var percentWidth =  event.pageX / window.innerWidth
    var percentHeight = event.pageY / window.innerHeight

    var totalFrames = 13;

    var frame = Math.floor(totalFrames*percentWidth);

    var offset = getOffSet(5, 3, window.innerWidth * 3, window.innerWidth * .56295525494 * 5, frame);
    document.getElementById("turningSprite").style.left = offset[0]*-1 +"px";
    document.getElementById("turningSprite").style.top = offset[1]*-1 +"px";

    // Use event.pageX / event.pageY here
}


function getOffSet(rows, columns, width, height, frame){
  var imgWidth = width / columns;
  var imgHeight = height / rows;
  var x = imgWidth * (frame % columns);
  var y = imgHeight * Math.floor(frame / columns);
  return [x, y]
}
