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

　 let capture;
 
  function setup() {
  createCanvas(windowWidth, windowHeight); // キャンバスを作成

  // カメラオプションを設定
  const constraints = {
    video: {
      facingMode: "environment"
    }
  };

  // createCaptureにオプションを渡す
  capture = createCapture(constraints);
  capture.size(640, 480);
  // capture要素はデフォルトでDOMに追加されるので、非表示にする
  capture.hide();
 
    flippedVideo = ml5.flipImage(video);
    // Start classifying
    classifyVideo();
  }
 
  function draw() {
    background(0);
    // Draw the video
    image(flippedVideo, 0, 0);
 
    // Draw the label
    fill(255);
    textSize(16);
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
    
    let best = results.reduce((a, b) => (a.confidence > b.confidence ? a : b));

  if (best.confidence >= 0.8) {
    detectedLabel = best.label;
    detectedConfidence = best.confidence;
  } else {
    detectedLabel = "";
  }
    // Classifiy again!
    classifyVideo();
  }

function drawTextBelowVideo(txt) {
  push();
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text(txt, width / 2, height - 50); // 画面下から50px上
  pop();
}

</script>
