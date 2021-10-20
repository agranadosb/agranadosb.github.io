let renderer, scene, camera, floor_plan, mixer, clock
const L = 700
let finish = false
let controls
init()
setupGUI()
loadScene()
render()

function init() {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(new THREE.Color(0x000000))
    document.getElementById('container').appendChild(renderer.domElement)
    renderer.autoClear = false
    renderer.shadowMap.enabled = true

    scene = new THREE.Scene()

    mixer = new THREE.AnimationMixer(scene);
    clock = new THREE.Clock();

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000)
    camera.position.set(0.5, 200, 150)
    camera.lookAt(new THREE.Vector3(0, 60, 0))

    controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.target.set(0, 0, 0)

    controls.keys = {
        LEFT: 'KeyA',
        UP: 'KeyW',
        RIGHT: 'KeyD',
        BOTTOM: 'KeyS'
    }

    floor_plan = new THREE.OrthographicCamera(-L, L, L, -L)

    floor_plan.position.set(0, 1000, 0)
    floor_plan.lookAt(new THREE.Vector3(0, 0, 0))

    scene.add(floor_plan)

    window.addEventListener('resize', repair_ratio)
    document.addEventListener('keydown', keyboard)

    setLights()
}

function loadScene() {
    const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })

    const suelo = new THREE.Mesh(new THREE.PlaneGeometry(10000, 10000, 10, 10), water)
    suelo.rotation.x = -Math.PI / 2
    suelo.receiveShadow = true;

    const shader = THREE.ShaderLib.cube;
    shader.uniforms.tCube.value = room_map

    wall_shader = new THREE.ShaderMaterial({
        fragmentShader: shader.fragmentShader,
        vertexShader: shader.vertexShader,
        uniforms: shader.uniforms,
        side: THREE.BackSide
    })

    const room = new THREE.Mesh(new THREE.CubeGeometry(10000, 10000, 10000), wall_shader)

    scene.add(suelo)
    scene.add(new THREE.AxesHelper(3))

    scene.add(robot(material))
    scene.add(room)

    loadMonster()
}


function repair_ratio() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}


function update() {
    transform()
}

let xvalue = 0.5


function render() {
    if (finish) {
        return
    }
    mixer.update(clock.getDelta());

    requestAnimationFrame(render)
    update()
    renderer.clear()

    small = window.innerHeight
    if (window.innerWidth <= window.innerHeight) {
        small = window.innerWidth
    }
    renderer.setViewport(0, 0, small / 4, small / 4)
    floor_plan.position.set(base_object.position.x, 1000, base_object.position.z)
    floor_plan.lookAt(new THREE.Vector3(base_object.position.x, 0, base_object.position.z))
    renderer.render(scene, floor_plan)

    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight)
    
    const new_monsters = []
    for (let index = 0; index < monsters.length; index++) {
        const monster = monsters[index];

        monster.position.x += (base_object.position.x - monster.position.x) * 0.005;
        monster.position.z += (base_object.position.z - monster.position.z) * 0.005;
        monster.lookAt(base_object.position.x, 0, base_object.position.z)
        monster.rotateY(-Math.PI / 2)

        factor = 100

        monster_position = new THREE.Vector3()
        monster.getWorldPosition(monster_position)
        pinza_object_position = new THREE.Vector3()
        pinza_object.getWorldPosition(pinza_object_position)

        deleted = false
        if (Math.abs(monster_position.x - pinza_object_position.x) < factor) {
            if (Math.abs(monster_position.y - pinza_object_position.y) < factor) {
                if (Math.abs(monster_position.z - pinza_object_position.z) < factor) {
                    removeObject3D(monster)
                    deleted = true
                    effectController.muertes += 1
                    gui.updateDisplay()
                }
            }
        }


        factor2 = 100

        if (!deleted) {
            base_object_position = new THREE.Vector3()
            base_object.getWorldPosition(base_object_position)

            if (Math.abs(monster_position.x - base_object_position.x) < factor2) {
                if (Math.abs(monster_position.y - base_object_position.y) < factor2) {
                    if (Math.abs(monster_position.z - base_object_position.z) < factor2) {
                        alert("Has Perdido!")
                        finish = true
                        window.location.reload()
                    }
                }
            }
        }


        if (!deleted) {
            new_monsters.push(monster)
        }
    }
    monsters = new_monsters

    if (THREE.Math.randInt(1, 500) <= 2 + effectController.muertes) {
        loadMonster()
    }
    
    renderer.render(scene, camera)
}

function removeObject3D(object) {
    if (!(object instanceof THREE.Object3D)) return false;
    // for better memory management and performance
    if (object.geometry) {
        object.geometry.dispose();
    }
    if (object.material) {
        if (object.material instanceof Array) {
            // for better memory management and performance
            object.material.forEach(material => material.dispose());
        } else {
            // for better memory management and performance
            object.material.dispose();
        }
    }
    if (object.parent) {
        object.parent.remove(object);
    }
    // the parent might be the scene or another Object3D, but it is sure to be removed this way
    return true;
}