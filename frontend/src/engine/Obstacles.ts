import { type Obstacle } from "../types/game"
import { drawSprite } from "../utils/drawSprite"
import { hedgehog } from "../sprites/hedgehog"
import { liger } from "../sprites/liger"
import { monkey } from "../sprites/monkey"
import {
  GAME_WIDTH,
  GROUND_Y,
  PLAYER_SCALE,
  MIN_SPAWN_DISTANCE,
  BASE_SPEED,
  MAX_STACK_COUNT,
  STACK_SPEED_SCALE
} from "./config"

const OBSTACLES = [hedgehog, liger, monkey]

export class Obstacles {
  pool: Obstacle[] = []
  active: Obstacle[] = []

  distanceSinceSpawn = 0
  nextSpawnDistance = MIN_SPAWN_DISTANCE

  constructor() {
    for (let i = 0; i < 30; i++) {
      this.pool.push({
        active: false,
        x: 0,
        y: 0,
        width: 0,
        height: 0,
        sprite: hedgehog
      })
    }
  }

  spawn(currentSpeed: number) {
    // Determine max stack based on speed
    const speedFactor = (currentSpeed - BASE_SPEED) / STACK_SPEED_SCALE
    const maxStack = Math.min(MAX_STACK_COUNT, 1 + Math.floor(speedFactor))
    const stackCount = Math.floor(Math.random() * maxStack) + 1 // 1 → maxStack animals

    let offsetX = 0
    const stack: Obstacle[] = []

    for (let i = 0; i < stackCount; i++) {
      const obstacle = this.pool.pop()
      if (!obstacle) break

      const sprite = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)]
      obstacle.sprite = sprite
      obstacle.width = sprite[0].length * PLAYER_SCALE
      obstacle.height = sprite.length * PLAYER_SCALE
      obstacle.x = GAME_WIDTH + offsetX
      obstacle.y = GROUND_Y
      obstacle.active = true

      // Tight horizontal spacing: still jumpable
      offsetX += obstacle.width + 5
      stack.push(obstacle)
    }

    this.active.push(...stack)

    // Distance between stacks scales with speed (faster = more reaction time)
    const speedFactorDistance = Math.min(200, 100 + speedFactor * 50)
    this.nextSpawnDistance =
      stackCount * 20 + MIN_SPAWN_DISTANCE + Math.random() * speedFactorDistance
    this.distanceSinceSpawn = 0
  }

  update(dt: number, speed: number) {
    const move = speed * dt
    this.distanceSinceSpawn += move

    if (this.distanceSinceSpawn > this.nextSpawnDistance) {
      this.spawn(speed)
    }

    for (const o of this.active) {
      o.x -= move
    }

    // recycle off-screen
    for (let i = this.active.length - 1; i >= 0; i--) {
      const o = this.active[i]
      if (o.x + o.width < 0) {
        this.active.splice(i, 1)
        o.active = false
        this.pool.push(o)
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const o of this.active) {
      drawSprite(ctx, o.sprite, o.x, o.y - o.height, PLAYER_SCALE)
    }
  }
}