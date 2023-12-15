import * as THREE from "three";

import { Colors } from "@/shared";

const _ = () => {
  const geom = new THREE.CylinderGeometry(600, 600, 800, 40, 10);
  geom.rotateX(-Math.PI / 2);
  geom.translate(0, 0, -400);
  //create a material
  const mat = new THREE.MeshPhongMaterial({
    color: Colors.lightgreen,
  });

  //create a mesh of the object
  const mesh = new THREE.Mesh(geom, mat);
  //receive shadows
  mesh.receiveShadow = true;

  return mesh;
};

export default _;
