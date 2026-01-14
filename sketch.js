<script>
  
const URL = "https://teachablemachine.withgoogle.com/models/9lyEEnrtg/”;

let model, webcam, labelContainer, maxPredictions;

async function startCamera() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = true;

  webcam = new tmImage.Webcam(640, 480, flip);

  await webcam.setup({
  facingMode: { exact: "environment" }
});
  await webcam.play();
  window.requestAnimationFrame(loop);

  document.getElementById("webcam-container").appendChild(webcam.canvas);
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
