// import THREE.js library
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
// camera
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
// import .gltf file
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";

// Three.JS Scene
const scene = new THREE.Scene();
// new camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// track mouse pos
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// 3D obj global var
let object;

// camera
let controls;

// set obj to render
let objToRender = 'car';

// load .gltf
const loader = new GLTFLoader();

loader.load(
  `models/scene.gltf`,
  function (gltf) {
    // if file loaded, add to scene
    object = gltf.scene;
    scene.add(object);
  },
  function (xhr) {
    // while loading, log progress
    console.log((xhr.loaded / xhr.total * 100) + '% loaded');
  },
  function (error) {
    // if error, log error
    console.error(error);
  }
);

// instantiate new renderer and set size
const renderer = new THREE.WebGLRenderer({ alpha: true }); // alpha: true = transparent background
renderer.setSize(window.innerWidth, window.innerHeight);

// add renderer to DOM
document.getElementById("container3D").appendChild(renderer.domElement);

// set camera dist
camera.position.z = 25;

// add lighting
const topLight = new THREE.DirectionalLight(0xffffff, 1); // (color, intensity)
topLight.position.set(500, 500, 500) // top-left-ish
topLight.castShadow = true;
scene.add(topLight);

const ambientLight = new THREE.AmbientLight(0x333333, 5);
scene.add(ambientLight);

// camera control
controls = new OrbitControls(camera, renderer.domElement);


// render scene
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

// add listener to window to resize window and camera
window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

//Start the 3D rendering
animate();
