const mongoose = require('mongoose')
const categorySchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama kategori harus diisi!"]
  }
}, { timestamps: true })  // Untuk menambah createdAt dan updateAt

module.exports = mongoose.model('Category', categorySchema) // Category : nama collection