let monsters = []

function loadMonster() {
    const loader = new THREE.JSONLoader();
    loader.load('https://agranadosb.github.io/proyecto_final/models/monster.json', function (geometry, materials) {
        const material = materials[0];
        material.morphTargets = true;
        material.color.setHex(0xffaaaa);
        const monster = new THREE.Mesh(geometry, materials);
        const x = THREE.Math.randInt(800, -800);
        const z = THREE.Math.randInt(800, -800);
        monster.position.set(x, 20, z);

        ang = Math.atan(Math.sin(z) / Math.cos(x))
        monster.scale.set(0.05, 0.05, 0.05);
        monster.updateMatrix();

        monster.rotation.y = -Math.PI / 2

        monster.castShadow = true;
        monster.receiveShadow = true;

        scene.add(monster);
        mixer.clipAction(geometry.animations[0], monster, 10)
            .setDuration(2)
            .startAt(0)
            .play();
        monsters.push(monster)
    });
}
