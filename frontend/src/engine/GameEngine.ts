import { Player } from "./Player"
import { Obstacles } from "./Obstacles"
import { rectCollision } from "./physics"
import { BASE_SPEED, SPEED_SCALE, GAME_WIDTH, GAME_HEIGHT } from "./config"
import type { KeyState } from "../types/game"


export class GameEngine {
  private ctx: CanvasRenderingContext2D
  private getKeys: () => KeyState
  private onScore: (score: number) => void
  private onGameOver: (score: number) => void

  public player = new Player()
  public obstacles = new Obstacles()
  public score = 0
  public running = true

  private lastTime = 0
  private rafId = 0
  private prevJump = false

  constructor(
    ctx: CanvasRenderingContext2D,
    getKeys: () => KeyState,
    onScore: (score: number) => void,
    onGameOver: (score: number) => void
  ) {
    this.ctx = ctx
    this.getKeys = getKeys
    this.onScore = onScore
    this.onGameOver = onGameOver
  }

  start() {
    this.running = true
    this.score = 0
    this.player = new Player();
    this.obstacles.active = []
    this.lastTime = performance.now()
    this.rafId = requestAnimationFrame(this.loop)
  }

  stop() {
    cancelAnimationFrame(this.rafId)
  }

  reset() {
    this.start()
  }

 

  private loop = (time: number) => {
    const rawDt = (time - this.lastTime) / 1000
    const dt = Math.min(rawDt, 0.05)
    this.lastTime = time

     const keys = this.getKeys()

    if (this.running) {
      this.update(dt)
      this.draw()
    } else if(keys.ArrowUp) {
      this.reset()
      return
    } else {
      
      this.drawGameOver()
    }

    this.rafId = requestAnimationFrame(this.loop)
  }

  
  private update(dt: number) {
    const keys = this.getKeys()
    const jumpPressed = keys.ArrowUp && !this.prevJump
    this.prevJump = keys.ArrowUp

    this.player.update(dt, jumpPressed, keys.ArrowDown)
    this.score += dt * 10

    const speed = BASE_SPEED + this.score * SPEED_SCALE
    this.obstacles.update(dt, speed)

    const playerRect = this.player.getRect()

    for (const o of this.obstacles.active) {
      if (
        rectCollision(playerRect, {
          x: o.x,
          y: o.y - o.height,
          width: o.width,
          height: o.height,
        })
      ) {
        this.running = false
        this.onGameOver(Math.floor(this.score))
      }
    }

    this.onScore(Math.floor(this.score))
  }

  private draw() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT)

    ctx.fillStyle = "#222"
    ctx.fillRect(0, 170, GAME_WIDTH, 2)

    this.player.draw(ctx)
    this.obstacles.draw(ctx)
  }

  private drawGameOver() {
    this.draw()
    const ctx = this.ctx
    ctx.fillStyle = "#111"
    ctx.font = "20px monospace"
    ctx.fillText("GAME OVER - PRESS ↑", 250, 90)
  }
}