import * as THREE from 'three'
import { PointerLockControls } from 'three/examples/jsm/Addons.js'
import { cameraFar, positionLocal } from 'three/examples/jsm/nodes/Nodes.js'

export class Player {

    raycaster
    maxSpeed = 1.1;
    input = new THREE.Vector3()
    velocity = new THREE.Vector3()
    camera = new THREE.PerspectiveCamera(74, window.innerWidth / window.innerHeight, 0.1, 201)
    cameraHelper = new THREE.CameraHelper(this.camera)
    controls = new PointerLockControls(this.camera, document.body)
    boundingBox = new THREE.Box3();
    boundingBoxes = []
    
    /**
     * @param {THREE.Scene} scene
     * @param {Array<THREE.Box3>} boundingBoxes
     */
    
    constructor(scene, boundingBoxes) {
        this.boundingBoxes = boundingBoxes
        this.position.set(11, 0.74, 3)
        scene.add(this.camera)
        // scene.add(this.cameraHelper)
        document.addEventListener('keydown', this.onKeyDown.bind(this))
        document.addEventListener('keyup', this.onKeyUp.bind(this))
    }

    applyInputs(dt) {
        if (this.controls.isLocked) {
           
            this.velocity.x = this.input.x
            this.velocity.z = this.input.z
            this.controls.moveRight(this.velocity.x * dt)
            this.controls.moveForward(this.velocity.z * dt)   
           
        }
        document.getElementById('player-position').innerHTML = this.toString()
    }

    

    /**
     * Returns the current world postion of the player
     * @type {THREE.Vector3} 
     */
    get position(){
        return this.camera.position
    }
        
    /**
     * Event handler for 'keydown' event
     * @param {KeyboardEvent} event
     */
    onKeyDown(event) {
        if (!this.controls.isLocked) {
            this.controls.lock()
            console.log('Controls Locked')
        }

        switch(event.code) {
            case 'KeyW':
                this.input.z = this.maxSpeed
                break           
            case 'KeyA':
                this.input.x = -this.maxSpeed
                break
            case 'KeyS':
                this.input.z = -this.maxSpeed
                break
            case 'KeyD':
                this.input.x = this.maxSpeed
                break     
            }
            
    }

    /**
     * Event handler for 'keyup' event
     * @param {KeyboardEvent} event
     */

    onKeyUp(event) {
        switch(event.code) {
            case 'KeyW':
                this.input.z =0
                break           
            case 'KeyA':
                this.input.x = 0
                break
            case 'KeyS':
                this.input.z = 0
                break
            case 'KeyD':
                this.input.x =0
                break     
            }
    }

    toString() {
        let str = ''
        str += `X: ${this.position.x.toFixed(3)}`
        str += `Y: ${this.position.y.toFixed(3)}`
        str += `Z: ${this.position.z.toFixed(3)}`
        return str

    }
}
