/**
*	Seminario 3. Ejemplo 2. Multivista
*	Dibujar Planta, Alzado y Perfil de la escena ademas de 
*   una vista perspectiva interactiva. Actuacion sobre el objeto seleccionado
*
*	sep,2018
*/

// Variables reservadas
var renderer, scene, camera;

// Camaras planta, alzado y perfil
var planta, alzado, perfil;
var L = 3; // SemiLado de la vista ortografica

var cameraControls;

var cubo;

// Acciones
init();
loadScene();
render();

function setCameras( ar )
{
	// Configurar tres camaras ortográficas
	var camaraOrtografica;

	if( ar > 1 )
		camaraOrtografica = new THREE.OrthographicCamera( -L*ar, L*ar, L, -L, -100, 100 );
	else
		camaraOrtografica = new THREE.OrthographicCamera( -L, L, L/ar, -L/ar, -100, 100 );

	alzado = camaraOrtografica.clone();
	alzado.position.set(0,0,L);
	alzado.lookAt( new THREE.Vector3(0,0,0) );
	perfil = camaraOrtografica.clone();
	perfil.position.set(L,0,0);
	perfil.lookAt( new THREE.Vector3(0,0,0) );
	planta = camaraOrtografica.clone();
	planta.position.set(0,L,0);
	planta.lookAt( new THREE.Vector3(0,0,0) );
	planta.up = new THREE.Vector3(0,0,-1);

	scene.add(alzado);
	scene.add(perfil);
	scene.add(planta);

}

function init()
{
	// Configurar el canvas y el motor de render
	renderer = new THREE.WebGLRenderer();
	renderer.setSize(window.innerWidth, window.innerHeight);
	renderer.setClearColor( new THREE.Color(0x0000AA) );
	document.getElementById('container').appendChild( renderer.domElement );
	renderer.autoClear = false;

	// Instanciar la escena
	scene = new THREE.Scene();

	// Instanciar la camara
	var aspectRatio = window.innerWidth/window.innerHeight;
	camera = new THREE.PerspectiveCamera( 75, aspectRatio, 0.1, 200 );
	camera.position.set( 2,2,3 );
	camera.lookAt( new THREE.Vector3(0,0,0) );

	cameraControls = new THREE.OrbitControls( camera, renderer.domElement );
	cameraControls.target.set(0,0,0);

	setCameras( window.innerWidth/window.innerHeight);

	// Capturar el evento de resize
	window.addEventListener('resize',updateAspectRatio);
	// Capturar dobleclick sobre el canvas
	renderer.domElement.addEventListener('dblclick',rotateCube);
}

function loadScene()
{
	// 5 cubos iguales en tira
	var geometria = new THREE.BoxGeometry(0.9,0.9,0.9);
	var material = new THREE.MeshBasicMaterial( {color:'yellow', wireframe:true} );
	for( var i = 0; i < 5; i++ ){
		var cubo = new THREE.Mesh( geometria, material );
		cubo.position.set( -2+i, 0, 0 );
		scene.add( cubo );
	}
	scene.add( new THREE.AxesHelper(3) );
}

function rotateCube( event )
{
	// Capturar la posicion del cursor
	var x = event.clientX;
	var y = event.clientY;

	// Zona de click
	var derecha = false, abajo = false;
	var cam = null;
	if( x > window.innerWidth/2 ){
		derecha = true;
		x -= window.innerWidth/2;
	}
	if( y > window.innerHeight/2 ){
		abajo = true;
		y -= window.innerHeight/2;
	}

	if( derecha )
		if( abajo ) cam = camera;
		else cam = perfil;
	else
		if( abajo ) cam = planta;
		else cam = alzado;

	// cam es la camara que recibe el click

	// Normalizar a (-1,1) el click
	x = ( x * 4/window.innerWidth ) - 1;
	y = -( y * 4/window.innerHeight) + 1;

	// Construir el rayo
	var rayo = new THREE.Raycaster();
	rayo.setFromCamera( new THREE.Vector2(x,y), cam );

	var intersecciones = rayo.intersectObjects( scene.children );
	if( intersecciones.length > 0 ){
		intersecciones[0].object.rotation.x += Math.PI/5;
	}
}

function updateAspectRatio()
{
	// Fija el tamaño del lienzo al nuevo tamaño de la ventana del cliente
	renderer.setSize(window.innerWidth,window.innerHeight);

	var ar = window.innerWidth/window.innerHeight;
	camera.aspect = ar;
	camera.updateProjectionMatrix();

	if( ar > 1 ){
		alzado.left = perfil.left = planta.left = -L*ar;
		alzado.right = perfil.right = planta.right = L*ar;
		alzado.top = perfil.top = planta.top = L;
		alzado.bottom = perfil.bottom = planta.bottom = -L;		
	}
	else{
		alzado.left = perfil.left = planta.left = -L;
		alzado.right = perfil.right = planta.right = L;
		alzado.top = perfil.top = planta.top = L/ar;
		alzado.bottom = perfil.bottom = planta.bottom = -L/ar;				
	}

	alzado.updateProjectionMatrix();
	perfil.updateProjectionMatrix();
	planta.updateProjectionMatrix();
}

function update() 
{

}

function render() 
{
	// Encolarse a si misma para el proximo frame
	requestAnimationFrame(render);

	update();

	renderer.clear();

	// Alzado
	renderer.setViewport( 0,0,window.innerWidth/2,window.innerHeight/2);
	renderer.render( scene, alzado );

	// Perfil
	renderer.setViewport( window.innerWidth/2,0,window.innerWidth/2,window.innerHeight/2);
	renderer.render( scene, perfil );

	// Planta
	renderer.setViewport( 0,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
	renderer.render( scene, planta );

	// Perspectiva
	renderer.setViewport( window.innerWidth/2,window.innerHeight/2,window.innerWidth/2,window.innerHeight/2);
	renderer.render( scene, camera );

}