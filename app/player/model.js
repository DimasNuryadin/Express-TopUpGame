const mongoose = require('mongoose')
const playerSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email harus diisi!"]
  },
  name: {
    type: String,
    require: [true, "Nama harus diisi"],
    maxLength: [225, "Panjang nama harus antara 3 - 225 karakter"],
    minLength: [3, "Panjang nama harus antara 3 - 225 karakter"],
  },
  username: {
    type: String,
    require: [true, "Username harus diisi"],
    maxLength: [225, "Panjang username harus antara 3 - 225 karakter"],
    minLength: [3, "Panjang username harus antara 3 - 225 karakter"],
  },
  password: {
    type: String,
    require: [true, "Password harus diisi!"],
    maxLength: [225, "Panjang password maksimal 225 karakter"],
  },
  phoneNumber: {
    type: String,
    require: [true, "Nomor telepon harus diisi!"],
    maxLength: [225, "Panjang nomor telepon harus antara 9 - 13 karakter"],
    minLength: [3, "Panjang nomor telepon harus antara 9 - 13 karakter"],
  },
  avatar: { type: String },
  fileName: { type: String },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  },
  status: {
    type: String,
    enum: ['Y', 'N'],
    default: 'Y'
  },

  favorite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
}, { timestamps: true })  // Untuk menambah createdAt dan updateAt

module.exports = mongoose.model('Player', playerSchema) // Nominal : nama collection