// ENERGY LEVEL
const slider = document.getElementById("energySlider");
const output = document.getElementById("energyOutput");
const colorBox = document.getElementById("colorBox");

slider.oninput = function() {
  let n = this.value;
  output.innerHTML = "Energy level: n = " + n;

  const colors = ["red", "orange", "yellow", "green", "blue"];
  colorBox.style.background = colors[n - 1];
};

// ORBITAL DRAWING
const canvas = document.getElementById("orbitalCanvas");
const ctx = canvas.getContext("2d");

function showOrbital(type) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (type === "s") {
    ctx.beginPath();
    ctx.arc(150, 150, 50, 0, 2 * Math.PI);
    ctx.stroke();
  }

  if (type === "p") {
    ctx.beginPath();
    ctx.arc(100, 150, 40, 0, 2 * Math.PI);
    ctx.arc(200, 150, 40, 0, 2 * Math.PI);
    ctx.stroke();
  }

  if (type === "d") {
    ctx.beginPath();
    ctx.arc(100, 100, 30, 0, 2 * Math.PI);
    ctx.arc(200, 100, 30, 0, 2 * Math.PI);
    ctx.arc(100, 200, 30, 0, 2 * Math.PI);
    ctx.arc(200, 200, 30, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

// QUIZ
function checkAnswer(answer) {
  const result = document.getElementById("quizResult");

  if (answer === "s") {
    result.innerHTML = "✅ Correct!";
  } else {
    result.innerHTML = "❌ Try again!";
  }
}