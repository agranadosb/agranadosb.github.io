let start = false
let pause = true

const left_arrow = 37
const up_arrow = 38
const right_arrow = 39
const down_arrow = 40

const a_key = 65
const d_key = 68
const w_key = 87
const s_key = 83
const q_key = 81
const e_key = 69

const esc_key = 27
let gui

function setupGUI() {
    // Objeto controlador de la interfaz
    effectController = {
        mensaje: "Interfaz",
        rotation_base: 0.0,
        rotation_arm: -45.0,
        rotation_frontarm_y: -180.0,
        rotation_frontarm_z: 90.0,
        rotation_gripper: 0.0,
        space_gripper: 7,
        muertes: 0,
    }

    gui = new dat.GUI()
    var folder = gui.addFolder("Controles")

    folder.add(effectController, "mensaje").name("Aplicación")
    folder.add(effectController, "rotation_base", -180, 180, 0.1).name("Giro base")
    folder.add(effectController, "rotation_arm", -45, 45, 1).name("Giro brazo")
    folder.add(effectController, "rotation_frontarm_y", -180, 180, 1).name("Giro antebrazo Y")
    folder.add(effectController, "rotation_frontarm_z", -90, 90, 1).name("Giro antebrazo Z")
    folder.add(effectController, "rotation_gripper", -220, 40, 1).name("Giro pinza")
    folder.add(effectController, "space_gripper", 0, 15, 0.1).name("Separación pinza")

    var folder2 = gui.addFolder("Juego")

    folder2.add(effectController, "muertes", 0).name("Muertes")
}

function transform() {
    base_object.rotation.y = effectController.rotation_base * Math.PI / 180
    brazo_object.rotation.z = effectController.rotation_arm * Math.PI / 180
    antebrazo_object.rotation.y = effectController.rotation_frontarm_y * Math.PI / 180
    antebrazo_object.rotation.z = effectController.rotation_frontarm_z * Math.PI / 180
    mano_object.rotation.x = effectController.rotation_gripper * Math.PI / 180
    pinza_1_object.position.x = effectController.space_gripper
    pinza_2_object.position.x = -effectController.space_gripper
}

function keyboard(event) {
    if (event.keyCode == esc_key) {
        if (!start) {
            start = true
            info_div.remove()
        } else {
            start = false
            document.getElementById('body').appendChild(info_div)
        }
    }

    if (!start) {
        return
    }

    if (event.keyCode == down_arrow) {
        base_object.position.x -= 20
        return
    }
    if (event.keyCode == up_arrow) {
        base_object.position.x += 20
        return
    }
    if (event.keyCode == left_arrow) {
        base_object.position.z -= 20
        return
    }
    if (event.keyCode == right_arrow) {
        base_object.position.z += 20
    }

    if (event.keyCode == a_key) {
        effectController.rotation_base += Math.PI
    }
    if (event.keyCode == d_key) {
        effectController.rotation_base -= Math.PI
    }

    if (event.keyCode == w_key && brazo_object.rotation.z < Math.PI / 4) {
        effectController.rotation_arm += Math.PI
    }
    if (event.keyCode == s_key && brazo_object.rotation.z > -Math.PI / 4) {
        effectController.rotation_arm -= Math.PI
    }

    if (event.keyCode == q_key) {
        effectController.rotation_frontarm_y += Math.PI
    }
    if (event.keyCode == e_key) {
        effectController.rotation_frontarm_z -= Math.PI
    }
}
