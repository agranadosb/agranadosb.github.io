function setLights() {
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight('white', 0.4);
    directionalLight.position.set(0, 1, 0);
    scene.add(directionalLight);

    const spotLight = new THREE.SpotLight('white', 0.6);
    spotLight.position.set(300, 800, 300);
    spotLight.target.position.set(400, 1600, 400);
    spotLight.angle = Math.PI / 8;
    spotLight.penumbra = 1;

    spotLight.shadow.camera.near = 100;
    spotLight.shadow.camera.far = 2500;
    spotLight.shadow.camera.fov = 60;

    spotLight.castShadow = true;
    scene.add(spotLight);
}
