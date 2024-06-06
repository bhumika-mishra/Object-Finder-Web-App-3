status = "";
input_id = "";
objects = [];

 function setup(){
    canvas = createCanvas(380,380);
    canvas.position(480,250);
    video = createCapture(VIDEO);
    video.size(300,290);
    video.hide();
}
function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    input_text =  document.getElementById("input_id").value; 
}
function modelLoaded(){
    console.log("Model Loaded!");
    status = true;
}
function draw(){
    image(video, 0, 0, 380, 380);
    if(status != ""){
        objectDetector.detect(video,gotResults);
        for(i = 0; i< objects.length ; i++){
         document.getElementById("status").innerHTML = "Status : Objects Detected";
         document.getElementById("object").innerHTML = "Number of objects detected are : "+ objects.length;
         console.log(objects.length);
    
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + "" + percent + "%",objects[i].x + 15, objects[i].y + 15);
         noFill();
         stroke("#FF0000");
         rect (objects[i].x, objects[i].y, objects[i].width, objects[i].height);
         if( objects[i].label == input_text){
            video.stop();
            objectDetector.detect(gotResults);
            document.getElementById("object").innerHTML = input_text + "Found";
            var sunth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance( input_text + "Found");
            synth.speak(utterThis);
         }
         else{
            document.getElementById("object").innerHTML = input_text + "Not found";
          }
        }
      }
    }
    function gotResults(error, results){
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
        objects = results;
        }
    }


