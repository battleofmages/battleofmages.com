const maxFPS = 60
const radiusPx = 65

var options = {
	position: new THREE.Vector3(),
	positionRandomness: 0.3,
	velocity: new THREE.Vector3(),
	velocityRandomness: 1,
	color: 0xffffff,
	colorRandomness: 0.2,
	turbulence: 0.5,
	lifetime: 2,
	size: 2,
	sizeRandomness: 1
}

var spawnerOptions = {
	spawnRate: 0,
	timeScale: 1
}