const steel_texture = new THREE.TextureLoader().load("images/metal_128x128.jpg")

steel = new THREE.MeshPhongMaterial({
    map: steel_texture,
    side: THREE.DoubleSide
})
