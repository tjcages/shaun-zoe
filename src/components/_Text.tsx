import * as THREE from "three";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

const _ = async (text: string) => {
  return new Promise((resolve, reject) => {
    const loader = new FontLoader();

    loader.load("/fonts/uav.json", function (font) {
      const geometry = new TextGeometry(text, {
        font: font,
        size: 40,
        height: 1,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 1,
        bevelSize: 2,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      const material = new THREE.MeshPhongMaterial({
        color: 0x000000,
        flatShading: true,
      });

      const mesh = new THREE.Mesh(geometry, material);

      resolve(mesh);
    });
  });
};

export default _;
