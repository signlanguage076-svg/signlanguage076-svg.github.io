<script>
const URL = "https://teachablemachine.withgoogle.com/models/9lyEEnrtg/";

let model, webcam, labelContainer, maxPredictions;

async function startCamera() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);

  const camWidth  = window.innerWidth;
  const camHeight = window.innerHeight / 2;

  webcam = new tmImage.Webcam(camWidth, camHeight, true);
  await webcam.setup();     // SafariのUIで背面カメラ選択
  await webcam.play();

  document.getElementById("webcam-container").appendChild(webcam.canvas);
  window.requestAnimationFrame(loop);
  labelContainer = document.getElementById("label-container");
}

async function loop() {
  webcam.update();
  await predict();
  window.requestAnimationFrame(loop);
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);

  let best = prediction.reduce((a, b) =>
    a.probability > b.probability ? a : b
  );

  if (best.probability >= 0.8) {
    labelContainer.innerHTML = best.className;
  } else {
    labelContainer.innerHTML = "";
  }
}
</script>
