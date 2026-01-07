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
  let label = "読み込み中・・・";

  // Load the model first
  function preload() {
    classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  }

function setup() {
  createCanvas(windowWidth, windowHeight);

  video = createCapture({
    video: {
      facingMode: { exact: "environment" }
    },
    audio: false
  });
  video.size(640, 480);
  video.hide();
  classifyVideo();
}

function draw() {
  background(0);

  if (video) {
    image(flippedVideo, 0, 0, width, height);
  }

  // 「手話してない」時は表示しない
  if (label !== "none" && confidence > 0.7) {
    drawFloatingText(label);
  }
}

function classifyVideo() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  label = results[0].label; // ← 認識結果（あ / い / う / 何もしてない）
  classifyVideo();
}
</script>
