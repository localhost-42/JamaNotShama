export function drawSprite(
  ctx: CanvasRenderingContext2D,
  sprite: string[],
  x: number,
  y: number,
  scale: number,
  color = "#111"
) {
  ctx.fillStyle = color

  for (let row = 0; row < sprite.length; row++) {
    const line = sprite[row]

    for (let col = 0; col < line.length; col++) {
      if (line[col] === "1") {
        ctx.fillRect(
          x + col * scale,
          y + row * scale,
          scale,
          scale
        )
      }
    }
  }
}