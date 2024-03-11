const mongoose = require('mongoose')
const nominalSchema = mongoose.Schema({
  coinName: {
    type: String,
    require: [true, "Nama kategori harus diisi!"]
  },
  coinQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Nominal', nominalSchema) // Nominal : nama collection