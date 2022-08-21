function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(300, 350);
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();
  synth = window.speechSynthesis;
  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function preload() {
//  classifier = ml5.imageClassifier('MobileNet', modelLoaded);
}

function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {

  console.log(results);
  if(results[0].confidence>0.50){
  document.getElementById('object').innerHTML = results[0].label;

  document.getElementById('accuracy').innerHTML = round(results[0].confidence*100,2);
  
  utterThis = new SpeechSynthesisUtterance(results[0].label);
  synth.speak(utterThis);
  }
}

function modelLoaded() {
  console.log('MobileNet is Initialized');
}