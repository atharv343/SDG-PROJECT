Webcam.set({
width: 349,
height:304,
image_format:'png',
png_quality:70
});

camera=document.getElementById("Camera");
Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML="<img id='captured_image' src='"+data_uri+"'>";

    });
}
console.log("ml5version",ml5.version);

classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/eVo5-LyJ7/model.json",model_loaded);
function model_loaded(){
    console.log("Model Is Loaded");
}

function Identify(){
    img=document.getElementById("captured_image");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
        console.log(error);
    }
    else {
        console.log(results);
        document.getElementById("object_name").innerHTML=results[0].label;
        document.getElementById("object_accuracy").innerHTML=(results[0].confidence*100).toFixed(1)+'%';
    }
}