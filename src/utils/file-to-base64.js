export default {
  readImgAsURL (data) {
    return new Promise((resolve, reject) => {
      const file = new FileReader()
      file.onload = () => {
        resolve(file.result)
      }
      file.onerror = () => {
        reject(file.result)
      }
      file.readAsDataURL(data)
    })
  }
}
