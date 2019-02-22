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
    
  }

}