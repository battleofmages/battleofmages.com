function navigateLeft() {

}

function navigateRight() {

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