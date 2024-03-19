const Voucher = require('../voucher/model')
const Category = require('../category/model')
const Bank = require('../bank/model')
const Payment = require('../payment/model')
const Nominal = require('../nominal/model')
const Transaction = require('../transaction/model')

module.exports = {
  landingPage: async (req, res) => {
    try {
      const voucher = await Voucher.find()
        .select('_id name status category thumbnail')
        .populate('category');

      res.status(200).json({ data: voucher })

    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  detailPage: async (req, res) => {
    const { id } = req.params;
    try {
      const voucher = await Voucher.findOne({ _id: id })
        .populate('category')
        .populate('nominals')
        .populate('user', '_id name phoneNumber');

      if (!voucher) {
        return res.status(404).json({ message: "Voucher game tidak ditemukan.!" })
      }

      res.status(200).json({ data: voucher })

    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  category: async (req, res) => {
    try {
      const category = await Category.find();
      res.status(200).json({ data: category })
    } catch (error) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  checkout: async (req, res) => {
    try {
      const { accountUser, name, nominal, voucher, payment, bank } = req.body;

      // Cek voucher
      const res_voucher = await Voucher.findOne({ _id: voucher })
        .select('name category _id thumbnail user')
        .populate('category')
        .populate('user')
      if (!res_voucher) return res.status(404).json({ message: "Voucher game tidak ditemukan" })

      // Cek nominal
      const res_nominal = await Nominal.findOne({ _id: nominal })
      if (!res_nominal) return res.status(404).json({ message: "Nominal game tidak ditemukan" })

      // Cek payment
      const res_payment = await Payment.findOne({ _id: payment })
      if (!res_payment) return res.status(404).json({ message: "Payment game tidak ditemukan" })

      // Cek bank
      const res_bank = await Bank.findOne({ _id: bank })
      if (!res_bank) return res.status(404).json({ message: "Bank game tidak ditemukan" })

      // Tax
      let tax = (10 / 100) * res_nominal._doc.price;
      let value = res_nominal._doc.price - tax;

      // Simpan semua data dalam payload
      const payload = {
        historyVoucherTopup: {
          gameName: res_voucher._doc.name,
          category: res_voucher._doc.category ? res_voucher._doc.category.name : '',
          thumbnail: res_voucher._doc.thumbnail,
          coinName: res_nominal._doc.coinName,
          coinQuantity: res_nominal._doc.coinQuantity,
          price: res_nominal._doc.price,
        },
        historyPayment: {
          name: res_bank._doc.name,
          type: res_payment._doc.type,
          bankName: res_bank._doc.bankName,
          noRekening: res_bank._doc.noRekening,
        },

        name: name,
        accountUser: accountUser,
        tax: tax,
        value: value,
        player: req.player._id,   // Dapat dari jwt
        historyUser: {
          name: res_voucher._doc.user?.name,
          phoneNumber: res_voucher._doc.user?.phoneNumber
        },

        category: res_voucher._doc.category?._id,
        user: res_voucher._doc.user?._id
      }

      // Jika semua data ada maka kirim data ke collection transaction
      const transaction = Transaction(payload)
      await transaction.save()

      res.status(201).json({
        data: payload,
      })

    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  history: async (req, res) => {
    try {
      const { status = "" } = req.query;

      let criteria = {}

      if (status.length) {
        criteria = {
          ...criteria,
          status: { $regex: `${status}`, $options: 'i' }
        }
      }

      if (req.player._id) {
        criteria = {
          ...criteria,
          player: req.player._id,   // Dapat dari jwt
        }
      }
      // console.log(criteria)

      const history = await Transaction.find(criteria);
      let total = await Transaction.aggregate([
        { $match: criteria },
        {
          $group: {
            _id: null,
            value: { $sum: "$value" }
          }
        }
      ])

      res.status(200).json({
        data: history,
        total: total.length ? total[0].value : 0
      })

    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  historyDetail: async (req, res) => {
    try {
      const { id } = req.params

      const history = await Transaction.findOne({ _id: id })
      if (!history) return res.status(404).json({ message: `History tidak ditemukan` })

      res.status(200).json({ data: history })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  dashboard: async (req, res) => {
    try {
      const count = await Transaction.aggregate([
        { $match: { player: req.player._id } },       // Mengambil transaction berdasarkan id player
        { $group: { _id: '$category', value: { $sum: '$value' } } }  // Group data berdasarkan kategori yang sama, lalu value dijumlahkan
      ])

      // Mencocokan id category dengan transaction, lalu name dimasukan ke dalam response
      const category = await Category.find();
      category.forEach(element => {
        count.forEach(data => {
          if (data._id.toString() === element._id.toString()) {
            data.name = element.name;   // Memasukan data name ke dalam count
            // console.log(data.name)
          }
        })
      })

      const voucher = await Transaction.find({ player: req.player._id })
        .populate('category')
        .sort({ 'updatedAt': -1 })
      res.status(200).json({ data: voucher, count })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  },

  profile: async (req, res) => {
    try {
      const player = {
        id: req.player._id,
        username: req.player.username,
        email: req.player.email,
        name: req.player.name,
        avatar: req.player.avatar,
        phoneNumber: req.player.phoneNumber,
      }
      res.status(200).json({ data: player })
    } catch (err) {
      res.status(500).json({ message: err.message || `Internal server error` })
    }
  }
}