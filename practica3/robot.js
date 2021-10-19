
function base(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(50, 50, 15, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)

    return cylinder
}

function eje(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(20, 20, 18, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)

    cylinder.rotation.x = -Math.PI / 2

    return cylinder
}

function esparrago(material) {
    const box_geometry = new THREE.BoxGeometry(18, 120, 12)
    const box = new THREE.Mesh(box_geometry, material)

    return box
}

function rotula(material) {
    const geometry = new THREE.SphereGeometry(20, 20, 20);
    const sphere = new THREE.Mesh(geometry, material);

    return sphere
}

function disco(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(22, 22, 6, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)

    return cylinder
}

function nervio(material) {
    const box_geometry = new THREE.BoxGeometry(4, 80, 4)
    const box = new THREE.Mesh(box_geometry, material)

    return box
}

function nervios(material) {
    const nervios = new THREE.Object3D()

    const ratio = 10

    const nervio_mesh_1 = nervio(material)
    const nervio_mesh_2 = nervio(material)
    const nervio_mesh_3 = nervio(material)
    const nervio_mesh_4 = nervio(material)

    nervio_mesh_1.position.set(ratio, 0, ratio)
    nervio_mesh_2.position.set(ratio, 0, -ratio)
    nervio_mesh_3.position.set(-ratio, 0, ratio)
    nervio_mesh_4.position.set(-ratio, 0, -ratio)

    nervios.add(nervio_mesh_1)
    nervios.add(nervio_mesh_2)
    nervios.add(nervio_mesh_3)
    nervios.add(nervio_mesh_4)

    return nervios
}

function palma(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(15, 15, 40, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)

    return cylinder
}

function pinza_atras(material) {
    const box_geometry = new THREE.BoxGeometry(4, 20, 19)
    const box = new THREE.Mesh(box_geometry, material)

    return box
}

function trapezoid(material) {
    const trapezoid = new THREE.Geometry();

    const size = 20

    const coordinates_base_1 = [
        0, 0, 0, // 1 0, 1, 2,
        4, 0, 0, // 2 3, 4, 5,
        4, size, 0, // 3 6, 7, 8,
        0, size, 0  // 4 9, 10, 11,
    ]

    const coordinates_base_2 = [
        0, 0, 19, // 5 12, 13, 14,
        2, 0, 19, // 6 15, 16, 17,
        2, size / 2, 19, // 7 18, 19, 20,
        0, size / 2, 19  // 8 21, 22, 23,
    ]

    const total_coordiantes = coordinates_base_1.concat(coordinates_base_2)

    const indices = [
        7, 3, 4, // 2
        3, 8, 4, // 2
        2, 6, 1, // 1
        6, 5, 1, // 1
        2, 3, 6, // 3
        3, 7, 6, // 3
        6, 7, 5, // 4
        7, 4, 5, // 4
        8, 1, 4, // 5
        4, 1, 5, // 5
        3, 2, 1, // 6
        3, 1, 8  // 6
    ]

    for (let i = 0; i < total_coordiantes.length; i += 3) {
        let vector = new THREE.Vector3(total_coordiantes[i], total_coordiantes[i + 1], total_coordiantes[i + 2]);
        trapezoid.vertices.push(vector)
    }

    for (let i = 0; i < indices.length; i += 3) {
        let face = new THREE.Face3(indices[i], indices[i + 1], indices[i + 2]);
        trapezoid.faces.push(face);
    }

    return new THREE.Mesh(trapezoid, material);
}

function pinza(material) {
    const mano = new THREE.Object3D()

    const pinza_atras_mesh = pinza_atras(material)
    const trapezoid_mesh = trapezoid(material)

    trapezoid_mesh.position.set(-2, -10, 9)

    mano.add(pinza_atras_mesh)
    mano.add(trapezoid_mesh)

    return mano
}

function mano(material) {
    const mano = new THREE.Object3D()

    const palma_mesh = palma(material)

    palma_mesh.rotation.z = -Math.PI / 2

    const pinza_1_object = pinza(material)
    const pinza_2_object = pinza(material)

    pinza_1_object.position.set(10, 0, 19)
    pinza_2_object.position.set(-10, 0, 19)

        const scale = new THREE.Vector3(1, 1, 1);
    scale.x *= -1;
    pinza_2_object.scale.multiply(scale);

    mano.add(palma_mesh)
    mano.add(pinza_1_object)
    mano.add(pinza_2_object)

    return mano
}

function antebrazo(material) {
    const antebrazo = new THREE.Object3D()

    const disco_mesh = disco(material)
    const nervios_mesh = nervios(material)

    nervios_mesh.position.set(0, 43, 0)

    const mano_object = mano(material)

    mano_object.position.set(0, 83, 0)

    antebrazo.add(disco_mesh)
    antebrazo.add(nervios_mesh)
    antebrazo.add(mano_object)

    return antebrazo
}

function brazo(material) {
    const brazo = new THREE.Object3D()

    const eje_mesh = eje(material)
    const esparrago_mesh = esparrago(material)
    const rotula_mesh = rotula(material)

    esparrago_mesh.position.set(0, 60, 0)
    rotula_mesh.position.set(0, 120, 0)

    const antebrazo_object = antebrazo(material)

    antebrazo_object.position.set(0, 120, 0)

    brazo.add(eje_mesh)
    brazo.add(esparrago_mesh)
    brazo.add(rotula_mesh)

    brazo.add(antebrazo_object)

    return brazo
}

function robot(material) {
    const robot = new THREE.Object3D()

    robot.add(base(material))
    robot.add(brazo(material))

    return robot
}