import * as THREE from "three";

export function setupFloor1(scene, camera, onButtonClick) {
  // Button Geometry
  const buttonGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
  const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  buttonMesh.position.set(0.068872, 3.782285, 10.368757);
  scene.add(buttonMesh);

  // Text Sprite
  const loader = new THREE.TextureLoader();
  loader.load("https://dummyimage.com/256x64/000/fff&text=Click+to+Go+2nd+Floor", (texture) => {
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const textSprite = new THREE.Sprite(spriteMaterial);
    textSprite.scale.set(2, 0.5, 1);
    textSprite.position.set(0.068872, 4.5, 10.368757);
    scene.add(textSprite);
  });

  // Raycaster for button click
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  window.addEventListener("click", (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObject(buttonMesh);

    if (intersects.length > 0) {
      onButtonClick();
      camera.position.set(9.079666522864658, 10.012562291007207, 21.758199524172277);
      camera.rotation.set(2.5247125158552657, -1.012850564932815, 2.5999578718053975);
      console.log("Moved to 2nd Floor!");
    }
  });
}