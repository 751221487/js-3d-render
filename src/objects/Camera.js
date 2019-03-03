import { angle2Radian } from '../utils/Math'
import { cross, normalize, add } from '../utils/Vector'
import { lookAt, projection } from '../utils/Matrix'

export default class Camera {
  constructor() {
    this.Position = [1, 0, 4]
    this.Front = [0, 0, 0]
    this.Up = [0, 0, 0]
    this.Right = [0, 0, 0]
    this.WorldUp = [0, 1, 0]
    // Euler Angles
    this.Yaw = -90
    this.Pitch = 0
    // Camera options
    this.MovementSpeed = 1.0
    this.MouseSensitivity = 0.1
    this.updateVector()
  }

  setScene(scene) {
    this.scene = scene
    this.projection = projection(45, this.scene.width / this.scene.height, 0.1, 100)
  }

  getViewMatrix() {
    return lookAt(this.Position, add(this.Position, this.Front), this.Up);
  }

  updateVector() {
    let direction = [0, 0, 0]
    console.log(angle2Radian(this.Pitch), angle2Radian(this.Yaw))
    direction[0] = Math.cos(angle2Radian(this.Pitch)) * Math.cos(angle2Radian(this.Yaw));
    direction[1] = Math.sin(angle2Radian(this.Pitch))
    direction[2] = Math.cos(angle2Radian(this.Pitch)) * Math.sin(angle2Radian(this.Yaw));
    this.Front = normalize(direction)
    this.Right = normalize(cross(this.Front, this.WorldUp));
    this.Up = normalize(cross(this.Right, this.Front));
  }

  _update() {
    this.Yaw ++
    this.updateVector();
  }

}