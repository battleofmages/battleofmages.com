function init() {
	camera.position.z = 100

	renderer.setPixelRatio(window.devicePixelRatio)
	renderer.setSize(window.innerWidth, window.innerHeight)

	scene.add(particleSystem)

	container.appendChild(renderer.domElement)
	document.body.appendChild(container)
	renderer.render(scene, camera)

	window.addEventListener('resize', onWindowResize)

	document.addEventListener('ActiveLinksMarked', repositionCursor)
	document.addEventListener('visibilitychange', () => {
		if(document.visibilityState === 'visible')
			clock.start()
		else
			clock.stop()
	})

	setTimeout(() => {
		repositionCursor()
		spawnPosition = cursor3d.clone()
		clock.start()

		// Start drawing
		setInterval(() => {
			if(document.visibilityState === 'visible')
				requestAnimationFrame(draw)
		}, 1000 / maxFPS)
	}, 1350)
}