const URL = "https://teachablemachine.withgoogle.com/models/9lyEEnrtg/"; 

let model;
let webcam;
let labelContainer;
let maxPredictions;

let canvas;

async function setup() {

  canvas = createCanvas(windowWidth, windowWidth * 3 / 4);
  canvas.parent(document.body);

  labelContainer = document.getElementById("label-container");


  const modelURL = URL + "model.json";
  const metadataURL = URL + "metadata.json";

  model = await tmImage.load(modelURL, metadataURL);
  maxPredictions = model.getTotalClasses();

 
  const flip = false;
  webcam = new tmImage.Webcam(480, 640, flip);

  await webcam.setup({
    facingMode: "environment"
  });

  await webcam.play();
}

function draw() {
  background(0);

  if (webcam) {
    webcam.update();

    push();
    translate(width, 0);
    scale(-1, 1);
    image(webcam.canvas, 0, 0, width, height);
    pop();

    predict();
  }
}

async function predict() {
  const prediction = await model.predict(webcam.canvas);

  
  let best = prediction[0];
  for (let i = 1; i < prediction.length; i++) {
    if (prediction[i].probability > best.probability) {
      best = prediction[i];
    }
  }

  if (best.probability >= 0.8 && best.className !== "none") {
    labelContainer.innerText = best.className;
  } else {
    labelContainer.innerText = "";
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth * 3 / 4);
}
