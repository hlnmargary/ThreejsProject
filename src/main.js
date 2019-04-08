import * as THREE from 'three';
import OrbitControls from '../node_modules/three-orbitcontrols/OrbitControls';
// import SvgLoader from '../node_modules/three/examples/js/loaders/SVGLoader';

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

var material = new THREE.MeshNormalMaterial;
var geometry = new THREE.BoxGeometry(10, 10, 10);
var sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);


//SVG 

// var loader = new SvgLoader();

// loader.load(
//   // resource URL
//   'assets/myface.svg',
//   // called when the resource is loaded
//   function (data) {

//     var paths = data.paths;
//     var group = new THREE.Group();

//     for (var i = 0; i < paths.length; i++) {

//       var path = paths[i];

//       var material = new THREE.MeshBasicMaterial({
//         color: path.color,
//         side: THREE.DoubleSide,
//         depthWrite: false
//       });

//       var shapes = path.toShapes(true);

//       for (var j = 0; j < shapes.length; j++) {

//         var shape = shapes[j];
//         var geometry = new THREE.ShapeBufferGeometry(shape);
//         var mesh = new THREE.Mesh(geometry, material);
//         group.add(mesh);

//       }

//     }

//     scene.add(group);

//   });




//CAMERA CONTROL 

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.dampingFactor = 0.25;
controls.enableZoom = true;
controls.enableKeys = true;
controls.maxDistance = 200;


function animate() {
  requestAnimationFrame(animate);
  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render(scene, camera);
}

animate();