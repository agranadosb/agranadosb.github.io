function setLights() {
    // Luces
	var ambiental = new THREE.AmbientLight(0xFFFFFF, 0.7)
	scene.add( ambiental )

	var puntual = new THREE.PointLight(0xFFFFFF,0.9)
	puntual.position.set( 150, 200, 150 )
	scene.add( puntual )

	var direccional = new THREE.DirectionalLight(0xFFFFFF,0.5)
	direccional.position.set(-100,150,100 )
	scene.add(direccional)

	var focal = new THREE.SpotLight(0xFFFFFF,0.5)
	focal.position.set( 400,200,3 )
	focal.target.position.set(0,0,0)
	focal.angle = Math.PI/3
	focal.castShadow = true

	focal.shadow.camera.near = 1
	focal.shadow.camera.far = 1000
	focal.shadow.camera.fov = 100
	scene.add(focal)
}
