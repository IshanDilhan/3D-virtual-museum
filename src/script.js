import "./styles.css";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

// Canvas
const canvas = document.querySelector("canvas");
let floor = 1;
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
// Button Geometry at (0.068872, 3.782285, 10.368757)
// Button Geometry (Round Shape)
const buttonGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
buttonMesh.position.set(0.068872, 3.782285, 10.368757);
scene.add(buttonMesh);

// Text Sprite (Label "Click to Go 2nd Floor")
const loader = new THREE.TextureLoader();
loader.load("https://dummyimage.com/256x64/000/fff&text=Click+to+Go+2nd+Floor", (texture) => {
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const textSprite = new THREE.Sprite(spriteMaterial);
  textSprite.scale.set(2, 0.5, 1);
  textSprite.position.set(0.068872, 4.5, 10.368757);
  scene.add(textSprite);
});

function moveToSecondFloor() {
  floor = 2;
  // Target position
  const targetPosition = new THREE.Vector3(9.079666522864658, 10.012562291007207, 21.758199524172277);
  camera.position.copy(targetPosition);

  // Target rotation (using Euler angles)
  const targetRotation = new THREE.Euler(2.5247125158552657, -1.012850564932815, 2.5999578718053975, "YXZ");
  camera.rotation.copy(targetRotation);

  console.log("Moved to 2nd Floor!");
}
const buttonGeometry1 = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
const buttonMaterial1 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const buttonMesh1 = new THREE.Mesh(buttonGeometry1, buttonMaterial1);
buttonMesh1.position.set(9.184899788970773, 10.107772064030083, -13.890553800298669);
scene.add(buttonMesh1);





//move 3rd floor
// Text Sprite (Label "Click to Go 2nd Floor")
const loader1 = new THREE.TextureLoader();
loader1.load("https://dummyimage.com/256x64/000/fff&text=Click+to+Go+2nd+Floor", (texture) => {
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const textSprite = new THREE.Sprite(spriteMaterial);
  textSprite.scale.set(2, 0.5, 1);
  textSprite.position.set(0.068872, 4.5, 10.368757);
  scene.add(textSprite);
});
function moveToviewpointFloor() {
  floor = 3;
  // Target position

  const targetPosition = new THREE.Vector4(0.052213373216613325, 13.464484100702903, -13.617369699260676);
  camera.position.copy(targetPosition);

  // Target rotation (using Euler angles)
  const targetRotation = new THREE.Euler(-2.8366870320621915, 0.4778555138641451, 2.997858788877939, "YXZ");
  camera.rotation.copy(targetRotation);

  console.log("Moved to view point!");
}

// third flow
const buttonGeometry2 = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
const buttonMaterial2 = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const buttonMesh2= new THREE.Mesh(buttonGeometry2, buttonMaterial2);
buttonMesh2.position.set(-0.28360587091931094,13.438389428841957,-17.313759336656872);
scene.add(buttonMesh2);

// Text Sprite (Label "Click to Go 2nd Floor")
const loader2 = new THREE.TextureLoader();
loader2.load("https://dummyimage.com/256x64/000/fff&text=Click+to+Go+2nd+Floor", (texture) => {
  const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
  const textSprite = new THREE.Sprite(spriteMaterial);
  textSprite.scale.set(2, 0.5, 1);
  textSprite.position.set(0.068872, 4.5, 10.368757);
  scene.add(textSprite);
});

function moveTothirdFloor() {
  floor= 4;
  // Target position

  const targetPosition = new THREE.Vector4(-0.03795209431456846, 16.000396016700424, -26.285168181684615);
  camera.position.copy(targetPosition);

  // Target rotation (using Euler angles)
  const targetRotation = new THREE.Euler(-0.015464507010603154, 3.0646243991836895, 0, "YXZ");
  camera.rotation.copy(targetRotation);

  console.log("Moved to 3rd floor!");
}
// Raycaster for detecting clicks
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

window.addEventListener("click", (event) => {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  const intersects = raycaster.intersectObject(buttonMesh);
  const intersects1 = raycaster.intersectObject(buttonMesh1);
  const intersects2 = raycaster.intersectObject(buttonMesh2);

  if (intersects.length > 0) {
    moveToSecondFloor();
  }else if(intersects1.length > 0){
    moveToviewpointFloor()
  }else if(intersects2.length > 0){
    moveTothirdFloor()
  }
});
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
//console.log(flow)
  // Lock the Y-axis (height) to simulate walking
  if (floor === 1) {
    camera.position.y = 3.782284782004724; // Ground floor
  } else if(floor === 2) {
    camera.position.y = 10.012562291007207; // Second floor
  } else if(floor === 3){
    camera.position.y = 13.464484100702903;
  } else if(floor === 4){
    camera.position.y = 16.000396016700424
  }
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
