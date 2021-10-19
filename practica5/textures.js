const steel_texture = new THREE.TextureLoader().load("/opt/proyectos/GPC/practica5/images/metal_128x128.jpg")

steel = new THREE.MeshPhongMaterial({
    map: steel_texture,
    side: THREE.DoubleSide
})
