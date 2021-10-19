if ( ! Detector.webgl ) Detector.addGetWebGLMessage();
			var container, stats, clock, mixer;
			var camera, scene, renderer, objects;
			init();
			animate();

			function init() {

				container = document.getElementById( 'container' );

				camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 2000 );
				camera.position.set( 2, 4, 2 );

				clock = new THREE.Clock();

				scene = new THREE.Scene();
				scene.fog = new THREE.FogExp2( 0x000000, 0.035 );

				mixer = new THREE.AnimationMixer( scene );
				var loader = new THREE.JSONLoader();
				loader.load( 'models/blender/monster/monster.json', function ( geometry, materials ) {
					var material = materials[ 0 ];
					material.morphTargets = true;
					material.color.setHex( 0xffaaaa );
					var mesh = new THREE.Mesh( geometry, materials );
					mesh.position.set( 1, 0, 1 );

					var s = THREE.Math.randFloat( 0.00075, 0.001 );
					mesh.scale.set( s, s, s );
					mesh.rotation.y = THREE.Math.randFloat( -0.25, 0.25 );
					mesh.matrixAutoUpdate = false;
					mesh.updateMatrix();

					scene.add( mesh );
					// let a = []
					// let b = []
					// let result = []
					//
					// for(let i = 0; i< geometry.animations[0].tracks.length;i++)
					// {
					// 		if(i< 0.3*geometry.animations[0].tracks.length) {
					// 			a.push(geometry.animations[0].tracks[i])
					// 		} else if( i> 0.8*geometry.animations[0].tracks.length){
					// 			b.push(geometry.animations[0].tracks[i])
					// 		}else {
					// 			result.push(geometry.animations[0].tracks[i])
					// 		}
					// }
					// geometry.animations[0].tracks = a;
					// geometry.animations[0].duration /=2.0;
					mixer.clipAction( geometry.animations[ 0 ], mesh ,10 )
							.setDuration(2)   // one second
							.startAt( 0 )	//  (already running)
							.play();	// let's go
				} );

				// lights

				var ambientLight = new THREE.AmbientLight( 0xcccccc );
				scene.add( ambientLight );

				var pointLight = new THREE.PointLight( 0xff4400, 5, 30 );
				pointLight.position.set( 5, 0, 0 );
				scene.add( pointLight );

				// renderer

				renderer = new THREE.WebGLRenderer();
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( window.innerWidth, window.innerHeight );
				container.appendChild( renderer.domElement );

				// stats

				stats = new Stats();
				container.appendChild( stats.dom );

				// events

				window.addEventListener( 'resize', onWindowResize, false );

			}

			//

			function onWindowResize( event ) {

				renderer.setSize( window.innerWidth, window.innerHeight );

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

			}

			//

			function animate() {

				requestAnimationFrame( animate );

				render();
				stats.update();

			}

			function render() {

				var timer = Date.now() * 0.0005;

				camera.position.x = Math.cos( timer ) * 10;
				//camera.position.y = 4;
				camera.position.z = Math.sin( timer ) * 10;

				mixer.update( clock.getDelta() );

				camera.lookAt( scene.position );

				renderer.render( scene, camera );

			}