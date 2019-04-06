import { colorToRate } from '../utils/Math'

export default class DirectLight {
  constructor(diffuse, specular, direct) {
    this.diffuse = colorToRate(diffuse)
    this.specular = colorToRate(specular)
    this.dir = direct
  }
}