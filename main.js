//https://teachablemachine.withgoogle.com/models/tXUfL21Lg/
Webcam.set({
    width:350,
    height:300,
    image_format : 'png',
    png_quality:90
});

camera = document.getElementById("camera");

Webcam.attach( '#camera' );


function takeSnapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });
}

console.log('ml5 version:', ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/tXUfL21Lg/model.json',modelLoaded);

function modelLoaded() {
    console.log('Model Loaded!');
}

function check()
  {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
  }

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    
    document.getElementById("result_object_name").innerHTML = results[0].label;

    gesture = results[0].label;
    
    toSpeak = "";
    
    if(gesture == "like")
    {
      toSpeak = "Isso parece legal!";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128077;;";
    }
    else if(gesture == "deslike")
    {
      toSpeak = "Não gostei disso!";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128078;";
    }
    else if(gesture == "soquinho")
    {
      toSpeak = "Bate aqui!";
      document.getElementById("result_object_gesture_icon").innerHTML = "&#128074;";
    }

    speak();
  }
}


function speak(){
    var synth = window.speechSynthesis;

    speak_data = toSpeak;

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    synth.speak(utterThis);

}