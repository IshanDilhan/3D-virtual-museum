import './styles.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as lilGui from 'lil-gui';
import gsap from 'gsap';

// Canvas
const canvas = document.querySelector('canvas');

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  45, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near
  1000 // Far
);

// Initial position of the camera
camera.position.set(-0.45470001287689144, 3.782284782004724, -27.744818698957893);
camera.rotation.set(-3.1193153721818927, -0.017234674190410502, -3.1412086674054494);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(window.innerWidth, window.innerHeight);

// Orbit Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Key state tracking
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

// Event listeners for keydown and keyup
window.addEventListener('keydown', (event) => {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = true;
  }
});

window.addEventListener('keyup', (event) => {
  if (keys.hasOwnProperty(event.key)) {
    keys[event.key] = false;
  }
});

// gltf Loader
const gltfLoader = new GLTFLoader();
gltfLoader.load('/model/virrtual_museum/hintze_hall.glb', (gltf) => {
  console.log('Our model here!', gltf);
  const model = gltf.scene;
  scene.add(model);

  // GUI Configurator
  const gui = new lilGui.GUI();
  gui.add(model.position, 'x').min(-100).max(100).step(0.001).name('Model X Axis Position');
  gui.add(model.position, 'y').min(-100).max(100).step(0.001).name('Model Y Axis Position');
  gui.add(model.position, 'z').min(-100).max(100).step(0.001).name('Model Z Axis Position');
});

// Camera movement speed
const moveSpeed = 0.1;

const animate = () => {
  // Move camera based on key states
  if (keys.ArrowUp) {
    camera.position.x -= Math.sin(camera.rotation.y) * moveSpeed;
    camera.position.z -= Math.cos(camera.rotation.y) * moveSpeed;
  }
  if (keys.ArrowDown) {
    camera.position.x += Math.sin(camera.rotation.y) * moveSpeed;
    camera.position.z += Math.cos(camera.rotation.y) * moveSpeed;
  }
  if (keys.ArrowLeft) {
    camera.position.x -= Math.cos(camera.rotation.y) * moveSpeed;
    camera.position.z += Math.sin(camera.rotation.y) * moveSpeed;
  }
  if (keys.ArrowRight) {
    camera.position.x += Math.cos(camera.rotation.y) * moveSpeed;
    camera.position.z -= Math.sin(camera.rotation.y) * moveSpeed;
  }

  // Render the scene
  renderer.render(scene, camera);

  // Update controls (if needed)
  controls.update();
};

renderer.setAnimationLoop(animate);


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