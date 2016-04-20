function draw() {
	let delta = clock.getDelta() * spawnerOptions.timeScale
	tick += delta

	spawnPosition.lerp(cursor3d, delta * 8)

	if(activeElement !== oldActiveElement) {
		spawnerOptions.spawnRate = 20000
		options.color = activeElement.dataset.explode
		oldActiveElement = activeElement
	} else {
		spawnerOptions.spawnRate = 500
		options.color = activeElement.dataset.idle
	}

	if(tick < 0)
		tick = 0

	if(delta > 0) {
		for(let x = 0; x < spawnerOptions.spawnRate * delta; x++) {
			for(let degree = 0; degree < 360; degree++) {
				options.position.x = spawnPosition.x + Math.cos(degree) * radius
				options.position.y = spawnPosition.y + Math.sin(degree) * radius
				particleSystem.spawnParticle(options)
			}
		}
	}

	particleSystem.update(tick)
	renderer.render(scene, camera)
}