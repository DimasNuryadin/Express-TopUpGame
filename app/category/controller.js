const Category = require('./model')

// Bisnis Logic
module.exports = {
  // Get Category
  index: async (req, res) => {
    try {
      const category = await Category.find()
      res.render("admin/category/view_category", {  // Mengambil file dari folder views
        category      // Kirim data ke render views
      })
    } catch (err) {
      console.log(err)
    }
  },
  viewCreate: async (req, res) => {
    try {
      res.render("admin/category/create")
    } catch (err) {
      console.log(err)
    }
  },
  // Create Category
  actionCreate: async (req, res) => {
    try {
      const { name } = req.body;
      let category = await Category({ name })
      await category.save()

      res.redirect('/category')

    } catch (err) {
      console.log(err)
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
      console.log(err)
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      await Category.findOneAndUpdate({
        _id: id
      }, { name })
      res.redirect("/category")
    } catch (err) {
      console.log(err)
    }
  },
  // Delete Category
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      await Category.findByIdAndDelete({ _id: id });
      res.redirect("/category")
    } catch (err) {
      console.log(err)
    }
  }
}