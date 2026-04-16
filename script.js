// ============================
// THREE.JS SETUP
// ============================
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  1,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(400, 400);

document.getElementById("viewer").appendChild(renderer.domElement);

camera.position.z = 4;

// ============================
// LIGHTING
// ============================
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(5, 5, 5);
scene.add(light);

const ambient = new THREE.AmbientLight(0x404040);
scene.add(ambient);

// ============================
// GLOBAL VARIABLE
// ============================
let currentOrbital = null;

// ============================
// ORBITAL GENERATOR
// ============================
function createOrbital(type) {

  const geometry = new THREE.SphereGeometry(1, 80, 80);
  const positions = geometry.attributes.position;

  const colors = new Float32Array(positions.count * 3);
  let c = 0;

  for (let i = 0; i < positions.count; i++) {

    let x = positions.getX(i);
    let y = positions.getY(i);
    let z = positions.getZ(i);

    let r = Math.sqrt(x * x + y * y + z * z);
    let theta = Math.acos(z / r);
    let phi = Math.atan2(y, x);

    let value = 1;

    // ============================
    // SIMPLE WAVEFUNCTION MODELS
    // ============================

    if (type === "s") {
      value = 1;
    }

    if (type === "p") {
      value = Math.cos(theta); // pz-like
    }

    if (type === "d") {
      value = Math.sin(theta) * Math.cos(phi) * Math.sin(phi); // dxy-like
    }

    // deform shape
    let scale = 1 + 1.2 * value;

    positions.setXYZ(i, x * scale, y * scale, z * scale);

    // ============================
    // COLOR (PHASE)
    // ============================
    if (value >= 0) {
      colors[c++] = 1;
      colors[c++] = 0;
      colors[c++] = 0;
    } else {
      colors[c++] = 0;
      colors[c++] = 0;
      colors[c++] = 1;
    }
  }

  // IMPORTANT FIX
  positions.needsUpdate = true;

  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3)
  );

  const material = new THREE.MeshStandardMaterial({
    vertexColors: true,
    side: THREE.DoubleSide
  });

  return new THREE.Mesh(geometry, material);
}

// ============================
// SWITCH ORBITALS
// ============================
function showOrbital(type) {

  if (currentOrbital) {
    scene.remove(currentOrbital);
  }

  currentOrbital = createOrbital(type);
  scene.add(currentOrbital);
}

// ============================
// ANIMATION LOOP
// ============================
function animate() {
  requestAnimationFrame(animate);

  if (currentOrbital) {
    currentOrbital.rotation.y += 0.01;
    currentOrbital.rotation.x += 0.005;
  }

  renderer.render(scene, camera);
}

animate();
