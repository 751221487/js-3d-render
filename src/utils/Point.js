export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  NDC(width, height) {
    let x = width * (this.x + 1) / 2
    let y = height * (1 - this.y) / 2
    return new Point(x, y)
  }
}