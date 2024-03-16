const mongoose = require('mongoose')
const transactionSchema = mongoose.Schema({
  historyVoucherTopup: {
    gameName: { type: String, require: [true, 'Nama game harus diisi'] },
    category: { type: String, require: [true, 'Kategori harus diisi'] },
    thumbnail: { type: String },
    coinName: { type: String, require: [true, 'Nama koin harus diisi'] },
    coinQuantity: { type: String, require: [true, 'Jumlah koin harus diisi'] },
    price: { type: Number },
  },

  historyPayment: {
    name: { type: String, require: [true, 'Nama harus diisi'] },
    type: { type: String, require: [true, 'Tipe pembayaran harus diisi'] },
    bankName: { type: String, require: [true, 'Nama bank harus diisi'] },
    noRekening: { type: String, require: [true, 'No rekening harus diisi'] },
  },

  name: {
    type: String,
    require: [true, "Nama harus diisi"],
    maxLength: [225, "Panjang nama harus antara 3 - 225 karakter"],
    minLength: [3, "Panjang nama harus antara 3 - 225 karakter"],
  },

  accountUser: {
    type: String,
    require: [true, "Nama akun diisi"],
    maxLength: [225, "Panjang nama harus antara 3 - 225 karakter"],
    minLength: [3, "Panjang nama harus antara 3 - 225 karakter"],
  },

  tax: {
    type: Number,
    default: 0,
  },

  value: {         // Total Harga
    type: Number,
    default: 0,
  },

  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },

  player: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Player'
  },
  historyUser: {
    name: { type: String, require: [true, 'Nama player harus diisi'] },
    phoneNumber: {
      type: String,
      require: [true, "Nama akun harus diisi"],
      maxLength: [13, "Panjang nama harus antara 9 - 13 karakter"],
      minLength: [9, "Panjang nama harus antara 9 - 13 karakter"],
    }
  },

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
}, { timestamps: true })  // Untuk menambah createdAt dan updateAt

module.exports = mongoose.model('Transaction', transactionSchema) // Transaction : nama collection