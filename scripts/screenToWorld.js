function screenToWorld(x, y) {
	projectVector.set(
		(x / container.offsetWidth) * 2 - 1,
	    -(y / container.offsetHeight) * 2 + 1,
	    0.5
	)

	projectVector.unproject(camera)

	let dir = projectVector.sub(camera.position).normalize()
	let distance = - camera.position.z / dir.z
	return camera.position.clone().add(dir.multiplyScalar(distance))
}