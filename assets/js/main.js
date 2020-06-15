let camera, scene, renderer, mesh;
let largeSphere;
let orbitingPiecesArray=[]
let speedFactor=0;
let raycaster = new THREE.Raycaster();
let mouse = new THREE.Vector2();

init();
animate();
window.addEventListener( 'resize', onWindowResize, false );
window.addEventListener('click', onMouseMove, false)

function init() {
  renderer = new THREE.WebGLRenderer( { antialias: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );		
  document.body.appendChild( renderer.domElement );
  
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
  camera.position.z = 35;
  

  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x111111);

  // Create large centered sphere and add to scene
  const sphereGeometry = new THREE.SphereGeometry( 12, 12, 12 );
  const sphereMaterial = new THREE.MeshBasicMaterial( {color: 0xffffff,
    wireframe: true,
    transparent: true,
    opacity: .1} );
   largeSphere = new THREE.Mesh( sphereGeometry, sphereMaterial );
   scene.add( largeSphere );

  background_particles(1, true, .75, true, new THREE.Color(0xffffff), 10000);
  createClickables()
  
}

function background_particles(size, transparent, opacity, sizeAttenuation, color, nbParticles) {
  // Create star field background and add to scene
  const starsGeometry = new THREE.Geometry();
  for (let i = 0; i < nbParticles; i++) {
      const star = new THREE.Vector3();
      star.x = THREE.Math.randFloatSpread(1900);
      star.y = THREE.Math.randFloatSpread(1900);
      star.z = THREE.Math.randFloatSpread(2600) + 64;
      starsGeometry.vertices.push(star);
  }
  const starsMaterial = new THREE.PointsMaterial({
      color: color,
      size: size,
      transparent: transparent,
      opacity: opacity,
      sizeAttenuation: sizeAttenuation,
    
  });
  starField = new THREE.Points(starsGeometry,starsMaterial);
  scene.add(starField);
}

