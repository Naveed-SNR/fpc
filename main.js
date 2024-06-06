import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { Player } from './player';

// Renderer Setup
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x80a0e0);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// For obstacles
const objects = [];

// Camera Setup
const orbitCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
orbitCamera.position.set(-14.42, 8.3, -11);

// Orbit Controls
const controls = new OrbitControls(orbitCamera, renderer.domElement);
controls.target.set(11, 0, 11);
controls.update();

// Scene Setup
const scene = new THREE.Scene();

// Player
const player = new Player(scene);


// Light Setup
function setupLights() {
    const sun = new THREE.DirectionalLight();
    sun.position.set(30, 11, 50);
    sun.castShadow = true;
    sun.shadow.camera.left = -100;
    sun.shadow.camera.right = 100;
    sun.shadow.camera.bottom = -100;
    sun.shadow.camera.top = 100;
    sun.shadow.camera.near = 0.1;
    sun.shadow.camera.far = 100;
    scene.add(sun);
    const shadowHelper = new THREE.CameraHelper(sun.shadow.camera);
    // scene.add(shadowHelper);

    const ambient = new THREE.AmbientLight();
    ambient.intensity = 0.01;
    scene.add(ambient);
}

// Model Loader
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('/examples/jsm/libs/draco/');
loader.setDRACOLoader(dracoLoader);

loader.load('models/college.glb', function (gltf) {
    gltf.scene.traverse(function (node) {
        if (node.isMesh) {
            node.castShadow = true;
        }
    });
    scene.add(gltf.scene);
    objects.push(gltf.scene);
    // player.boundingBox = new THREE.Box3().setFromObject(player.camera); 
});

// loader.load('models/college2.glb', function (gltf2) {
//     gltf2.scene.traverse((n) => {
//         if (n.isMesh) {
//             n.material.opacity = 0;
//             n.material.transparent = true;
//         }
//     });
//     scene.add(gltf2.scene);
//     objects.push(gltf2.scene);
// });



    let previousTime = performance.now();

// Render Loop
function animate() {
    let currentTime = performance.now();
    let dt = (currentTime - previousTime) / 1000;
    
    requestAnimationFrame(animate);


    //DETECT OBSTACLES IN W


    // const raycasterY = new THREE.Raycaster()
    // raycasterY.set(player.camera.position, new THREE.Vector3(0, -1, 0))
    // const intersectsY = raycasterY.intersectObjects(objects, true)
    // if (intersectsY.length > 0) {
    //     const desiredDistanceToGeometry = 0.38
    //     const newYPosition = intersectsY[0].point.y + desiredDistanceToGeometry
    //     player.position.setY(newYPosition)
    // }
    // else {
    //     player.position(0.38)
    // }

    player.applyInputs(dt);
    renderer.render(scene, player.controls.isLocked ? player.camera : orbitCamera);

    previousTime = currentTime;
}

window.addEventListener('resize', () => {
    player.camera.aspect = window.innerWidth / window.innerHeight;
    player.camera.updateProjectionMatrix();
    orbitCamera.aspect = window.innerWidth / window.innerHeight;
    orbitCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

setupLights();
animate();
