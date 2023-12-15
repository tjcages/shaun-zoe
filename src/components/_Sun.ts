import * as THREE from "three";

import { Colors } from "@/shared";

const _ = () => {
  const mesh = new THREE.Object3D();

  const sunGeom = new THREE.SphereGeometry(400, 20, 10);
  const sunMat = new THREE.MeshPhongMaterial({
    color: Colors.yellow,
  });
  const sun = new THREE.Mesh(sunGeom, sunMat);
  //sun.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI/2));
  sun.castShadow = false;
  sun.receiveShadow = false;
  mesh.add(sun);

  return mesh;
};

export default _;