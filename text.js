let model, webcam, label = "";

async function setup() {
  createCanvas(390, 600); // iPhoneサイズ意識
  const modelURL = "https://teachablemachine.withgoogle.com/models/9lyEEnrtg/";
  const metadataURL = "https://teachablemachine.withgoogle.com/models/9lyEEnrtg/";

  model = await tmImage.load(modelURL, metadataURL);

  webcam = new tmImage.Webcam(390, 600, true);
  await webcam.setup();
  await webcam.play();
}

async function draw() {
  background(0);
  webcam.update();
  image(webcam.canvas, 0, 0);

  const predictions = await model.predict(webcam.canvas);
  label = predictions[0].className;

  fill(255);
  textSize(32);
  text(label, 20, height - 40);
}
    // Classifiy again!
    classifyVideo();
 }
</script>
