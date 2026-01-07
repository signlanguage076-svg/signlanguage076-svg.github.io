<div>Teachable Machine Image Model - p5.js and ml5.js</div>
<script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/p5.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/p5@latest/lib/addons/p5.dom.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/ml5@latest/dist/ml5.min.js"></script>
<script type="text/javascript">
  // Classifier Variable
  let classifier;
  // Model URL
  let imageModelURL = 'https://teachablemachine.withgoogle.com/models/9lyEEnrtg/';
  
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

  let button = createButton("カメラ起動");
  button.position(20, 20);
  button.mousePressed(startCamera);
  }

function startCamera() {
  video = createCapture({
    video: true,
    audio: false
  });

  video.size(640, 480);
  video.hide();

  classifyVideo();
}

function classifyVideo() {
  flippedVideo = ml5.flipImage(video);
  classifier.classify(flippedVideo, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }

  // 一番 confidence が高い手話を選ぶ
  let best = results.reduce((a, b) =>
    a.confidence > b.confidence ? a : b
  );

  if (best.confidence >= 0.8) {
    detectedLabel = best.label;
    detectedConfidence = best.confidence;
  } else {
    detectedLabel = "";
  }

  classifyVideo();
}
 
  function draw() {
  background(0);

  if (video) {
    image(flippedVideo, 0, 0, width, height);
  }

  if (detectedLabel !== "") {
    drawFloatingText(detectedLabel);
  }
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

function drawFloatingText(txt) {
  push();

  textAlign(CENTER, CENTER);
  textSize(width / 5);
  textStyle(BOLD);

  // 影
  fill(0, 160);
  text(txt, width / 2 + 6, height / 2 + 6);

  // 本体
  fill(255);
  text(txt, width / 2, height / 2);

  pop();
}
</script>
