const Transaction = require('./model')

// Bisnis Logic Transaction
module.exports = {
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const transaction = await Transaction.find().populate('player');
      // console.log("player >>")
      // console.log(transaction)

      res.render("admin/transaction/view_transaction", {  // Mengambil file dari folder views
        transaction,      // Kirim data ke render views
        alert,
        name: req.session.user.name,
        title: "Halaman Pembayaran",
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/transaction')
    }
  },
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.query;

      await Transaction.findOneAndUpdate({ _id: id }, { status })
      req.flash('alertMessage', `Berhasil ubah status`)
      req.flash('alertStatus', 'success')
      res.redirect('/transaction')
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/transaction')
    }
  },
  viewDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const transaction = await Transaction.findOne({ _id: id }).populate('player');
      // console.log("transaction >>")
      // console.log(transaction)
      res.render('admin/transaction/detail', {
        name: req.session.user.name,
        title: "Halaman Pembayaran",
        transaction
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/transaction')
    }
  }
}