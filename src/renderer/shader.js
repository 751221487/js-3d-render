import { normalize, dot, numberMultiple, add, minus, reflect, castTo, negetive, multiple } from '../utils/Vector'
import { colorToRate, rateToColor } from '../utils/Math'

function ambientColor() {
  return [0.1, 0.1, 0.1]
}

function diffuseColor(norm, light, color) {
  let lightDir = normalize(light.dir)
  let diff = Math.max(dot(norm, lightDir), 0.0)
  return numberMultiple(multiple(color, light.diffuse), diff)
}

function specularColor(point, norm, light, camera) {
  let lightDir = normalize(negetive(light.dir))
  let viewDir = normalize(minus(camera.Position, point))
  let reflectDir = reflect(lightDir, norm)
  let spec = Math.pow(Math.max(dot(viewDir, reflectDir), 0.0), 32.0)
  return numberMultiple(light.specular, spec)
}

export function calcColor(point, normal, color, light, camera) {
  normal = castTo(normal, 3)
  color = colorToRate(color)
  let norm = normalize(normal)
  let ambient = ambientColor()
  let diffuse = diffuseColor(normal, light, color)
  let specular = specularColor(point, normal, light, camera)
  let resultColor = rateToColor(add(add(ambient, diffuse), specular))
  return `rgb(${parseInt(resultColor[0])}, ${parseInt(resultColor[1])}, ${parseInt(resultColor[2])})`
}