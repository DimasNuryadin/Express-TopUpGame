const Payment = require('./model')
const Bank = require('../bank/model')

// Bisnis Logic Payment
module.exports = {
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const payment = await Payment.find().populate("banks")
      res.render("admin/payment/view_payment", {  // Mengambil file dari folder views
        payment,      // Kirim data ke render views
        alert,
        name: req.session.user.name,
        title: "Halaman Pembayaran",
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  viewCreate: async (req, res) => {
    try {
      const banks = await Bank.find()
      res.render("admin/payment/create", {
        banks,
        name: req.session.user.name,
        title: "Halaman Tambah Pembayaran",
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  // Create Payment
  actionCreate: async (req, res) => {
    try {
      const { banks, type } = req.body;
      let payment = await Payment({ banks, type })
      await payment.save()

      req.flash('alertMessage', "Data Payment Berhasil ditambah!")
      req.flash('alertStatus', "success")
      res.redirect('/payment')

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  // Edit Payment
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;  // Ambil dari params
      const payment = await Payment.findOne({ _id: id })   // Cek data berdasarkan id
        .populate("banks")
      const banks = await Bank.find()
      res.render('admin/payment/edit', {
        payment,
        banks,
        name: req.session.user.name,
        title: "Halaman Edit Pembayaran",
      })
      // console.log(payment)
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { type, banks } = req.body;
      await Payment.findOneAndUpdate({
        _id: id
      }, { type, banks })

      req.flash('alertMessage', "Data Payment Berhasil diubah!")
      req.flash('alertStatus', "success")
      res.redirect("/payment")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  // Delete Payment
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Payment.findByIdAndDelete({ _id: id });

      req.flash('alertMessage', "Data Payment Berhasil dihapus!")
      req.flash('alertStatus', "success")
      res.redirect("/payment")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  },
  // Ubah Status
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const payment = await Payment.findOne({ _id: id })
      const status = payment.status === "Y" ? "N" : "Y";

      await Payment.findOneAndUpdate({ _id: id }, { status })
      req.flash('alertMessage', "Status Payment Berhasil diubah!")
      req.flash('alertStatus', "success")
      res.redirect("/payment")
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/payment')
    }
  }
}