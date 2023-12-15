import * as THREE from "three";

import { Colors } from "@/shared";

const petalColors = [Colors.red, Colors.yellow, Colors.blue];

const _ = () => {
  var petalCore = null;

  const mesh = new THREE.Object3D();

  const geomStem = new THREE.BoxGeometry(5, 50, 5, 1, 1, 1);
  const matStem = new THREE.MeshPhongMaterial({
    color: Colors.green,
  });
  const stem = new THREE.Mesh(geomStem, matStem);
  stem.castShadow = false;
  stem.receiveShadow = true;
  mesh.add(stem);

  const geomPetalCore = new THREE.BoxGeometry(10, 10, 10, 1, 1, 1);
  const matPetalCore = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
  });
  petalCore = new THREE.Mesh(geomPetalCore, matPetalCore);
  petalCore.castShadow = false;
  petalCore.receiveShadow = true;

  const petalColor = petalColors[Math.floor(Math.random() * 3)];

  const geomPetal = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
  const matPetal = new THREE.MeshBasicMaterial({ color: petalColor });
  geomPetal.translate(12.5, 0, 3);

  const petals = [];
  for (let i = 0; i < 4; i++) {
    petals[i] = new THREE.Mesh(geomPetal, matPetal);
    petals[i].rotation.z = (i * Math.PI) / 2;
    petals[i].castShadow = true;
    petals[i].receiveShadow = true;
  }

  petalCore.add(petals[0], petals[1], petals[2], petals[3]);
  petalCore.position.y = 25;
  petalCore.position.z = 3;
  mesh.add(petalCore);

  return mesh;
};

export default _;
