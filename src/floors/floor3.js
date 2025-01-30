import * as THREE from "three";

export function setupFloor3(scene, camera, onButtonClick) {
  // Button Geometry
  const buttonGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.1, 32);
  const buttonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
  const buttonMesh = new THREE.Mesh(buttonGeometry, buttonMaterial);
  buttonMesh.position.set(-0.28360587091931094, 13.438389428841957, -17.313759336656872);
  scene.add(buttonMesh);

  // Text Sprite
  const loader = new THREE.TextureLoader();
  loader.load("https://dummyimage.com/256x64/000/fff&text=Click+to+Go+3rd+Floor", (texture) => {
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
    const textSprite = new THREE.Sprite(spriteMaterial);
    textSprite.scale.set(2, 0.5, 1);
    textSprite.position.set(-0.28360587091931094, 14.138389428841957, -17.313759336656872);
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
      camera.position.set(-0.03795209431456846, 16.000396016700424, -26.285168181684615);
      camera.rotation.set(-0.015464507010603154, 3.0646243991836895, 0);
      console.log("Moved to 3rd Floor!");
    }
  });
}