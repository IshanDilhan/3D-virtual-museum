import * as THREE from "three";

export function setupFloor2(scene, camera, onButtonClick) {
  // Button Geometry
  const buttonGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
  const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  buttonMesh.position.set(9.184899788970773, 10.107772064030083, -13.890553800298669);
  scene.add(buttonMesh);

  // Text Sprite
  const loader = new THREE.TextureLoader();
  loader.load("https://dummyimage.com/256x64/000/fff&text=Click+to+Go+Viewpoint", (texture) => {
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const textSprite = new THREE.Sprite(spriteMaterial);
    textSprite.scale.set(2, 0.5, 1);
    textSprite.position.set(9.184899788970773, 10.807772064030083, -13.890553800298669);
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
      camera.position.set(0.052213373216613325, 13.464484100702903, -13.617369699260676);
      camera.rotation.set(-2.8366870320621915, 0.4778555138641451, 2.997858788877939);
      console.log("Moved to Viewpoint!");
    }
  });
}