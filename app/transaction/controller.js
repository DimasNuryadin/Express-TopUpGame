const Transaction = require('./model')

// Bisnis Logic Transaction
module.exports = {
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const transaction = await Transaction.find();
      console.log("player >>")
      console.log(transaction)

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
}