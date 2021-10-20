const steel_texture = new THREE.TextureLoader().load("https://agranadosb.github.io/practica5/images/metal_128x128.jpg")

const steel = new THREE.MeshLambertMaterial({
    map: steel_texture,
    side: THREE.DoubleSide
})

const water_texture = new THREE.TextureLoader().load("https://agranadosb.github.io/practica5/images/istockphoto-1043818774-170667a.png")
water_texture.wrapS = water_texture.wrapT = THREE.RepeatWrapping; 
water_texture.repeat.set( 20, 20 );
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
    'https://agranadosb.github.io/practica5/images/pisometal_1024x1024.jpg',
    'https://agranadosb.github.io/practica5/images/pisometal_1024x1024.jpg',
    'https://agranadosb.github.io/practica5/images/pisometal_1024x1024.jpg',
    'https://agranadosb.github.io/practica5/images/pisometal_1024x1024.jpg',
    'https://agranadosb.github.io/practica5/images/pisometal_1024x1024.jpg',
    'https://agranadosb.github.io/practica5/images/pisometal_1024x1024.jpg',
])

const shiny = new THREE.MeshPhongMaterial({
    color: 'white',
    specular: 'white',
    shininess: 50,
    envMap: room_map
})
