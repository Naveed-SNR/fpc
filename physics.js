import * as THREE from 'three'

export class Physics {
    constructor() {

    }
    /**
     * Moves the physics simulation forward in time by 'dt'
     * @params {number} dt
     * @params {Player} player
     * @params {objects} objects
     */

    update(dt, player, objects)
    {
        this.detectCollisions(player, objects)
    }

    /**
     * Main function for collision detection
     * @param {player} player
     * @param {objects} objects
     */

    detectCollisions(player, objects)
    {
        const candidates = this.broadPhase(player, objects)
        const collisions = this.narrowPhase(candidates, player)
        
        if (collisions.length > 0) {
            this.resolveCollions(collisions)
        }
    }

}