function createClickables(){
  const orbitingPiecesData = [
    {
      size: 1,
      widtheightSegmentsments: 1,
      heightSegments: 1,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: 0,
      thetaLength: Math.PI,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    {
      size: 1,
      widtheightSegmentsments: 8,
      heightSegments: 2,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: 2.2,
      thetaLength: Math.PI,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    {
      size: 1,
      widtheightSegmentsments: 16,
      heightSegments: 24,
      phiStart: 0,
      phiLength: Math.PI * 2 + 24,
      thetaStart: 24,
      thetaLength: Math.PI,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    {
      size: 1,
      wseg: 16,
      hseg: 4,
      phiStart: 0,
      phiLength: Math.PI * 2 + 24,
      thetaStart: 24,
      thetaLength: Math.PI + 24,
      scaleAnimation: {
          x: 16,
          y: 16,
          z: 16
      },
      positionAnimation: {
          x: 0,
          y: 0,
          z: 0
      },
      opacityAnimation: .05,
    },
    {
      size: 1,
      wseg: 16,
      hseg: 8,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: Math.PI,
      thetaLength: Math.PI * 4,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    
    {
      size: 1,
      wseg: 8,
      hseg: 8,
      phiStart: 10,
      phiLength: Math.PI * 3,
      thetaStart: 10,
      thetaLength: Math.PI * 3,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    {
      size: 1,
      wseg: 3,
      hseg: 9,
      phiStart: 0,
      phiLength: Math.PI * 4,
      thetaStart: 8,
      thetaLength: Math.PI / 2,
      scaleAnimation: {
        x: 24,
        y: 24,
        z: 24,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    {
      size: 1,
      wseg: 16,
      hseg: 12,
      phiStart: 0,
      phiLength: Math.PI * 2,
      thetaStart: 8,
      thetaLength: Math.PI * 8,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
    {
      size: 1,
      wseg: 5,
      hseg: 24,
      phiStart: 0,
      phiLength: Math.PI * 4,
      thetaStart: 4,
      thetaLength: Math.PI / 4 + 8,
      scaleAnimation: {
        x: 16,
        y: 16,
        z: 16,
      },
      positionAnimation: {
        x: 0,
        y: 0,
        z: 0,
      },
      opacityAnimation: 0.05,
    },
  ];

  for (let i = 0; i < orbitingPiecesData.length; i++) {
    const geometry = new THREE.SphereGeometry(orbitingPiecesData[i].size,orbitingPiecesData[i].widtheightSegmentsments,orbitingPiecesData[i].heightSegments,orbitingPiecesData[i].phiStart,orbitingPiecesData[i].phiLength,orbitingPiecesData[i].thetaStart,orbitingPiecesData[i].thetaLength);
    const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        opacity: .5,
        transparent: true
    });
    let object = new THREE.Mesh(geometry,material);
    object.position.x = Math.sin(i / 1.45) * Math.PI * 6;
    object.position.y = Math.cos(i / 1.45) * Math.PI * 6;
    object.position.z = 0;
    object.data =  orbitingPiecesData[i].data;
    object.isActive = false;
    object.isClicked = false;
    object.isVisible = true;
    object.scaleAnimation = orbitingPiecesData[i].scaleAnimation;
    object.positionAnimation = orbitingPiecesData[i].positionAnimation;   
   
    scene.add(object);
    orbitingPiecesArray.push(object)
  }
  
}



function handleClickOrbitingPiece(element){
 
  const delay  = .25
  element.isClicked=true
  gsap.to(element.material, 1, {
    opacity: .05,
    ease: Expo.easeInOut,
    delay: delay
});
    gsap.to(element.scale, 1, {
      x: element.scaleAnimation.x,
      y: element.scaleAnimation.y,
      z: element.scaleAnimation.z,
      delay: delay,
    })
    gsap.to(element.position, 1, {
      x: element.positionAnimation.x,
      y: element.positionAnimation.y,
      ease: Expo.easeInOut,
      delay: delay
  });
  gsap.to(largeSphere.scale, 1, {
      x: 0.0001,
      y: 0.0001,
      z: 0.0001,
      ease: Expo.easeInOut,
      onComplete: function() {
        largeSphere.isVisible = false;
      }
  });
  for (var i = 0; i < orbitingPiecesArray.length; i++) {
    if (!orbitingPiecesArray[i].isClicked) {
        gsap.to(orbitingPiecesArray[i].scale, 2, {
            x: 0.0001,
            y: 0.0001,
            z: 0.0001,
            ease: Expo.easeInOut,
            onComplete: function() {
                this.isVisible = false;
            },
           
        });
    }
}
 
}

function onMouseMove( event ) {

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  

  // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

	// calculate objects intersecting the picking ray.i.e Get the object being clicked.
	var intersects = raycaster.intersectObjects( orbitingPiecesArray );

	for ( var i = 0; i < intersects.length; i++ ) {

    handleClickOrbitingPiece(intersects[ i ].object)

	}

}


function onWindowResize() {
  // Adjust the canvas dimensions in response to change in window size
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}


function animate() {
  starField.rotation.x += 0.0001;
  starField.rotation.y += 0.0001;
  starField.rotation.x += 0.0001;

  largeSphere.rotation.z += 0.001;
 

  for (let i = 0; i < orbitingPiecesArray.length; i++){    
    if (!!orbitingPiecesArray[i].isClicked === false && !!orbitingPiecesArray[i].isVisible===true){ 
         
        speedFactor += 0.001;    
        orbitingPiecesArray[i].rotation.z += 0.005;
        orbitingPiecesArray[i].rotation.x += 0.005;  
        orbitingPiecesArray[i].position.x = Math.sin(.25 *  speedFactor + i / 1.45) * Math.PI * 6;
        orbitingPiecesArray[i].position.y = Math.cos(.25 * speedFactor  + i / 1.45) * Math.PI * 6; 
         
     }
    }  


  
  requestAnimationFrame( animate );
  renderer.render( scene, camera );

}
