// Bisnis Logic
module.exports = {
  index: async (req, res) => {
    try {
      res.render("index", {     // Mengambil file dari folder views
        title: "Express Js"
      })
    } catch (err) {
      console.log(err)
    }
  }
}