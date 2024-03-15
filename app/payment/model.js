const mongoose = require('mongoose')
const paymentSchema = mongoose.Schema({
  type: {
    type: String,
    require: [true, "Tipe pembayaran harus diisi!"]
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },
  banks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank'
  }]
}, { timestamps: true })  // Untuk menambah createdAt dan updateAt

module.exports = mongoose.model('Payment', paymentSchema) // Nominal : nama collection