import "./styles.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Canvas
const canvas = document.querySelector("canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near
  1000 // Far
);

// Set initial camera position and rotation
camera.position.set(
  -0.45470001287689144,
  3.782284782004724,
  -27.744818698957893
);
camera.rotation.set(
  -3.1193153721818927,
  -0.017234674190410502,
  -3.1412086674054494
);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// GLTF Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load("/model/virrtual_museum/hintze_hall.glb", (gltf) => {
  console.log("Model loaded!", gltf);
  const model = gltf.scene;
  scene.add(model);
});

window.addEventListener('mouseup', function () {
  console.log(camera.position)
  console.log(camera.rotation)
})

// Key state tracking
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

// Event listeners for keydown and keyup
window.addEventListener("keydown", (event) => {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  }
});

window.addEventListener("keyup", (event) => {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  }
});

// Mouse movement for camera rotation
const sensitivity = 0.002; // Adjust sensitivity for mouse movement
const smoothingFactor = 0.1; // Smoothing factor (0 to 1)
let targetYaw = +994; // Target horizontal rotation
let targetPitch = 0; // Target vertical rotation
let currentYaw = 0; // Current horizontal rotation
let currentPitch = 0; // Current vertical rotation

window.addEventListener("mousemove", (event) => {
  // Update target yaw and pitch based on mouse movement
  targetYaw -= event.movementX * sensitivity; // Horizontal rotation
  targetPitch -= event.movementY * sensitivity; // Vertical rotation

  // Lock vertical rotation to prevent flipping
  targetPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetPitch));

  // Smoothly interpolate between current and target rotations
  currentYaw = THREE.MathUtils.lerp(currentYaw, targetYaw, smoothingFactor);
  currentPitch = THREE.MathUtils.lerp(currentPitch, targetPitch, smoothingFactor);

  // Update camera rotation using quaternions
  const quaternion = new THREE.Quaternion();
  quaternion.setFromEuler(new THREE.Euler(currentPitch, currentYaw, 0, "YXZ"));
  camera.quaternion.copy(quaternion);
  //console.log(camera.quaternion)
});

// Movement speed
const moveSpeed = 0.1;

// Animation loop
const animate = () => {
  // Move camera based on key states
  if (keys.ArrowUp) {
    camera.translateZ(-moveSpeed); // Move forward
  }
  if (keys.ArrowDown) {
    camera.translateZ(moveSpeed); // Move backward
  }
  if (keys.ArrowLeft) {
    camera.translateX(-moveSpeed); // Move left
  }
  if (keys.ArrowRight) {
    camera.translateX(moveSpeed); // Move right
  }

  // Lock the Y-axis (height) to simulate walking
  camera.position.y = 3.782284782004724; // Fixed height (initial Y position)

  // Render the scene
  renderer.render(scene, camera);

  // Request the next frame
  requestAnimationFrame(animate);
};

// Start the animation loop
animate();

// Functions to move and rotate the camera
// function cameraMovement(x, y, z) {
//   gsap.to(camera.position, {
//     x,
//     y,
//     z,
//     duration: 3,
//   });
// }

// function cameraRotation(x, y, z) {
//   gsap.to(camera.rotation, {
//     x,
//     y,
//     z,
//     duration: 3,
//   });
// }
//   window.addEventListener('mouseup', function () {
//     switch (position) {
//       case 0:
//         cameraMovement(-6.0, 1.72, 1.34);
//         cameraRotation(-2.75, -1.24, -2.77);
//         position = 1;
//         break;

//       case 1:
//         cameraMovement(0.48, 2.09, -2.11);
//         cameraRotation(-3.12, 0.22, 3.13);
//         position = 2;
//         break;

//       case 2:
//         cameraMovement(-1.49, 1.7, 0.48);
//         cameraRotation(0.44, 1.43, -0.44);
//         position = 0;
//     }
//   });
