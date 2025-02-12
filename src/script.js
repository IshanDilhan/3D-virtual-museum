import "./styles.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { setupFloor1 } from "./floors/floor1.js";
import { setupFloor2 } from "./floors/floor2.js";
import { setupFloor3 } from "./floors/floor3.js";
import { setupFloor4 } from "./floors/floor4.js";

// Canvas
const canvas = document.querySelector("canvas");

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

// Set initial camera position and rotation
camera.position.set(-0.45470001287689144, 3.782284782004724, -27.744818698957893);
camera.rotation.set(-3.1193153721818927, -0.017234674190410502, -3.1412086674054494);

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

// GLTF Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load("/model/virrtual_museum/hintze_hall.glb", (gltf) => {
  console.log("Model loaded!", gltf);
  const model = gltf.scene;
  scene.add(model);
});

// Key state tracking
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
  Escape: false, // Add Escape key to track
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
const sensitivity = 0.002;
const smoothingFactor = 0.1;
let targetYaw = 0;
let targetPitch = 0;
let currentYaw = 0;
let currentPitch = 0;
let isMouseMovementEnabled = true; // Track whether mouse movement is enabled

window.addEventListener("mousemove", (event) => {
  if (!isMouseMovementEnabled) return; // Skip if mouse movement is disabled

  targetYaw -= event.movementX * sensitivity;
  targetPitch -= event.movementY * sensitivity;
  targetPitch = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, targetPitch));
  currentYaw = THREE.MathUtils.lerp(currentYaw, targetYaw, smoothingFactor);
  currentPitch = THREE.MathUtils.lerp(currentPitch, targetPitch, smoothingFactor);
  const quaternion = new THREE.Quaternion();
  quaternion.setFromEuler(new THREE.Euler(currentPitch, currentYaw, 0, "YXZ"));
  camera.quaternion.copy(quaternion);
});

// Toggle mouse movement on ESC key press
window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    isMouseMovementEnabled = !isMouseMovementEnabled; // Toggle mouse movement state
    console.log(`Mouse movement ${isMouseMovementEnabled ? "enabled" : "disabled"}`);
  }
});

// Movement speed
const moveSpeed = 0.1;

// Global state
let currentFloor = 1;

// Define camera positions for each floor
const floors = {
  1: { 
    cameraPosition: new THREE.Vector3(-0.45470001287689144, 3.782284782004724, -27.744818698957893),
    yPosition: 3.782284782004724 // y position for floor 1
  },
  2: { 
    cameraPosition: new THREE.Vector3(9.079666522864658, 10.012562291007207, 21.758199524172277),
    yPosition: 10.012562291007207 // y position for floor 2
  },
  3: { 
    cameraPosition: new THREE.Vector3(0.052213373216613325, 13.464484100702903, -13.617369699260676),
    yPosition:13.464484100702903  /* Add y position for floor 3 */
  },
  4: { 
    cameraPosition: new THREE.Vector3(-0.03795209431456846, 16.000396016700424, -26.285168181684615),
    yPosition: 16.000396016700424 /* Add y position for floor 4 */
  },
};

// Initialize floors
setupFloor1(scene, camera, () => (currentFloor = 2));
setupFloor2(scene, camera, () => (currentFloor = 3));
setupFloor3(scene, camera, () => (currentFloor = 4));
setupFloor4(scene, camera);

// Animation loop
const animate = () => {
  // Handle camera movement based on key states
  const direction = new THREE.Vector3();

  if (keys.ArrowUp) {
    direction.z -= 1; // Move forward
  }
  if (keys.ArrowDown) {
    direction.z += 1; // Move backward
  }
  if (keys.ArrowLeft) {
    direction.x -= 1; // Move left
  }
  if (keys.ArrowRight) {
    direction.x += 1; // Move right
  }

  // Normalize the direction vector to ensure consistent speed
  direction.normalize();

  // Move the camera in the direction it's facing
  camera.translateX(direction.x * moveSpeed);
  camera.translateZ(direction.z * moveSpeed);

  // Render the scene
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
  camera.position.y = floors[currentFloor].yPosition;
};

// Start the animation loop
animate();