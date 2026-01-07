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
}

function draw() {
  background(255);
  // 映像をキャンバスに描画
  image(capture, 0, 0, 320, 240);
}
</script>
