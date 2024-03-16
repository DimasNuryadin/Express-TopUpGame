const Transaction = require('../transaction/model')
const Voucher = require('../voucher/model')
const Player = require('../player/model')
const Category = require('../category/model')

// Bisnis Logic
module.exports = {
  index: async (req, res) => {
    try {
      // console.log(req.session.user)
      const transaction = await Transaction.find().count()
      const voucher = await Voucher.find().count()
      const player = await Player.find().count()
      const category = await Category.find().count()
      res.render("admin/dashboard/view_dashboard", { // Mengambil file dari folder views
        name: req.session.user.name,
        title: "Halaman Dashboard",
        count: {
          transaction,
          voucher,
          player,
          category
        }
      })
    } catch (err) {
      console.log(err)
    }
  }
}