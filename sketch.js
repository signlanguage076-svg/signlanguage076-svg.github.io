const URL = "https://teachablemachine.withgoogle.com/models/9lyEEnrtg/";

let model, webcam, labelContainer, maxPredictions, canvas;

    // ボタン取得
    const startButton = document.getElementById("start-button");
    const startUI = document.getElementById("start-ui");
    labelContainer = document.getElementById("label-container");

    startButton.addEventListener("click", async () => {
      // 最初のUIを非表示
      startUI.style.display = "none";
      labelContainer.style.display = "block";

      // カメラ起動開始
      await startCamera();
    });

    async function startCamera() {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      model = await tmImage.load(modelURL, metadataURL);
      maxPredictions = model.getTotalClasses();

      const flip = false;
      webcam = new tmImage.Webcam(480, 640, flip);
      await webcam.setup({ facingMode: "environment" }); // 外側カメラ
      await webcam.play();

      // p5.js canvas 作成
      canvas = document.createElement("canvas");
      canvas.width = window.innerWidth;
      canvas.height = window.innerWidth * 3 / 4;
      document.body.appendChild(canvas);

      window.requestAnimationFrame(loop);
    }

    async function loop() {
      webcam.update();

      // 左右反転を打ち消す
      const ctx = canvas.getContext("2d");
      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
      ctx.drawImage(webcam.canvas, 0, 0, canvas.width, canvas.height);
      ctx.restore();

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
      }

      if (best.probability >= 0.8 && best.className !== "none") {
        labelContainer.innerText = best.className;
      } else {
        labelContainer.innerText = "";
      }
    }

    window.addEventListener("resize", () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerWidth * 3 / 4;
      }
    });
