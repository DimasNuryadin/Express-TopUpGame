const Bank = require('./model')

// Bisnis Logic Bank
module.exports = {
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const bank = await Bank.find()
      res.render("admin/bank/view_bank", {  // Mengambil file dari folder views
        bank,      // Kirim data ke render views
        alert,
        name: req.session.user.name,
        title: "Halaman Bank",
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/bank/create", {
        name: req.session.user.name,
        title: "Halaman Tambah Bank"
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  // Create Bank
  actionCreate: async (req, res) => {
    try {
      const { name, nameBank, noRekening } = req.body;
      let bank = await Bank({ name, nameBank, noRekening })
      await bank.save()

      req.flash('alertMessage', "Data Bank Berhasil ditambah!")
      req.flash('alertStatus', "success")
      res.redirect('/bank')

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  // Edit Bank
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;  // Ambil dari params
      const bank = await Bank.findOne({ _id: id })   // Cek data berdasarkan id
      res.render('admin/bank/edit', {
        bank,
        name: req.session.user.name,
        title: "Halaman Edit Bank"
      })
      // console.log(bank)
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, nameBank, noRekening } = req.body;
      await Bank.findOneAndUpdate({
        _id: id
      }, { name, nameBank, noRekening })

      req.flash('alertMessage', "Data Bank Berhasil diubah!")
      req.flash('alertStatus', "success")
      res.redirect("/bank")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  },
  // Delete Bank
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Bank.findByIdAndDelete({ _id: id });

      req.flash('alertMessage', "Data Bank Berhasil dihapus!")
      req.flash('alertStatus', "success")
      res.redirect("/bank")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/bank')
    }
  }
}