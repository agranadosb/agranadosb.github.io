let mano_object, antebrazo_object, brazo_object, base_object, pinza_1_object, pinza_2_object

function base(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(50, 50, 15, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;

    return cylinder
}

function eje(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(20, 20, 18, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)

    cylinder.rotation.x = -Math.PI / 2
    cylinder.receiveShadow = true;
    cylinder.castShadow = true;

    return cylinder
}

function esparrago(material) {
    const box_geometry = new THREE.BoxGeometry(18, 120, 12)
    const box = new THREE.Mesh(box_geometry, material)
    box.receiveShadow = true;
    box.castShadow = true;

    return box
}

function rotula(material) {
    const geometry = new THREE.SphereGeometry(20, 20, 20);
    const sphere = new THREE.Mesh(geometry, shiny);
    sphere.receiveShadow = true;
    sphere.castShadow = true;

    return sphere
}

function disco(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(22, 22, 6, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)
    cylinder.receiveShadow = true;
    cylinder.castShadow = true;

    return cylinder
}

function nervio(material) {
    const box_geometry = new THREE.BoxGeometry(4, 80, 4)
    const box = new THREE.Mesh(box_geometry, material)
    box.receiveShadow = true;
    box.castShadow = true;

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
    nervios.receiveShadow = true;
    nervios.castShadow = true;

    return nervios
}

function palma(material) {
    const cylinder_geometry = new THREE.CylinderGeometry(15, 15, 40, 32)
    const cylinder = new THREE.Mesh(cylinder_geometry, material)

    cylinder.receiveShadow = true;
    cylinder.castShadow = true;


    return cylinder
}

function pinza_atras(material) {
    const box_geometry = new THREE.BoxGeometry(4, 20, 19)
    const box = new THREE.Mesh(box_geometry, material)

    box.receiveShadow = true;
    box.castShadow = true;

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

    const res = new THREE.Mesh(trapezoid, new THREE.MeshBasicMaterial({ color: 'white' }));

    res.receiveShadow = true
    res.castShadow = true

    return res
}

function pinza(material) {
    const mano = new THREE.Object3D()

    const pinza_atras_mesh = pinza_atras(material)
    const trapezoid_mesh = trapezoid(material)

    trapezoid_mesh.position.set(-2, -10, 9)

    mano.add(pinza_atras_mesh)
    mano.add(trapezoid_mesh)

    mano.castShadow = true;
    mano.receiveShadow = true;

    return mano
}

function mano(material) {
    mano_object = new THREE.Object3D()

    const palma_mesh = palma(material)

    palma_mesh.rotation.z = -Math.PI / 2

    pinza_1_object = pinza(material)
    pinza_2_object = pinza(material)

    pinza_1_object.position.set(10, 0, 19)
    pinza_2_object.position.set(-10, 0, 19)

    const scale = new THREE.Vector3(1, 1, 1);
    scale.x *= -1;
    pinza_2_object.scale.multiply(scale);

    mano_object.add(palma_mesh)
    mano_object.add(pinza_1_object)
    mano_object.add(pinza_2_object)

    mano_object.castShadow = true;
    mano_object.receiveShadow = true;


    return mano_object
}

function antebrazo(material) {
    antebrazo_object = new THREE.Object3D()

    const disco_mesh = disco(material)
    const nervios_mesh = nervios(material)

    nervios_mesh.position.set(0, 43, 0)

    const mano_object = mano(material)

    mano_object.position.set(0, 83, 0)

    antebrazo_object.add(disco_mesh)
    antebrazo_object.add(nervios_mesh)
    antebrazo_object.add(mano_object)

    antebrazo_object.castShadow = true;
    antebrazo_object.receiveShadow = true;

    return antebrazo_object
}

function brazo(material) {
    brazo_object = new THREE.Object3D()

    const eje_mesh = eje(material)
    const esparrago_mesh = esparrago(material)
    const rotula_mesh = rotula(material)

    esparrago_mesh.position.set(0, 60, 0)
    rotula_mesh.position.set(0, 120, 0)

    const antebrazo_object = antebrazo(material)

    antebrazo_object.position.set(0, 120, 0)

    brazo_object.add(eje_mesh)
    brazo_object.add(esparrago_mesh)
    brazo_object.add(rotula_mesh)

    brazo_object.add(antebrazo_object)

    brazo_object.castShadow = true;
    brazo_object.receiveShadow = true;

    return brazo_object
}

function robot(material) {
    base_object = new THREE.Object3D()

    base_object.add(base(steel))
    base_object.add(brazo(steel))

    base_object.castShadow = true;
    base_object.receiveShadow = true;

    return base_object
}