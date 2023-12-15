import * as THREE from "three";

import Tree from "./_Tree";
import Flower from "./_Flower";

const _ = () => {
  const mesh = new THREE.Object3D();

  // Number of Trees
  const nTrees = 300;

  // Space the consistenly
  var stepAngle = (Math.PI * 2) / nTrees;

  // Create the Trees

  for (let i = 0; i < nTrees; i++) {
    const t = Tree();

    console.log(t)

    //set rotation and position using trigonometry
    const a = stepAngle * i;
    // this is the distance between the center of the axis and the tree itself
    const h = 605;
    t.position.y = Math.sin(a) * h;
    t.position.x = Math.cos(a) * h;

    // rotate the tree according to its position
    t.rotation.z = a + (Math.PI / 2) * 3;

    // random depth for the tree on the z-axis
    t.position.z = 0 - Math.random() * 600;

    // random scale for each tree
    const s = 0.3 + Math.random() * 0.75;
    t.scale.set(s, s, s);

    mesh.add(t);
  }

  // Number of Trees
  const nFlowers = 350;

  stepAngle = (Math.PI * 2) / nFlowers;

  for (let i = 0; i < nFlowers; i++) {
    const f = Flower();
    const a = stepAngle * i;

    const h = 605;
    f.position.y = Math.sin(a) * h;
    f.position.x = Math.cos(a) * h;

    f.rotation.z = a + (Math.PI / 2) * 3;

    f.position.z = 0 - Math.random() * 600;

    const s = 0.1 + Math.random() * 0.3;
    f.scale.set(s, s, s);

    mesh.add(f);
  }

  return mesh;
};

export default _;
