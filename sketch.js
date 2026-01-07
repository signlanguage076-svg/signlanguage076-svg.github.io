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

let detectedConfidence = 0;

  function setup() {
    createCanvas(windowWidth, windowHeight);// キャンバスを作成
    
   let button = createButton("カメラ起動");
  button.position(20, 20);
  button.mousePressed(startCamera);
}

//カメラ起動

function startCamera() {
  video = createCapture({
    video: true,
    audio: false
  });

  video.size(640, 480);
  video.hide();

  classifyVideo();
}

// 分類開始

function classifyVideo() {
  classifier.classify(video, gotResult);
}

// 結果処理（confidence >= 0.8 のものを選択）

function gotResult(error, results) {
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

  classifyVideo();
}

//描画

  function draw() {
  background(0);

  if (video) {
    image(video, 0, 0, width, height);
  }

  if (detectedLabel !== "") {
    drawTextBelowVideo(detectedLabel);
  }
}

// 映像の下に文字を表示

function drawTextBelowVideo(txt) {
  push();
  textAlign(CENTER, CENTER);
  textSize(50);
  fill(255);
  text(txt, width / 2, height - 50); // 画面下から50px上
  pop();
}

</script>
