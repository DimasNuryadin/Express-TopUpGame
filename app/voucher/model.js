const mongoose = require('mongoose')
const voucherSchema = mongoose.Schema({
  name: {
    type: String,
    require: [true, "Nama kategori harus diisi!"]
  },
  status: {
    type: String,
    enum: ['Y', 'N'],       // Y: Active, N: Non Active
    default: 'Y'
  },
  thumbnail: {
    type: String,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,   // Untuk relasikan dengan collection Category
    ref: 'Category'                         // Ref diisi dengan nama collection yang mau di ambil
  },
  nominals: [{
    type: mongoose.Schema.Types.ObjectId,   // Untuk relasikan dengan collection Nominal
    ref: 'Nominal'                         // Ref diisi dengan nama collection yang mau di ambil
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,   // Untuk relasikan dengan collection User
    ref: 'User'                         // Ref diisi dengan nama collection yang mau di ambil
  },
})

module.exports = mongoose.model('Voucher', voucherSchema) // Voucher : nama collection