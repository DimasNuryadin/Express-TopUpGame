// Bisnis Logic
module.exports = {
  index: async (req, res) => {
    try {
      // console.log(req.session.user)
      res.render("index", { // Mengambil file dari folder views
        name: req.session.user.name,
        title: "Halaman Dashboard",
      })
    } catch (err) {
      console.log(err)
    }
  }
}