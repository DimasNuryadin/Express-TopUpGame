const Nominal = require('./model')

// Bisnis Logic Nominal
module.exports = {
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const nominal = await Nominal.find()
      res.render("admin/nominal/view_nominal", {  // Mengambil file dari folder views
        nominal,      // Kirim data ke render views
        alert
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/nominal/create")
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  // Create Nominal
  actionCreate: async (req, res) => {
    try {
      const { coinName, coinQuantity, price } = req.body;
      let nominal = await Nominal({ coinName, coinQuantity, price })
      await nominal.save()

      req.flash('alertMessage', "Data Nominal Berhasil ditambah!")
      req.flash('alertStatus', "success")
      res.redirect('/nominal')

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  // Edit Nominal
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;  // Ambil dari params
      const nominal = await Nominal.findOne({ _id: id })   // Cek data berdasarkan id
      res.render('admin/nominal/edit', { nominal })
      // console.log(nominal)
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { coinName, coinQuantity, price } = req.body;
      await Nominal.findOneAndUpdate({
        _id: id
      }, { coinName, coinQuantity, price })

      req.flash('alertMessage', "Data Nominal Berhasil diubah!")
      req.flash('alertStatus', "success")
      res.redirect("/nominal")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  },
  // Delete Nominal
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Nominal.findByIdAndDelete({ _id: id });

      req.flash('alertMessage', "Data Nominal Berhasil dihapus!")
      req.flash('alertStatus', "success")
      res.redirect("/nominal")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/nominal')
    }
  }
}