// /**
//  *
//  * @project        Motion Detection in JS
//  * @file           ImageCompare.js
//  * @description    Core functionality.
//  * @author         Benjamin Horn
//  * @package        MotionDetector
//  * @version        -
//  *
//  */
//
// ;(function(App) {
//
// 	"use strict";
//
// 	/*
// 	 * The core motion detector. Does all the work.
// 	 *
// 	 * @return <Object> The initalized object.
// 	 *
// 	 */
// 	App.Core = function() {
//
// 		var rendering = false;
//
// 		var width = 64;
// 		var height = 48;
//
// 		var webCam = null;
// 		var imageCompare = null;
//
// 		var currentImage = null;
// 		var oldImage = null;
//
// 		var topLeft = [Infinity,Infinity];
// 		var bottomRight = [0,0];
//
// 		var MIDDLE = 300;
//
// 		var currentLocation = MIDDLE;
// 		var lastTarget = MIDDLE;
// 		var direction = "none";
// 		var lastDirection = "none";
// 		var count = 0;
//
// 		var raf = (function(){
// 			return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
// 			function( callback ){
// 				window.setTimeout(callback, 1000/60);
// 			};
// 		})();
//
// 		/*
// 		 * Initializes the object.
// 		 *
// 		 * @return void.
// 		 *
// 		 */
// 		function initialize() {
// 			imageCompare = new App.ImageCompare();
// 			webCam = new App.WebCamCapture(document.getElementById('webCamWindow'));
//
// 			rendering = true;
//
// 			main();
// 		}
//
// 		/*
// 		 * Compares to images and updates the position
// 		 * of the motion div.
// 		 *
// 		 * @return void.
// 		 *
// 		 */
// 		function render() {
// 			oldImage = currentImage;
// 			currentImage = webCam.captureImage(false);
//
// 			if(!oldImage || !currentImage) {
// 				return;
// 			}
//
// 			var vals = imageCompare.compare(currentImage, oldImage, width, height);
//
// 			topLeft[0] = vals.topLeft[0] * 10;
// 			topLeft[1] = vals.topLeft[1] * 10;
//
// 			bottomRight[0] = vals.bottomRight[0] * 10;
// 			bottomRight[1] = vals.bottomRight[1] * 10;
//
// 			var my_area = area(topLeft, bottomRight);
// 			if(my_area > 3000 && my_area !== Infinity){
// 				// console.log(my_area);
// 			}else{
// 				topLeft = [Infinity,Infinity];
// 				bottomRight = [0,0]
// 			}
//
// 			var target = (topLeft[0] + bottomRight[0])/2;
// 			var target = 600 - target; // reverse
//
// 			// if(topLeft[0] === Infinity){
// 			// 	target = MIDDLE;
// 			// }
// 			var frame = Math.floor(currentLocation/20);
// 			console.log(frame);
// 			var offset = getOffSet(7, 5, 7240, 6585, frame);
// 			document.getElementById("turningSprite").style.left = offset[0]*-1 +"px";
// 			document.getElementById("turningSprite").style.top = offset[1]*-1 +"px";
//
//
// 			currentLocation = Math.floor(currentLocation/10)*10;
// 			lastTarget = Math.floor(lastTarget/10)*10;
// 			target = Math.floor(target/10)*10;
//
// 			if(topLeft[0] !== Infinity){
// 				lastTarget = target;
// 			}else{
// 				target = lastTarget;
// 			}
//
// 			var my_video = document.getElementById('turning');
//
// 			var vidLength = 11;
//
// 			if(target < currentLocation){
// 				currentLocation -= 10;
// 				if(count < -3){
// 					lastDirection = direction;
// 					direction = "left"
// 					count = 0;
// 				}else{
// 					count--;
// 				}
// 			}else if(target > currentLocation){
// 				currentLocation += 10;
// 				if(count > 3){
// 					lastDirection = direction;
// 					direction = "right"
// 					count = 0;
// 				}else{
// 					count++;
// 				}
// 			}else if(target === currentLocation){
// 				direction = "none";
// 				lastDirection = direction;
// 			}
// 			// console.log(count);
//
// 			// if(my_video.currentTime === vidLength/2 || my_video.currentTime === vidLength){
// 			// 	my_video.pause()
// 			// }
//
//
// 			// if(direction === "none"){
// 			// 	my_video.pause();
// 			// 	console.log("paused");
// 			// }else if(lastDirection !== direction){
// 			// 	console.log("turn ", direction, lastDirection);
// 			// 	if((my_video.currentTime > vidLength/2 && direction === "right") || (my_video.currentTime < vidLength/2 && direction === "left")){
// 			// 		console.log("trying to turn wrong way");
// 			// 		return
// 			// 	}
// 			// 	my_video.currentTime = vidLength - my_video.currentTime;
// 			// 	my_video.play();
// 			// 	console.log("turn ", direction, "my_video ", my_video.currentTime);
// 			// }
//
// 			function getOffSet(rows, columns, width, height, frame){
// 				var imgWidth = width / columns;
// 				var imgHeight = height / rows;
// 				var x = imgWidth * (frame % columns);
// 				var y = imgHeight * Math.floor(frame / columns);
// 				return [x, y]
// 			}
//
//
// 			document.getElementById('movement').style.top = topLeft[1] + 'px';
// 			document.getElementById('movement').style.left = topLeft[0] + 'px';
//
// 			document.getElementById('movement').style.width = (bottomRight[0] - topLeft[0]) + 'px';
// 			document.getElementById('movement').style.height = (bottomRight[1] - topLeft[1]) + 'px';
//
//
// 			document.getElementById('sideToSide').style.top = 10 + 'px';
// 			document.getElementById('sideToSide').style.left = currentLocation + 10 + 'px';
//
// 			document.getElementById('sideToSide').style.width = 20 + 'px';
// 			document.getElementById('sideToSide').style.height = 30 + 'px';
//
// 			topLeft = [Infinity,Infinity];
// 			bottomRight = [0,0]
//
// 		}
// 		//
// 		// function playVideo(currentTime){
// 		// 	if(currentLocation === 300){
// 		// 		my_video.currentTime = vidLength - my_video.currentTime;
// 		//
// 		// 		console.log("currentLocation", currentLocation, "target", target/10, "lastTarget", lastTarget);
// 		// 	}
// 		// 	if(currentLocation === 400){
// 		// 		my_video.currentTime = vidLength - my_video.currentTime;
// 		// 		console.log("currentLocation", currentLocation, "target", target/10, "lastTarget", lastTarget);
// 		// 	}
// 		// }
//
// 		function area(topLeft, bottomRight){
// 			var x = bottomRight[0] - topLeft[0]
// 			var y = bottomRight[1] - topLeft[1]
// 			return x*y
// 		}
//
// 		/*
// 		 * The main rendering loop.
// 		 *
// 		 * @return void.
// 		 *
// 		 */
// 		function main() {
// 			try{
// 				render();
// 			} catch(e) {
// 				console.log(e);
// 				return;
// 			}
//
// 			if(rendering == true) {
// 				raf(main.bind(this));
// 			}
// 		}
//
// 		initialize();
// 	};
// })(MotionDetector);
