const Category = require('./model')

// Bisnis Logic
module.exports = {
  // Get Category
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const category = await Category.find()
      res.render("admin/category/view_category", {  // Mengambil file dari folder views
        category,      // Kirim data ke render views
        alert
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/category')
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create")
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/category')
    }
  },
  // Create Category
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name })
      await category.save()

      req.flash('alertMessage', "Data Berhasil ditambah!")
      req.flash('alertStatus', "success")
      res.redirect('/category')

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/category')
    }
  },
  // Edit Category
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;  // Ambil dari params
      const category = await Category.findOne({ _id: id })   // Cek data berdasarkan id
      res.render('admin/category/edit', { category })
      // console.log(category)
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/category')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate({
        _id: id
      }, { name })

      req.flash('alertMessage', "Data Berhasil diubah!")
      req.flash('alertStatus', "success")
      res.redirect("/category")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/category')
    }
  },
  // Delete Category
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete({ _id: id });

      req.flash('alertMessage', "Data Berhasil dihapus!")
      req.flash('alertStatus', "success")
      res.redirect("/category")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/category')
    }
  }
}