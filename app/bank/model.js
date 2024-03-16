const mongoose = require('mongoose')
const bankSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama pemilik harus diisi!"]
  },
  bankName: {
    type: String,
    require: [true, "Nama bank harus diisi!"]
  },
  noRekening: {
    type: String,
    require: [true, "Nomor rekening bank harus diisi!"]
  },
}, { timestamps: true })  // Untuk menambah createdAt dan updateAt

module.exports = mongoose.model('Bank', bankSchema) // Bank : nama collection