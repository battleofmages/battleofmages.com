var container = $('render')
var camera = new THREE.PerspectiveCamera(28, window.innerWidth / window.innerHeight, 1, 10000)
var scene = new THREE.Scene()
var clock = new THREE.Clock(false)
var tick = 0
var renderer = new THREE.WebGLRenderer({
	alpha: true
})
var particleSystem = new THREE.GPUParticleSystem({
	maxParticles: 250000
})
var cursor = new THREE.Vector2()
var cursor3d = new THREE.Vector3()
var spawnPosition = new THREE.Vector3()
var mouseDown = false
var projectVector = new THREE.Vector3()
var radius = 0.0
var activeElement = null
var oldActiveElement = null
var windowLoaded = false