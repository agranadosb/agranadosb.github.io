const steel_texture = new THREE.TextureLoader().load("https://agranadosb.github.io/practica5/images/metal_128x128.jpg")

const steel = new THREE.MeshLambertMaterial({
    map: steel_texture,
    side: THREE.DoubleSide
})

const water_texture = new THREE.TextureLoader().load("https://agranadosb.github.io/practica5/images/wet_ground.jpg")

const water = new THREE.MeshLambertMaterial({
    map: water_texture,
    side: THREE.DoubleSide
})

const wood_texture = new THREE.TextureLoader().load("https://agranadosb.github.io/practica5/images/metal_128x128.jpg")

const wood = new THREE.MeshPhongMaterial({
    map: wood_texture,
    side: THREE.DoubleSide
})

const room_map = new THREE.CubeTextureLoader().load([
    'https://agranadosb.github.io/practica5/images/posx.jpg',
    'https://agranadosb.github.io/practica5/images/negx.jpg',
    'https://agranadosb.github.io/practica5/images/posy.jpg',
    'https://agranadosb.github.io/practica5/images/negy.jpg',
    'https://agranadosb.github.io/practica5/images/posz.jpg',
    'https://agranadosb.github.io/practica5/images/negz.jpg',
])

const shiny = new THREE.MeshPhongMaterial({
    color: 'white',
    specular: 'white',
    shininess: 50,
    envMap: room_map
})
