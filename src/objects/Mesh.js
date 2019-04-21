import { unit, multiple, multiplVec, rotation } from '../utils/Matrix'
import { numberMultiple, castTo } from '../utils/Vector'
import Point from '../utils/Point'

export default class Mesh {
  constructor(data, options) {
    this.vertex = data.vertex
    this.normals = data.normal
    this.colors = data.color
    this.transform = options.transform || unit(4)
    if(typeof options.update === 'function') {
      this.update = options.update.bind(this)
    }
  }

  _update() {
    this.update && this.update()
    this._render()
  }

  _render() {
    let {ctx, width, height, renderer} = this.scene

    let cam = this.scene.mainCamera
    let view = cam.getViewMatrix()

    let t = multiple(view, this.transform)
    let transform = multiple(cam.projection, t)

    for(let i = 0; i < this.vertex.length; i += 3) {
      let vertex0 = multiplVec(transform, [...this.vertex[i], 1])
      let vertex1 = multiplVec(transform, [...this.vertex[i + 1], 1])
      let vertex2 = multiplVec(transform, [...this.vertex[i + 2], 1])
      let normal =  multiplVec(this.transform, [...this.normals[i], 1])

      let color = [this.colors[i], this.colors[i + 1], this.colors[i + 2]] 
      
      renderer.addTraiangle(vertex0, vertex1, vertex2, normal, color)
    }
  }

}