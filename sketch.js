 let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/e0jBaUmIP/';
  
  // Video
  let video;
  let flippedVideo;
  // To store the classification
  let label = "";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

  function setup() {
    createCanvas(windowWidth, windowHeight);
    // Create the video
    video = createCapture(VIDEO);
    video.size(windowWidth, windowHeight);
    video.hide();
    
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
      switchBtn = createButton('Switch');
    switchBtn.position(width-250,10);
    switchBtn.size(250,60);
    switchBtn.mouseReleased(switchCam)
  }

  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);

    // Draw the label
    fill(255);
    textSize(100);
    textAlign(CENTER);
    text(label, width / 2, height - 4);
  }

  // Get a prediction for the current video frame
  function classifyVideo() {
    flippedVideo = ml5.flipImage(video)
    classifier.classify(flippedVideo, gotResult);
    flippedVideo.remove();

  }

  // When we get a result
  function gotResult(error, results) {
    // If there is an error
    if (error) {
      console.error(error);
      return;
    }
    // The results are in an array ordered by confidence.
    // console.log(results[0]);
    label = results[0].label;
    // Classifiy again!
    classifyVideo();
  }

function switchCam(){
  if(switcher == 0){
    switcher = 1;
    camera.remove();
    camera = createCapture(rearSetting);
    camera.hide();
  }else if(switcher == 1){
    switcher = 0;
    camera.remove();
    camera = createCapture(frontSetting);
    camera.hide();
  }
}