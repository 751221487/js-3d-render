import { unit, multiple, multiplVec, rotation } from '../utils/Matrix'
import { numberMultiple, castTo } from '../utils/Vector'
import Point from '../utils/Point'
import Renderer from '../renderer/Renderer'

export default class Mesh {
  constructor(data, transform) {
    this.vertex = data.vertex
    this.normals = data.normal
    this.transform = transform || unit(4)
  }

  _update() {
    // this.transform = multiple(rotation([1, 0, 0], 0.2), this.transform)
    this._render()
  }

  _render() {
    let {ctx, width, height} = this.scene

    let cam = this.scene.mainCamera
    let view = cam.getViewMatrix()

    let t = multiple(view, this.transform)

    let transform = multiple(cam.projection, t)

    let renderer = new Renderer(ctx, width, height)

    for(let i = 0; i < this.vertex.length; i += 3) {
      let vertex0 = multiplVec(transform, [...this.vertex[i], 1])
      let vertex1 = multiplVec(transform, [...this.vertex[i + 1], 1])
      let vertex2 = multiplVec(transform, [...this.vertex[i + 2], 1])
      let normal = this.normals[i]

      let color = `rgb(${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)}, ${parseInt(Math.random() * 255)})`
      
      renderer.addTraiangle(vertex0, vertex1, vertex2, normal, color)
    }

    renderer.render()
  }

}