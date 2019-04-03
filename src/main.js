import * as THREE from 'three';
import OrbitControls from 'three-orbitcontrols';

//RERENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//SCENE
var scene = new THREE.Scene(); // initialising the scene
scene.background = new THREE.Color(0xffffff);
scene.directionalLight = new THREE.DirectionalLight(0xf51485, 4.5);

//CAMERA
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 80;
scene.add(camera);


//STARS
var starsGeometry = new THREE.Geometry();
for (var i = 0; i < 100000; i++) {
  var star = new THREE.Vector3(9, 3, 9);
  star.x = THREE.Math.randFloatSpread(1000);
  star.y = THREE.Math.randFloatSpread(1000);
  star.z = THREE.Math.randFloatSpread(1000);
  starsGeometry.vertices.push(star);
}
var starsMaterial = new THREE.PointsMaterial({
  color: 0x23369c,
  size: 0.4
});
var starField = new THREE.Points(starsGeometry, starsMaterial);
scene.add(starField);



//OBJECT 2
var geometry = new THREE.SphereBufferGeometry(30, 2, 32);
var material = new THREE.MeshBasicMaterial({ color: 0xff8d8d, wireframe: true });
var sphere = new THREE.Mesh(geometry, material);
sphere.castShadow = true; //default is false
sphere.receiveShadow = false; //default
scene.add(sphere);


const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true
controls.dampingFactor = 0.25
controls.enableZoom = true;
controls.enableKeys = true;

function animate() {
  requestAnimationFrame(animate);
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render(scene, camera);
}

animate();