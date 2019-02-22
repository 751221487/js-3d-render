import Matrix from '../utils/Matrix'

class Mesh {
  constructor(ctx, data, transform) {
    this.vertex = data.vertex
    this.normal = data.normal
    this.transform = transform || Matrix.unit(3)
  }

  _update() {
    for(let i = 0; i < this.vertex.length; i += 3) {
      
    }
  }

}