/**
 *
 * @project        Motion Detection in JS
 * @file           ImageCompare.js
 * @description    Core functionality.
 * @author         Benjamin Horn
 * @package        MotionDetector
 * @version        -
 *
 */

;(function(App) {

	"use strict";

	/*
	 * The core motion detector. Does all the work.
	 *
	 * @return <Object> The initalized object.
	 *
	 */
	App.Core = function() {

		var rendering = false;

		var width = 64;
		var height = 48;

		var webCam = null;
		var imageCompare = null;

		var currentImage = null;
		var oldImage = null;

		var topLeft = [Infinity,Infinity];
		var bottomRight = [0,0];

		var MIDDLE = 300;

		var currentLocation = MIDDLE;
		var lastTarget = MIDDLE;
		var direction = "none";
		var lastDirection = "none";

		var raf = (function(){
			return  window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
			function( callback ){
				window.setTimeout(callback, 1000/60);
			};
		})();

		/*
		 * Initializes the object.
		 *
		 * @return void.
		 *
		 */
		function initialize() {
			imageCompare = new App.ImageCompare();
			webCam = new App.WebCamCapture(document.getElementById('webCamWindow'));

			rendering = true;

			main();
		}

		/*
		 * Compares to images and updates the position
		 * of the motion div.
		 *
		 * @return void.
		 *
		 */
		function render() {
			oldImage = currentImage;
			currentImage = webCam.captureImage(false);

			if(!oldImage || !currentImage) {
				return;
			}

			var vals = imageCompare.compare(currentImage, oldImage, width, height);

			topLeft[0] = vals.topLeft[0] * 10;
			topLeft[1] = vals.topLeft[1] * 10;

			bottomRight[0] = vals.bottomRight[0] * 10;
			bottomRight[1] = vals.bottomRight[1] * 10;

			var target = (topLeft[0] + bottomRight[0])/2;
			var target = 600 - target;

			// if(topLeft[0] === Infinity){
			// 	target = MIDDLE;
			// }
			currentLocation = Math.floor(currentLocation/10)*10;
			lastTarget = Math.floor(lastTarget/10)*10;
			target = Math.floor(target/10)*10;

			if(topLeft[0] !== Infinity){
				lastTarget = target;
			}else{
				target = lastTarget;
			}

			var my_video = document.getElementById('turning');

			var vidLength = 11;
			lastDirection = direction;

			if(target < currentLocation){
				currentLocation -= 10;
				direction = "left"
			}else if(target > currentLocation){
				currentLocation += 10;
				direction = "right"
			}else if(target === currentLocation){
				direction = "none";
			}

			if(lastDirection !== direction){
				my_video.currentTime = vidLength - my_video.currentTime;
				my_video.play();
				console.log("turn");
			}

			if(direction === "none"){
				my_video.pause();
				console.log("paused");
			}




			// if(currentLocation === 300){
			// 	my_video.currentTime = vidLength - my_video.currentTime;
			//
			// 	console.log("currentLocation", currentLocation, "target", target/10, "lastTarget", lastTarget);
			// }
			// if(currentLocation === 400){
			// 	my_video.currentTime = vidLength - my_video.currentTime;
			// 	console.log("currentLocation", currentLocation, "target", target/10, "lastTarget", lastTarget);
			// }



			document.getElementById('movement').style.top = 10 + 'px';
			document.getElementById('movement').style.left = currentLocation + 10 + 'px';

			document.getElementById('movement').style.width = 20 + 'px';
			document.getElementById('movement').style.height = 30 + 'px';

			topLeft = [Infinity,Infinity];
			bottomRight = [0,0]

		}
		//
		// function playVideo(currentTime){
		// 	if(currentLocation === 300){
		// 		my_video.currentTime = vidLength - my_video.currentTime;
		//
		// 		console.log("currentLocation", currentLocation, "target", target/10, "lastTarget", lastTarget);
		// 	}
		// 	if(currentLocation === 400){
		// 		my_video.currentTime = vidLength - my_video.currentTime;
		// 		console.log("currentLocation", currentLocation, "target", target/10, "lastTarget", lastTarget);
		// 	}
		// }

		/*
		 * The main rendering loop.
		 *
		 * @return void.
		 *
		 */
		function main() {
			try{
				render();
			} catch(e) {
				console.log(e);
				return;
			}

			if(rendering == true) {
				raf(main.bind(this));
			}
		}

		initialize();
	};
})(MotionDetector);
