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
// ===== THREE.JS SETUP =====
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);
document.getElementById("viewer").appendChild(renderer.domElement);

camera.position.z = 4;

// LIGHT
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

let currentOrbital;

// ===== FUNCTION TO GENERATE ORBITAL SURFACE =====
function createOrbital(type) {
  const geometry = new THREE.SphereGeometry(1, 100, 100);

  const positions = geometry.attributes.position;
  const colors = [];

  for (let i = 0; i < positions.count; i++) {
    let x = positions.getX(i);
    let y = positions.getY(i);
    let z = positions.getZ(i);

    let r = Math.sqrt(x*x + y*y + z*z);
    let theta = Math.acos(z / r);      // polar
    let phi = Math.atan2(y, x);        // azimuth

    let value = 1;

    // === Angular parts (simplified spherical harmonics) ===
    if (type === "s") {
      value = 1;
    }

    if (type === "p") {
      value = Math.cos(theta); // p_z
    }

    if (type === "d") {
      value = Math.sin(theta) * Math.cos(phi) * Math.sin(phi); // d_xy-like
    }

    // Deform radius
    let scale = 1 + 1.5 * value;
    positions.setXYZ(i, x * scale, y * scale, z * scale);

    // Color (phase)
    if (value > 0) {
      colors.push(1, 0, 0); // red
    } else {
      colors.push(0, 0, 1); // blue
    }
  }

  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.8
  });

  return new THREE.Mesh(geometry, material);
}

// ===== SWITCH ORBITALS =====
function showOrbital(type) {
  if (currentOrbital) {
    scene.remove(currentOrbital);
  }

  currentOrbital = createOrbital(type);
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
