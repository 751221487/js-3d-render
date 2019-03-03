import { unit, multiple, multiplVec } from '../utils/Matrix'
import { numberMultiple } from '../utils/Vector'
import Point from '../utils/Point'

export default class Mesh {
  constructor(data, transform) {
    this.vertex = data.vertex
    this.normal = data.normal
    this.transform = transform || unit(4)
  }

  _update() {
    this._render()
  }

  _render() {
    console.log('render')
    let {ctx, width, height} = this.scene

    let cam = this.scene.mainCamera
    let view = cam.getViewMatrix()

    let t = multiple(view, this.transform)

    let transform = multiple(cam.projection, multiple(view, this.transform))
    // let transform = this.transform

    let _vertex0 = multiplVec(transform, [0, 0, 0, 1])
    let _vertex1 = multiplVec(transform, [5, 0, 0, 1])
    let _vertex2 = multiplVec(transform, [0, 5, 0, 1])
    let _vertex3 = multiplVec(transform, [0, 0, 5, 1])

    let vertex0 = numberMultiple(_vertex0, 1 / _vertex0[3])
    let vertex1 = numberMultiple(_vertex1, 1 / _vertex1[3])
    let vertex2 = numberMultiple(_vertex2, 1 / _vertex2[3])
    let vertex3 = numberMultiple(_vertex3, 1 / _vertex3[3])

    let point0 = new Point(vertex0[0], vertex0[1]).NDC(width, height)
    let point1 = new Point(vertex1[0], vertex1[1]).NDC(width, height)
    let point2 = new Point(vertex2[0], vertex2[1]).NDC(width, height)
    let point3 = new Point(vertex3[0], vertex3[1]).NDC(width, height)

    ctx.moveTo(point0.x, point0.y);
    ctx.lineTo(point1.x, point1.y);
    ctx.stroke()

    ctx.moveTo(point0.x, point0.y);
    ctx.lineTo(point2.x, point2.y);
    ctx.stroke()

    ctx.moveTo(point0.x, point0.y);
    ctx.lineTo(point3.x, point3.y);
    ctx.stroke()



    // for(let i = 0; i < this.vertex.length; i += 3) {
    //   let _vertex0 = multiplVec(transform, [...this.vertex[i], 1])
    //   let _vertex1 = multiplVec(transform, [...this.vertex[i + 1], 1])
    //   let _vertex2 = multiplVec(transform, [...this.vertex[i + 2], 1])
    //   let vertex0 = numberMultiple(_vertex0, 1 / _vertex0[3])
    //   let vertex1 = numberMultiple(_vertex1, 1 / _vertex1[3])
    //   let vertex2 = numberMultiple(_vertex2, 1 / _vertex2[3])
    //   let point0 = new Point(vertex0[0], vertex0[1]).NDC(width, height)
    //   let point1 = new Point(vertex1[0], vertex1[1]).NDC(width, height)
    //   let point2 = new Point(vertex2[0], vertex2[1]).NDC(width, height)
    //   console.log(vertex0, vertex1, vertex2)
    //   // ctx.fillStyle = `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`
    //   ctx.moveTo(point0.x, point0.y);
    //   ctx.lineTo(point1.x, point1.y);
    //   ctx.lineTo(point2.x, point2.y);
    //   ctx.lineTo(point0.x, point0.y);
    //   // ctx.fill()
    //   ctx.stroke()
    // }
  }

}