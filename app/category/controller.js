// Bisnis Logic
module.exports = {
  index: async (req, res) => {
    try {
      res.render("admin/category/view_category") // Mengambil file dari folder views
    } catch (err) {
      console.log(err)
    }
  }
}