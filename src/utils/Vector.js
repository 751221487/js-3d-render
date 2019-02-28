export default {
  length(vec) {
    let s = 0
    for(let i = 0; i < vec.length; i++) {
      s += vec[i] * vec[i]
    }
    return Math.sqrt(s)
  },

  add(vec1, vec2) {
    if(vec1.length !== vec2.length) {
      throw new Error('vector dim not equal')
    }
    let res = []
    for(let i = 0; i < vec1.length; i++) {
      res.push(vec1[i] + vec2[i])
    }
    return res
  },

  dot(vec1, vec2) {
    if(vec1.length !== vec2.length) {
      throw new Error('vector dim not equal')
    }
    let res = 0
    for(let i = 0; i < vec1.length; i++) {
      res += vec1[i] * vec2[i]
    }
    return res
  },

  cross(vec1, vec2) {
    if(vec1.length !== 3 || vec2.length !== 3) {
      throw new Error("vector cross dim not equal 3")
    }
    return [
      vec1[1] * vec2[2] - vec1[2] * vec2[1],
      vec1[2] * vec2[0] - vec1[0] * vec2[2],
      vec1[0] * vec2[1] - vec1[1] * vec2[0]
    ]
  }

}