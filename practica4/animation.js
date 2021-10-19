const left_arrow = 37
const up_arrow = 38
const right_arrow = 39
const down_arrow = 40

function setupGUI() {
    // Objeto controlador de la interfaz
    effectController = {
        mensaje: "Interfaz",
        rotation_base: 0.0,
        rotation_arm: 0.0,
        rotation_frontarm_y: 0.0,
        rotation_frontarm_z: 0.0,
        rotation_gripper: 0.0,
        space_gripper: 7,
    }

    var gui = new dat.GUI()
    var folder = gui.addFolder("Controles")

    folder.add(effectController, "mensaje").name("Aplicación")
    folder.add(effectController, "rotation_base", -180, 180, 0.1).name("Giro base")
    folder.add(effectController, "rotation_arm", -45, 45, 1).name("Giro brazo")
    folder.add(effectController, "rotation_frontarm_y", -180, 180, 1).name("Giro antebrazo Y")
    folder.add(effectController, "rotation_frontarm_z", -90, 90, 1).name("Giro antebrazo Z")
    folder.add(effectController, "rotation_gripper", -220, 40, 1).name("Giro pinza")
    folder.add(effectController, "space_gripper", 0, 15, 0.1).name("Separación pinza")
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
    if (event.keyCode == left_arrow) {
        base_object.position.x -= 10
        return
    }
    if (event.keyCode == right_arrow) {
        base_object.position.x += 10
        return
    }
    if (event.keyCode == up_arrow) {
        base_object.position.z -= 10
        return
    }
    if (event.keyCode == down_arrow) {
        base_object.position.z += 10
    }
}