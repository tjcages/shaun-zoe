import * as THREE from "three";

import { Colors } from "@/shared";

const _ = () => {
  const mesh = new THREE.Object3D();

  const matTreeLeaves = new THREE.MeshPhongMaterial({
    color: Colors.green,
  });

  const geonTreeBase = new THREE.BoxGeometry(10, 20, 10);
  const matTreeBase = new THREE.MeshBasicMaterial({ color: Colors.brown });
  const treeBase = new THREE.Mesh(geonTreeBase, matTreeBase);
  treeBase.castShadow = true;
  treeBase.receiveShadow = true;
  mesh.add(treeBase);

  const geomTreeLeaves1 = new THREE.CylinderGeometry(1, 12 * 3, 12 * 3, 4);
  const treeLeaves1 = new THREE.Mesh(geomTreeLeaves1, matTreeLeaves);
  treeLeaves1.castShadow = true;
  treeLeaves1.receiveShadow = true;
  treeLeaves1.position.y = 20;
  mesh.add(treeLeaves1);

  const geomTreeLeaves2 = new THREE.CylinderGeometry(1, 9 * 3, 9 * 3, 4);
  const treeLeaves2 = new THREE.Mesh(geomTreeLeaves2, matTreeLeaves);
  treeLeaves2.castShadow = true;
  treeLeaves2.position.y = 40;
  treeLeaves2.receiveShadow = true;
  mesh.add(treeLeaves2);

  const geomTreeLeaves3 = new THREE.CylinderGeometry(1, 6 * 3, 6 * 3, 4);
  const treeLeaves3 = new THREE.Mesh(geomTreeLeaves3, matTreeLeaves);
  treeLeaves3.castShadow = true;
  treeLeaves3.position.y = 55;
  treeLeaves3.receiveShadow = true;
  mesh.add(treeLeaves3);

  return mesh;
};

export default _;
