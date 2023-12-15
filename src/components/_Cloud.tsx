import * as THREE from "three";

import { Colors } from "@/shared";

const _ = () => {
  // Create an empty container for the cloud
  const mesh = new THREE.Object3D();
  // Cube geometry and material
  const geom = new THREE.DodecahedronGeometry(20, 0);
  const mat = new THREE.MeshPhongMaterial({
    color: Colors.white,
  });

  const nBlocs = 3 + Math.floor(Math.random() * 3);

  for (let i = 0; i < nBlocs; i++) {
    //Clone mesh geometry
    const m = new THREE.Mesh(geom, mat);
    //Randomly position each cube
    m.position.x = i * 15;
    m.position.y = Math.random() * 10;
    m.position.z = Math.random() * 10;
    m.rotation.z = Math.random() * Math.PI * 2;
    m.rotation.y = Math.random() * Math.PI * 2;

    //Randomly scale the cubes
    const s = 0.1 + Math.random() * 0.9;
    m.scale.set(s, s, s);
    mesh.add(m);
  }

  return mesh;
};

export default _;
