let renderer, scene, camera, floor_plan
const L = 50
let controls
init()
setupGUI()
loadScene()
render()

function init() {
    renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(new THREE.Color(0xFFFFFF))
    document.getElementById('container').appendChild(renderer.domElement)
    renderer.autoClear = false

    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
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
    document.addEventListener('keydown', keyboard);
}

function loadScene() {
    const material = new THREE.MeshBasicMaterial({ color: 'red', wireframe: true })
    const suelo = new THREE.Mesh(new THREE.PlaneGeometry(1000, 1000, 10, 10), material)
    suelo.rotation.x = -Math.PI / 2
    scene.add(suelo)
    scene.add(new THREE.AxesHelper(3))

    scene.add(robot(material))
}


function repair_ratio() {
    renderer.setSize(window.innerWidth, window.innerHeight)
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
}


function update() {
    transform()
}

function render() {
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
    renderer.render(scene, camera)
}