const User = require('./model')
const bcrypt = require('bcrypt')

// Bisnis Logic User
module.exports = {
  viewSignIn: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      if (req.session.user === null || req.session.user === undefined) {
        res.render("admin/users/view_signin", {  // Mengambil file dari folder views
          alert
        })
      } else {
        res.redirect('/dashboard')
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
    }
  },
  actionSignIn: async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await User.findOne({ email: email });

      if (check) {
        if (check.status === 'Y') {
          const checkPassword = await bcrypt.compare(password, check.password)
          if (checkPassword) {
            // Menyimpan session login
            req.session.user = {
              id: check._id,
              email: check.email,
              status: check.status,
              name: check.name,
            }
            res.redirect('/dashboard')
          } else {
            req.flash('alertMessage', `Kata sandi yang anda masukan salah`)
            req.flash('alertStatus', 'danger')
            res.redirect('/')
          }
        } else {
          req.flash('alertMessage', `Mohon maaf status anda belum aktif`)
          req.flash('alertStatus', 'danger')
          res.redirect('/')
        }
      } else {
        req.flash('alertMessage', `Email yang anda masukan salah`)
        req.flash('alertStatus', 'danger')
        res.redirect('/')
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/')
    }
  }
}