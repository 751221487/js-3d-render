import Point from '../utils/Point'
import { add, minus, dot, cross, numberMultiple, castTo } from '../utils/Vector'

export default class Renderer {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.triangles = []
    this.width = width
    this.height = height
  }

  addTraiangle(point1, point2, point3, normal, color) {
    this.triangles.push({
      points: [point1, point2, point3],
      normal: normal,
      color: color
    })
  }

  intersect(x, y, triangle) {
    let point = new Point(x, y).clip(this.width, this.height)

    let o = [0, 0, 0]
    let _a = triangle.points[0]
    let _b = triangle.points[1]
    let _c = triangle.points[2]
    let a = castTo(numberMultiple(_a, _a[3]), 3)
    let b = castTo(numberMultiple(_b, _b[3]), 3)
    let c = castTo(numberMultiple(_c, _c[3]), 3)
    let p = [point.x, point.y, 0]
    let q = [0, 0, 1]

    let minx = Math.min(a[0], b[0], c[0])
    let maxx = Math.max(a[1], b[1], c[1])
    let miny = Math.min(a[0], b[0], c[0])
    let maxy = Math.max(a[1], b[1], c[1])

    if(point.x < minx || point.x > maxx || point.y < miny || point.y > maxy) {
      return false
    }

    let dotRes = dot(triangle.normal, [0, 0, -1])
    if(dotRes < 0 || dotRes > 1) {
      return false
    }

    let lambda2 = dot(minus(c, a), cross(minus(p, q), minus(p, a))) / dot(minus(p, q), cross(minus(b, a), minus(c, a)))
    let lambda3 = -dot(minus(b, a), cross(minus(p, q), minus(p, a))) / dot(minus(p, q), cross(minus(b, a), minus(c, a)))
    if(lambda2 > 0 && lambda2 < 1 && lambda3 > 0 && lambda3 < 1) {
      let t = 1 - lambda2 - lambda3
      let z = t * a[2] + lambda2 * b[2] + lambda3 * c[2]
      if(z > -1 && z < 1) {
        return triangle.color
      }
    }
    return false
  }

  draw(triangle) {
    let _a = triangle.points[0]
    let _b = triangle.points[1]
    let _c = triangle.points[2]
    let a = castTo(numberMultiple(_a, _a[3]), 3)
    let b = castTo(numberMultiple(_b, _b[3]), 3)
    let c = castTo(numberMultiple(_c, _c[3]), 3)

    let pointa = new Point(a[0], a[1]).NDC(800, 600)
    let pointb = new Point(b[0], b[1]).NDC(800, 600)
    let pointc = new Point(c[0], c[1]).NDC(800, 600)

    this.ctx.moveTo(pointa.x, pointa.y)
    this.ctx.lineTo(pointb.x, pointb.y)
    this.ctx.lineTo(pointc.x, pointc.y)
    this.ctx.lineTo(pointa.x, pointa.y)
    this.ctx.stroke()

  }

  render() {
    let l = this.triangles.length
    for(let i = 0; i < l; i++) {
      this.draw(this.triangles[i])
    }

  }

  // render() {
  //   let l = this.triangles.length
  //   for(let i = 0; i < this.width; i++) {
  //     for(let j = 0; j < this.height; j++) {
  //       for(let k = 0; k < l; k++) {
  //         let color = this.intersect(i, j, this.triangles[k])
  //         if(color) {
  //           this.ctx.fillStyle = color
  //           this.ctx.fillRect(i, j, 1, 1)
  //         }
  //       }
  //     }
  //   }
  // }

}