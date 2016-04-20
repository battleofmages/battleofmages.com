function repositionCursor() {
	activeElement = document.querySelector('.active')

	cursor.x = activeElement.offsetLeft + activeElement.offsetWidth / 2
    cursor.y = activeElement.offsetTop + activeElement.offsetHeight / 2

	cursor3d = screenToWorld(cursor.x, cursor.y)
	radius = screenToWorld(cursor.x + radiusPx, cursor.y).x - cursor3d.x
}