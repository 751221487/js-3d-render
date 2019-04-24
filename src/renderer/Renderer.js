import Point from '../utils/Point'
import { calcColor } from './shader'
import { add, minus, dot, cross, numberMultiple, castTo } from '../utils/Vector'

export default class Renderer {
  constructor(ctx, width, height) {
    this.ctx = ctx
    this.triangles = []
    this.lights = []
    this.width = width
    this.height = height
    this.deepMap = {}
  }

  addTraiangle(point1, point2, point3, normal, color) {
    this.triangles.push({
      points: [point1, point2, point3],
      normal: normal,
      color: color
    })
  }

  resetTriangle() {
    this.triangles = []
  }

  addLight(light) {
    this.lights.push(light)
  }

  intersect(x, y, triangle) {
    let point = new Point(x, y).clip(this.width, this.height)

    let o = [0, 0, 0]
    let _a = triangle.points[0]
    let _b = triangle.points[1]
    let _c = triangle.points[2]
    let a = numberMultiple(castTo(_a, 3), 1 / _a[3])
    let b = numberMultiple(castTo(_b, 3), 1 / _b[3])
    let c = numberMultiple(castTo(_c, 3), 1 / _c[3])
    let p = [point.x, point.y, 0]
    let q = [0, 0, 1]

    let minx = Math.min(a[0], b[0], c[0])
    let maxx = Math.max(a[0], b[0], c[0])
    let miny = Math.min(a[1], b[1], c[1])
    let maxy = Math.max(a[1], b[1], c[1])

    if(point.x < minx || point.x > maxx || point.y < miny || point.y > maxy) {
      return false
    }

    let dotRes = dot(castTo(triangle.normal, 3), q)
    if(dotRes < 0) {
      return false
    }

    let e1 = minus(b, a), e2 = minus(c, a), s = minus(p, a)
    let lambda2 = dot(s, cross(q, e2)) / dot(e1, cross(q, e2))
    let lambda3 = dot(q, cross(s, e1)) / dot(e1, cross(q, e2))
    if(lambda2 > 0 && lambda2 < 1 && lambda3 > 0 && lambda3 < 1 && (lambda2 +lambda3 < 1)) {
      let z = dot(s, cross(e1, e2)) / dot(e1, cross(q, e2))
      if(z > -1 && z < 1) {
        if(!this.deepMap[`${x},${y}`] || this.deepMap[`${x},${y}`] > z) {
          this.deepMap[`${x},${y}`] = z
          let color1 = numberMultiple(triangle.color[0], (1 - lambda2 - lambda3))
          let color2 = numberMultiple(triangle.color[1], lambda2)
          let color3 = numberMultiple(triangle.color[2], lambda3)
          let color = add(add(color1, color2), color3)
          return calcColor([point.x, point.y, z], triangle.normal, color, this.lights[0], this.scene.mainCamera)
        }
      }
    }
    return false
  }

  drawLine(_point1, _point2) {
    let point1, point2
    if(_point1[2] < _point2[2]) {
      point1 = _point1
      point2 = _point2
    } else {
      point1 = _point2
      point2 = _point1
    }
    let x1 = point1[0], x2 = point2[0]
    let y1 = point1[1], y2 = point2[1]
    let z1 = point1[2], z2 = point2[2]
    let vec = minus(point2, point1)
    this.ctx.strokeStyle = '#fff'
    if(z1 > 1 && z2 > 1) {
      return
    }
    if(z1 < -1 && z2 < -1) {
      return
    }
    if(z1 < -1 && z2 < 1) {
      let t = (1 + z1) / (z1 - z2)
      let p1 = new Point(point1[0], point1[1]).addVec(numberMultiple(vec, t)).NDC(this.width, this.height)
      let p2 = new Point(x2, y2).NDC(this.width, this.height)
      this.ctx.moveTo(p1.x, p1.y)
      this.ctx.lineTo(p2.x, p2.y)
      this.ctx.stroke()
      return
    }
    if(z1 < -1 && z2 > 1) {
      let t1 = (1 + z1) / (z1 - z2)
      let t2 = (1 - z1) / (z2 - z1)
      let p1 = new Point(point1[0], point1[1]).addVec(numberMultiple(vec, t1)).NDC(this.width, this.height)
      let p2 = new Point(point1[0], point1[1]).addVec(numberMultiple(vec, t2)).NDC(this.width, this.height)
      this.ctx.moveTo(p1.x, p1.y)
      this.ctx.lineTo(p2.x, p2.y)
      this.ctx.stroke()
      return
    }
    if(z1 > -1 && z1 < 1) {
      let p1 = new Point(x1, y1).NDC(this.width, this.height)
      let p2 = new Point(x2, y2).NDC(this.width, this.height)
      this.ctx.moveTo(p1.x, p1.y)
      this.ctx.lineTo(p2.x, p2.y)
      this.ctx.stroke()
      return
    }

    if(x1 > -1 && z2 > 1) {
      let t = (1 - z1) / (z2 - z1)
      let p1 = new Point(x1, y1).NDC(this.width, this.height)
      let p2 = new Point(point1[0], point1[1]).addVec(numberMultiple(vec, t)).NDC(this.width, this.height)
      this.ctx.moveTo(p1.x, p1.y)
      this.ctx.lineTo(p2.x, p2.y)
      this.ctx.stroke()
      return
    }

  }

  drawTriangle(triangle) {
    let _a = numberMultiple(triangle.points[0], 1 / triangle.points[0][3])
    let _b = numberMultiple(triangle.points[1], 1 / triangle.points[1][3])
    let _c = numberMultiple(triangle.points[2], 1 / triangle.points[2][3])
    let a = castTo(_a, 3)
    let b = castTo(_b, 3)
    let c = castTo(_c, 3)

    this.drawLine(a, b)
    this.drawLine(a, c)
    this.drawLine(b, c)
  }

  mode1() {
    let l = this.triangles.length
    for(let i = 0; i < l; i++) {
      this.drawTriangle(this.triangles[i])
    }
  }

  mode2() {
    let l = this.triangles.length
    for(let i = 0; i < this.width; i++) {
      for(let j = 0; j < this.height; j++) {
        for(let k = 0; k < l; k++) {
          let color = this.intersect(i, j, this.triangles[k])
          if(color) {
            this.ctx.fillStyle = color
            this.ctx.fillRect(i, j, 1, 1)
          }
        }
      }
    }
  }

  render() {
    // this.mode1()
    this.mode2()
  }

}