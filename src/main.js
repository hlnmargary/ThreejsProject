import * as THREE from 'three';
//RERENDER
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


//SCENE
var scene = new THREE.Scene(); // initialising the scene
scene.background = new THREE.Color(0xffeccb);

//CAMERA
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);


//OBJECT
function CustomSinCurve(scale) {

  THREE.Curve.call(this);

  this.scale = (scale === undefined) ? 1 : scale;

}

CustomSinCurve.prototype = Object.create(THREE.Curve.prototype);
CustomSinCurve.prototype.constructor = CustomSinCurve;

CustomSinCurve.prototype.getPoint = function (t) {

  var tx = t * 8 - 4.5;
  var ty = Math.sin(2 * Math.PI * t);
  var tz = 0;

  return new THREE.Vector3(tx, ty, tz).multiplyScalar(this.scale);

};

var path = new CustomSinCurve(10);
var geometry = new THREE.TubeGeometry(path, 300, 1, 10, false);
var material = new THREE.MeshBasicMaterial({ color: 0x31369c });
var mesh = new THREE.Mesh(geometry, material);

var light = new THREE.AmbientLight(0x404040); // soft white light


//ADDES ON SCENE
scene.add(mesh, light);



// var geometrysphere = new THREE.SphereGeometry(2, 3, 30);
// var materialsphere = new THREE.MeshBasicMaterial({ color: 0x72369c });
// var sphere = new THREE.Mesh(geometrysphere, materialsphere);

// var geometrycone = new THREE.ConeGeometry(5, 5, 5);
// var materialcone = new THREE.MeshBasicMaterial({ color: 0x23369c });
// var cone = new THREE.Mesh(geometrycone, materialcone);


// scene.add(sphere, cone);

function render() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}


camera.position.z = 50;

var animate = function () {
  requestAnimationFrame(animate);

  // sphere.rotation.x += 0.00;
  // sphere.rotation.y += 0.05;
  // cone.rotation.x += 0.00;
  // cone.rotation.y += 0.05;

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;



  renderer.render(scene, camera);
};

animate();