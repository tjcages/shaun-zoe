import * as THREE from "three";

import { Colors } from "@/shared";

const _ = () => {
  var mousePos = { x: 0, y: 0 };

  const mesh = new THREE.Object3D();

  // Create the cabin
  const geomCockpit = new THREE.BoxGeometry(80, 50, 50, 1, 1, 1);
  const matCockpit = new THREE.MeshPhongMaterial({
    color: Colors.red,
  });
  const cockpit = new THREE.Mesh(geomCockpit, matCockpit);
  cockpit.castShadow = true;
  cockpit.receiveShadow = true;
  mesh.add(cockpit);

  // Create the engine
  const geomEngine = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
  const matEngine = new THREE.MeshPhongMaterial({
    color: Colors.white,
  });
  const engine = new THREE.Mesh(geomEngine, matEngine);
  engine.position.x = 40;
  engine.castShadow = true;
  engine.receiveShadow = true;
  mesh.add(engine);

  // Create the tail
  const geomTailPlane = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
  const matTailPlane = new THREE.MeshPhongMaterial({
    color: Colors.red,
  });
  const tailPlane = new THREE.Mesh(geomTailPlane, matTailPlane);
  tailPlane.position.set(-35, 25, 0);
  tailPlane.castShadow = true;
  tailPlane.receiveShadow = true;
  mesh.add(tailPlane);

  // Create the wing
  const geomSideWing = new THREE.BoxGeometry(40, 4, 150, 1, 1, 1);
  const matSideWing = new THREE.MeshPhongMaterial({
    color: Colors.red,
  });

  const sideWingTop = new THREE.Mesh(geomSideWing, matSideWing);
  const sideWingBottom = new THREE.Mesh(geomSideWing, matSideWing);
  sideWingTop.castShadow = true;
  sideWingTop.receiveShadow = true;
  sideWingBottom.castShadow = true;
  sideWingBottom.receiveShadow = true;

  sideWingTop.position.set(20, 12, 0);
  sideWingBottom.position.set(20, -3, 0);
  mesh.add(sideWingTop);
  mesh.add(sideWingBottom);

  const geomWindshield = new THREE.BoxGeometry(3, 15, 20, 1, 1, 1);
  const matWindshield = new THREE.MeshPhongMaterial({
    color: Colors.white,
    transparent: true,
    opacity: 0.3,
  });
  const windshield = new THREE.Mesh(geomWindshield, matWindshield);
  windshield.position.set(5, 27, 0);

  windshield.castShadow = true;
  windshield.receiveShadow = true;

  mesh.add(windshield);

  const geomPropeller = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
  const matPropeller = new THREE.MeshPhongMaterial({
    color: Colors.brown,
  });
  const propeller = new THREE.Mesh(geomPropeller, matPropeller);
  propeller.castShadow = true;
  propeller.receiveShadow = true;

  const geomBlade1 = new THREE.BoxGeometry(1, 100, 10, 1, 1, 1);
  const geomBlade2 = new THREE.BoxGeometry(1, 10, 100, 1, 1, 1);
  const matBlade = new THREE.MeshPhongMaterial({
    color: Colors.brownDark,
  });

  const blade1 = new THREE.Mesh(geomBlade1, matBlade);
  blade1.position.set(8, 0, 0);
  blade1.castShadow = true;
  blade1.receiveShadow = true;

  const blade2 = new THREE.Mesh(geomBlade2, matBlade);
  blade2.position.set(8, 0, 0);
  blade2.castShadow = true;
  blade2.receiveShadow = true;
  propeller.add(blade1, blade2);
  propeller.position.set(50, 0, 0);
  mesh.add(propeller);

  const wheelProtecGeom = new THREE.BoxGeometry(30, 15, 10, 1, 1, 1);
  const wheelProtecMat = new THREE.MeshPhongMaterial({
    color: Colors.white,
  });
  const wheelProtecR = new THREE.Mesh(wheelProtecGeom, wheelProtecMat);
  wheelProtecR.position.set(25, -20, 25);
  mesh.add(wheelProtecR);

  const wheelTireGeom = new THREE.BoxGeometry(24, 24, 4);
  const wheelTireMat = new THREE.MeshPhongMaterial({
    color: Colors.brownDark,
  });
  const wheelTireR = new THREE.Mesh(wheelTireGeom, wheelTireMat);
  wheelTireR.position.set(25, -28, 25);

  const wheelAxisGeom = new THREE.BoxGeometry(10, 10, 6);
  const wheelAxisMat = new THREE.MeshPhongMaterial({
    color: Colors.brown,
  });
  const wheelAxis = new THREE.Mesh(wheelAxisGeom, wheelAxisMat);
  wheelTireR.add(wheelAxis);

  mesh.add(wheelTireR);

  const wheelProtecL = wheelProtecR.clone();
  wheelProtecL.position.z = -wheelProtecR.position.z;
  mesh.add(wheelProtecL);

  const wheelTireL = wheelTireR.clone();
  wheelTireL.position.z = -wheelTireR.position.z;
  mesh.add(wheelTireL);

  const wheelTireB = wheelTireR.clone();
  wheelTireB.scale.set(0.5, 0.5, 0.5);
  wheelTireB.position.set(-35, -5, 0);
  mesh.add(wheelTireB);

  const suspensionGeom = new THREE.BoxGeometry(4, 20, 4);
  // suspensionGeom.applyMatrix(new THREE.Matrix4().makeTranslation(0, 10, 0));
  const suspensionMat = new THREE.MeshPhongMaterial({
    color: Colors.red,
  });
  const suspension = new THREE.Mesh(suspensionGeom, suspensionMat);
  suspension.position.set(-35, -5, 0);
  suspension.rotation.z = -0.3;
  mesh.add(suspension);

  function handleMouseMove(event: { clientX: number; clientY: number; }) {
    const tx = -1 + (event.clientX / window.innerWidth) * 2;
    const ty = 1 - (event.clientY / window.innerHeight) * 2;
    mousePos = { x: tx, y: ty };
  }

  function normalize(v: number, vmin: number, vmax: number, tmin: number, tmax: number) {
    const nv = Math.max(Math.min(v, vmax), vmin);
    const dv = vmax - vmin;
    const pc = (nv - vmin) / dv;
    const dt = tmax - tmin;
    const tv = tmin + pc * dt;
    return tv;
  }

  function updatePlane() {
    const targetY = normalize(mousePos.y, -0.75, 0.75, 50, 190);
    const targetX = normalize(mousePos.x, -0.75, 0.75, -100, -20);

    // Move the plane at each frame by adding a fraction of the remaining distance
    mesh.position.y += (targetY - mesh.position.y) * 0.1;

    mesh.position.x += (targetX - mesh.position.x) * 0.1;

    // Rotate the plane proportionally to the remaining distance
    mesh.rotation.z = (targetY - mesh.position.y) * 0.0128;
    mesh.rotation.x = (mesh.position.y - targetY) * 0.0064;
    mesh.rotation.y = (mesh.position.x - targetX) * 0.0064;

    propeller.rotation.x += 0.3;
  }

  const loop = () => {
    updatePlane();

    requestAnimationFrame(loop);
  };

  document.addEventListener("mousemove", handleMouseMove, false);

  loop();

  return mesh;
};

export default _;
