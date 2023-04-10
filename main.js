song_h="";
song_p="";
score_right_wrist=0;
score_left_wrist=0;
right_wrist_x=0;
right_wrist_y=0;
left_wrist_x=0;
left_wrist_y=0;


function preload(){
    song_h=loadSound("music.mp3");
    song_p=loadSound("music2.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    posenet=ml5.poseNet(video,model_loaded);
    posenet.on('pose',got_poses);
}

function model_loaded(){
    console.log('posenet is intiated');
}

function got_poses(results){
    if(results.length > 0){
        console.log(results);

        score_right_wrist=results[0].pose.keypoints[10].score;
        score_left_wrist=results[0].pose.keypoints[9].score;

        right_wrist_x=results[0].pose.rightWrist.x;
        right_wrist_y=results[0].pose.rightWrist.y;

        left_wrist_x=results[0].pose.leftWrist.x;
        left_wrist_y=results[0].pose.leftWrist.y;
    }
}

function draw(){
    image(video,0,0,600,500);   
    fill("#ff0000");
    stroke("#ff0000");
    
    if(score_right_wrist > 0.2){
        circle(right_wrist_x,right_wrist_y,20);
        song_h.stop();
        song_p.play();
        document.getElementById("song_name").innerHTML="Peter Pan";
    }

    if(score_left_wrist > 0.2){
        circle(left_wrist_x,left_wrist_y,20);
        song_p.stop();
        song_h.play();
        document.getElementById("song_name").innerHTML="Harry Potter song";
    }
}