var core = new MotionDetector.Core();

var my_video = document.getElementById('turning');
my_video.oncanplay = my_video.play();

function jumpToTime(time){
    my_video.currentTime = time;
}

document.getElementById("turning").addEventListener('click', function videoLinkClick(e){
    jumpToTime(5.2);

    return false;
},false)
