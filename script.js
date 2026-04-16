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
// ===== THREE.JS SETUP =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(400, 400);
document.getElementById("viewer").appendChild(renderer.domElement);

camera.position.z = 5;

let currentOrbital;

// LIGHT
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

// ===== ORBITAL FUNCTION =====
function showOrbital(type) {

  if (currentOrbital) {
    scene.remove(currentOrbital);
  }

  let material = new THREE.MeshStandardMaterial({
    color: 0x0077ff,
    transparent: true,
    opacity: 0.7
  });

  if (type === "s") {
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    currentOrbital = new THREE.Mesh(geometry, material);
  }

  if (type === "p") {
    const group = new THREE.Group();

    const geometry = new THREE.SphereGeometry(0.7, 32, 32);

    const lobe1 = new THREE.Mesh(geometry, material);
    lobe1.position.x = -1;

    const lobe2 = new THREE.Mesh(geometry, material);
    lobe2.position.x = 1;

    group.add(lobe1);
    group.add(lobe2);

    currentOrbital = group;
  }

  if (type === "d") {
    const group = new THREE.Group();

    const geometry = new THREE.SphereGeometry(0.5, 32, 32);

    const positions = [
      [1, 1], [-1, 1], [1, -1], [-1, -1]
    ];

    positions.forEach(pos => {
      const lobe = new THREE.Mesh(geometry, material);
      lobe.position.set(pos[0], pos[1], 0);
      group.add(lobe);
    });

    currentOrbital = group;
  }

  scene.add(currentOrbital);
}

// ===== ANIMATION =====
function animate() {
  requestAnimationFrame(animate);

  if (currentOrbital) {
    currentOrbital.rotation.y += 0.01;
    currentOrbital.rotation.x += 0.005;
  }

  renderer.render(scene, camera);
}

animate();

// QUIZ
function checkAnswer(answer) {
  const result = document.getElementById("quizResult");

  if (answer === "s") {
    result.innerHTML = "✅ Correct!";
  } else {
    result.innerHTML = "❌ Try again!";
  }
}
