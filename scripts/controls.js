function navigateLeft() {
	let sibling = activeElement.previousSibling

	if(!sibling)
		sibling = activeElement.parentNode.lastChild

	sibling.click()
}

function navigateRight() {
	let sibling = activeElement.nextSibling

	if(!sibling)
		sibling = activeElement.parentNode.firstChild

	sibling.click()
}

document.onkeydown = function(evt) {
    evt = evt || window.event

    switch(evt.keyCode) {
        case 37:
            navigateLeft()
            break
        case 39:
            navigateRight()
            break
    }
}