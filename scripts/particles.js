var container = $('render')
var camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 10000)
var scene = new THREE.Scene()
var clock = new THREE.Clock(true)
var tick = 0
var renderer = new THREE.WebGLRenderer({
	alpha: true
})
var particleSystem = new THREE.GPUParticleSystem({
	maxParticles: 250000
})
var options = {
	position: new THREE.Vector3(),
	positionRandomness: 0.3,
	velocity: new THREE.Vector3(),
	velocityRandomness: 1,
	color: 0x80ff80, //0xaa88ff,
	colorRandomness: 0.2,
	turbulence: 0.5,
	lifetime: 2,
	size: 2,
	sizeRandomness: 1
}
var spawnerOptions = {
	spawnRate: 500,
	timeScale: 1
}

var cursor = new THREE.Vector2()
var cursor3d = new THREE.Vector3()
var mouseDown = false
var projectVector = new THREE.Vector3()

var activeMenuElement = null

/*document.onmousedown = function() {
	mouseDown = true
}

document.onmouseup = function() {
	mouseDown = false
}

document.onmousemove = function(e) {
    cursor.x = e.clientX
    cursor.y = e.clientY

	projectVector.set(
		(cursor.x / window.innerWidth) * 2 - 1,
	    -(cursor.y / window.innerHeight) * 2 + 1,
	    0.5
	)

	projectVector.unproject(camera)

	let dir = projectVector.sub(camera.position).normalize()
	let distance = - camera.position.z / dir.z
	cursor3d = camera.position.clone().add(dir.multiplyScalar(distance))
}*/

function repositionCursor() {
	let element = document.querySelector('.active')

	if(element !== activeMenuElement) {
		spawnerOptions.spawnRate = 20000
		activeMenuElement = element
	} else {
		spawnerOptions.spawnRate = 500
	}

	cursor.x = element.offsetLeft + element.offsetWidth / 2
    cursor.y = element.offsetTop + element.offsetHeight / 2

	projectVector.set(
		(cursor.x / window.innerWidth) * 2 - 1,
	    -(cursor.y / window.innerHeight) * 2 + 1,
	    0.5
	)

	projectVector.unproject(camera)

	let dir = projectVector.sub(camera.position).normalize()
	let distance = - camera.position.z / dir.z
	cursor3d = camera.position.clone().add(dir.multiplyScalar(distance))
}

function init() {
	camera.position.z = 100

	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)

	scene.add(particleSystem)

	container.appendChild(renderer.domElement)
	document.body.appendChild(container)

	window.addEventListener('resize', onWindowResize, false)
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight
	camera.updateProjectionMatrix()
	renderer.setSize(window.innerWidth, window.innerHeight)
}

function animate() {
	requestAnimationFrame(animate)
	repositionCursor()

	let delta = clock.getDelta() * spawnerOptions.timeScale
	tick += delta

	if(tick < 0)
		tick = 0

	if(delta > 0) {
		for(let x = 0; x < spawnerOptions.spawnRate * delta; x++) {
			for(let degree = 0; degree < 360; degree++) {
				options.position = cursor3d.clone()
				options.position.x += Math.cos(degree) * 3.5
				options.position.y += Math.sin(degree) * 3.5
				// options.velocity.x = Math.cos(degree)
				// options.velocity.y = Math.sin(degree)
				particleSystem.spawnParticle(options)
			}
		}
	}

	particleSystem.update(tick)

	renderer.render(scene, camera)
}

init()
animate()