"use client";

import { useEffect } from "react";
import * as THREE from "three";

import Forest from "./_Forest";
import Sky from "./_Sky";
import Sun from "./_Sun";
import Land from "./_Land";
import AirPlane from "./_Airplane";
import Person from "./_Person";
import Text from "./_Text";

const _ = () => {
  var scene = null as THREE.Scene | null;
  var camera = null as THREE.PerspectiveCamera | null;
  var renderer = null as THREE.WebGLRenderer | null;
  var hemisphereLight = null as THREE.HemisphereLight | null;
  var shadowLight = null as THREE.DirectionalLight | null;
  var airplane = null as THREE.Object3D | null;
  var land = null as THREE.Object3D | null;
  var sky = null as THREE.Object3D | null;
  var sun = null as THREE.Object3D | null;
  var forest = null as THREE.Object3D | null;
  var leo = null as THREE.Object3D | null;
  var text = null as THREE.Group | null;

  const offSet = -600;

  function createScene() {
    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;

    // Create the scene.
    scene = new THREE.Scene();

    // Add FOV Fog effect to the scene. Same colour as the BG in the stylesheet.
    scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

    // Create the camera
    const aspectRatio = WIDTH / HEIGHT;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;
    camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    // Position the camera
    camera.position.x = 0;
    camera.position.y = 150;
    camera.position.z = 100;

    // Create the renderer
    const canvas = document.getElementById("world");
    if (!canvas) return;
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    // Define the size of the renderer - full screen
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(WIDTH, HEIGHT);

    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;

    renderer.setPixelRatio(window.devicePixelRatio);

    // Set the size of the renderer to fullscreen
    renderer.setSize(WIDTH, HEIGHT);
    // Enable shadow rendering
    renderer.shadowMap.enabled = true;

    // RESPONSIVE LISTENER
    window.addEventListener("resize", handleWindowResize, false);
  }

  function handleWindowResize() {
    if (!camera || !renderer) return;

    const HEIGHT = window.innerHeight;
    const WIDTH = window.innerWidth;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  }

  function createLights() {
    // Gradient coloured light - Sky, Ground, Intensity
    hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9);
    // Parallel rays
    shadowLight = new THREE.DirectionalLight(0xffffff, 0.9);

    shadowLight.position.set(0, 350, 350);
    shadowLight.castShadow = true;

    // Define the visible area of the projected shadow
    shadowLight.shadow.camera.left = -650;
    shadowLight.shadow.camera.right = 650;
    shadowLight.shadow.camera.top = 650;
    shadowLight.shadow.camera.bottom = -650;
    shadowLight.shadow.camera.near = 1;
    shadowLight.shadow.camera.far = 1000;

    // Shadow map size
    shadowLight.shadow.mapSize.width = 2048;
    shadowLight.shadow.mapSize.height = 2048;

    // Add the lights to the scene
    if (!scene || !hemisphereLight || !shadowLight) return;
    scene.add(hemisphereLight);
    scene.add(shadowLight);
  }

  function loop() {
    if (!airplane || !land || !sky || !forest) return;
    land.rotation.z += 0.00125;
    sky.rotation.z += 0.00075;
    forest.rotation.z += 0.00125;

    // rotate nyc around position (0, 0, 0)
    if (text) text.rotation.z += 0.00125;

    if (!renderer || !scene || !camera || !airplane) return;
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
  }

  function createSky() {
    sky = Sky();
    sky.position.y = offSet;

    if (!scene || !sky) return;
    scene.add(sky);
  }

  function createLand() {
    land = Land();
    land.position.y = offSet;

    if (!scene || !land) return;
    scene.add(land);
  }

  function createForest() {
    forest = Forest();
    forest.position.y = offSet;

    if (!scene || !forest) return;
    scene.add(forest);
  }

  function createSun() {
    sun = Sun();
    sun.scale.set(1, 1, 0.3);
    sun.position.set(0, -30, -850);

    if (!scene || !sun) return;
    scene.add(sun);
  }

  function createPlane() {
    airplane = AirPlane();
    airplane.scale.set(0.25, 0.25, 0.25);
    airplane.position.set(0, 110, -50);

    if (!scene || !airplane) return;
    scene.add(airplane);
  }

  function createLeo() {
    leo = Person("leo");
    leo.scale.set(1.5, 1.5, 1.5);
    leo.position.set(0, 110, -500);

    if (!scene || !leo) return;
    scene.add(leo);
  }

  async function createText() {
    text = new THREE.Group();

    const nyc = await Text("NYC");
    nyc.position.set(30, offSet/2, -400);
    nyc.rotation.z = Math.PI;

    text.add(nyc);

    const co = await Text("CO");
    co.position.set(-30, -offSet/2, -400);

    text.add(co);

    if (!scene || !text) return;
    scene.add(text);
  }

  useEffect(() => {
    createScene();
    createLights();
    createPlane();
    createSky();
    createSun();
    createLand();
    createForest();
    createLeo();
    createText();

    loop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      id="world"
      className="absolute top-0 left-0 w-full h-full overflow-hidden"
    />
  );
};

export default _;
