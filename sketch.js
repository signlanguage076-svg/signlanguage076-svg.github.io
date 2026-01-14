const URL = "https://teachablemachine.withgoogle.com/models/QG21aQqcP/";

let model, webcam, labelContainer, maxPredictions;

async function startCamera() {
  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

  const flip = false;
  webcam = new tmImage.Webcam(480, 640, flip);

  await webcam.setup({ facingMode: { exact: "environment" }});
  
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

let best = prediction[0];
for (let i = 1; i < prediction.length; i++) {
  if (prediction[i].probability > best.probability) {
    best = prediction[i];
  }
};

  if (best.probability >= 0.5) {
  labelContainer.innerText = best.className;
　} else {
    labelContainer.innerHTML = "";
 }
}

