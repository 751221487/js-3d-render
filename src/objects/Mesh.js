import Matrix from '../utils/Matrix'
import Point from '../utils/Point'

export default class Mesh {
  constructor(data, transform) {
    this.vertex = data.vertex
    this.normal = data.normal
    this.transform = transform || Matrix.unit(3)
  }

  _update() {
    this._render()
  }

  _render() {
    let {ctx, width, height} = this.scene

    for(let i = 0; i < this.vertex.length; i += 3) {
      let point0 = new Point(this.vertex[i][0], this.vertex[i][1]).NDC(width, height)
      let point1 = new Point(this.vertex[i + 1][0], this.vertex[i + 1][1]).NDC(width, height)
      let point2 = new Point(this.vertex[i + 2][0], this.vertex[i + 2][1]).NDC(width, height)
      ctx.moveTo(point0.x, point0.y);
      ctx.lineTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.stroke()
    }
  }

}