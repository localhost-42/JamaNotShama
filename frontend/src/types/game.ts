export interface Rect {
  x: number
  y: number
  width: number
  height: number
}

export interface Obstacle {
  active: boolean
  x: number
  y: number
  width: number
  height: number
  sprite: string[]
}

export interface KeyState {
  ArrowUp: boolean
  ArrowDown: boolean
}