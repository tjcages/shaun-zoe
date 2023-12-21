import * as THREE from "three";

import { Colors } from "@/shared";

const _ = (person: string) => {
  // Create an empty container for the cloud
  const mesh = new THREE.Object3D();

  // render an image
  const textureLoader = new THREE.TextureLoader();
  const texture = textureLoader.load(`/ppl/${person}.png`);

  // Cube geometry and material
  const geom = new THREE.PlaneGeometry(200, 200);
  const mat = new THREE.MeshStandardMaterial({
    map: texture,
    transparent: true,
    side: THREE.DoubleSide,
    toneMapped: true,
  });
  
  mesh.castShadow = true;

  const m = new THREE.Mesh(geom, mat);
  mesh.add(m);

  return mesh;
};

export default _;
