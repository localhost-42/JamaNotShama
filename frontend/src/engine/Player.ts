import type { Rect } from "../types/game"
import { drawSprite } from "../utils/drawSprite"
import { alpacaRun1, alpacaRun2 } from "../sprites/alpaca"
import { GROUND_Y, PLAYER_SCALE } from "./config"

export class Player {
  x = 60
  y = GROUND_Y

  velocityY = 0

  gravity = 900
  jumpForce = -360

  frame = 0
  frameTimer = 0

  width = alpacaRun1[0].length * PLAYER_SCALE
  height = alpacaRun1.length * PLAYER_SCALE

  onGround = true

  update(dt: number, jumpPressed: boolean, dropHeld: boolean) {
    if (jumpPressed && this.onGround) {
      this.velocityY = this.jumpForce
      this.onGround = false
    }

    if (dropHeld && this.velocityY < 0) {
      this.velocityY += 1200 * dt
    }

    this.velocityY += this.gravity * dt
    this.y += this.velocityY * dt

    if (this.y >= GROUND_Y) {
      this.y = GROUND_Y
      this.velocityY = 0
      this.onGround = true
    }

    if (this.onGround) {
      this.frameTimer += dt
      if (this.frameTimer > 0.14) {
        this.frame = (this.frame + 1) % 2
        this.frameTimer = 0
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    const sprite = this.frame === 0 ? alpacaRun1 : alpacaRun2
    drawSprite(ctx, sprite, this.x, this.y - this.height, PLAYER_SCALE)
  }

  getRect(): Rect {
    return {
      x: this.x,
      y: this.y - this.height,
      width: this.width,
      height: this.height
    }
  }
}