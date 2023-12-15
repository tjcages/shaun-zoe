import * as THREE from "three";

import Cloud from "./_Cloud";

const _ = () => {
  const mesh = new THREE.Object3D();

  // Number of cloud groups
  const nClouds = 25;

  // Space the consistenly
  const stepAngle = (Math.PI * 2) / nClouds;

  // Create the Clouds

  for (let i = 0; i < nClouds; i++) {
    const c = Cloud();

    //set rotation and position using trigonometry
    const a = stepAngle * i;
    // this is the distance between the center of the axis and the cloud itself
    const h = 900 + Math.random() * 300;
    c.position.y = Math.sin(a) * h;
    c.position.x = Math.cos(a) * h;

    // rotate the cloud according to its position
    c.rotation.z = a + Math.PI / 2;

    // random depth for the clouds on the z-axis
    c.position.z = -400 - Math.random() * 400;

    // random scale for each cloud
    const s = 1 + Math.random() * 3;
    c.scale.set(s, s, s);

    mesh.add(c);
  }

  return mesh;
};

export default _;
