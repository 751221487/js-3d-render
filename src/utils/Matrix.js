export default {
  unit(dim) {
    let mat = []
    for(let i = 0; i < dim; i++) {
      let vector = new Array(dim).fill(0)
      vector[i] = 1
      mat.push(vector)
    }
    return mat
  },

  multiple(mat1, mat2) {
    if(mat1[0].length !== mat2.length) {
      throw new Error('matrix dim error')
    }
    let row = mat1.length, col = mat2[0].length, l = mat1[0].length
    let res = new Array(mat1.length).fill(new Array(col))
    for(let i = 0; i < row; i++) {
      for(let j = 0; i < col; j++) {
        for(let k = 0; k < l; k++) {
          res[i][j] = res[i][j] + mat1[i][k] * mat2[k][j];
        }
      }
    }
    return res
  },

  rotation(v, a) {
    function f1(i) {
      return Math.cos(a) + v[i] * v[i] * (1 - Math.cos(a))
    }

    function f2(i, j, k, symbol) {
      return v[i] * v[j] * (1 - Math.cos(a)) + symbol * v[k] * Math.sin(a)
    }

    return [
      [f1(0), f2(0, 1, 2, -1), f2(0, 2, 1, 1), 0],
      [f2(1, 0, 2, 1), f1(2), f2(1, 2, 0, -1), 0],
      [f2(2, 0, 1, -1), f2(2, 1, 0, 1), f1(3), 0],
      [0, 0, 0, 1]
    ]
  },

  translate(x, y, z) {
    return [
      [1, 0, 0, x],
      [0, 1, 0, y],
      [0, 0, 1, z],
      [0, 0, 0, 1]
    ]
  },

  scale(x, y, z) {
    return [
      [x, 0, 0, 0],
      [0, y, 0, 0],
      [0, 0, z, 0],
      [0, 0, 0, 1]
    ]
  },

  lookAt(vec) {

  },

  projection(angle, rate, near, far) {

  }

}