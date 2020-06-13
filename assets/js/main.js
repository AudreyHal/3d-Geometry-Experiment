var camera, scene, renderer, mesh;
var largeSphere;

init();
animate();
window.addEventListener( 'resize', onWindowResize, false );

function init() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );		
  document.body.appendChild( renderer.domElement );
  
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 40;

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  var sphereGeometry = new THREE.SphereGeometry( 12, 12, 12 );
  var sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: .1} );
  largeSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
   scene.add( largeSphere );

  background_particles(1, true, .75, true, new THREE.Color(0xffffff), 10000)

}

function background_particles(size, transparent, opacity, sizeAttenuation, color, nbParticles) {
  var starsGeometry = new THREE.Geometry();
  for (var i = 0; i < nbParticles; i++) {
      var star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(1900);
      star.y = THREE.Math.randFloatSpread(1900);
      star.z = THREE.Math.randFloatSpread(2600) + 64;
      starsGeometry.vertices.push(star);
  }
  var starsMaterial = new THREE.PointsMaterial({
      color: color,
      size: size,
      transparent: transparent,
      opacity: opacity,
      sizeAttenuation: sizeAttenuation,
    
  });
  starField = new THREE.Points(starsGeometry,starsMaterial);
  scene.add(starField);
}


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function onMouseMove(){
  
}

function animate() {
  starField.rotation.x += 0.0001;
  starField.rotation.y += 0.0001;
  starField.rotation.x += 0.0001;

  largeSphere.rotation.z += 0.001;
  
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}
