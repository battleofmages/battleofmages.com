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
	positionRandomness: .3,
	velocity: new THREE.Vector3(),
	velocityRandomness: .5,
	color: 0xaa88ff,
	colorRandomness: .2,
	turbulence: .5,
	lifetime: 2,
	size: 5,
	sizeRandomness: 1
}
var spawnerOptions = {
	spawnRate: 15000,
	horizontalSpeed: 1.5,
	verticalSpeed: 1.33,
	timeScale: 1
}

var cursor = new THREE.Vector2()
var cursor3d = new THREE.Vector3()
var projectVector = new THREE.Vector3()

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

function spawnParticles() {
	var delta = clock.getDelta() * spawnerOptions.timeScale
	tick += delta

	if(tick < 0)
		tick = 0

	if(delta > 0) {
		options.position = cursor3d

		for(var x = 0; x < spawnerOptions.spawnRate * delta; x++) {
			particleSystem.spawnParticle(options)
		}
	}

	particleSystem.update(tick)
}

function animate() {
	requestAnimationFrame(animate)
	spawnParticles()
	renderer.render(scene, camera)
}

init()
animate()