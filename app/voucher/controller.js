const Voucher = require('./model')
const Category = require('../category/model')
const Nominal = require('../nominal/model')

// Multer
const path = require('path')
const fs = require('fs')   // Untuk mengakses file system
const config = require('../../config')


// Bisnis Logic Voucher
module.exports = {
  index: async (req, res) => {
    try {
      // Connect Flash
      const alertMessage = req.flash("alertMessage")  // Dapat dari app.js
      const alertStatus = req.flash("alertStatus")
      const alert = { message: alertMessage, status: alertStatus }

      const voucher = await Voucher.find()
        .populate('category')       // Populate Mengambil data dari collection category berdasarkan _id
        .populate('nominals');
      // console.log("voucher >> ")
      // console.log(voucher)
      res.render("admin/voucher/view_voucher", {  // Mengambil file dari folder views
        voucher,      // Kirim data ke render views
        alert,
        name: req.session.user.name,
        title: "Halaman Voucher",
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  },
  viewCreate: async (req, res) => {
    try {
      const category = await Category.find();
      const nominal = await Nominal.find();
      res.render("admin/voucher/create", {
        category,
        nominal,
        name: req.session.user.name,
        title: "Halaman Tambah Voucher",
      })
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  },
  // Create Voucher
  actionCreate: async (req, res) => {
    try {
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        // console.log("tmp_path >> ")
        // console.log(tmp_path)
        // console.log("originalExt >> ")
        // console.log(originalExt)
        // console.log("filename >> ")
        // console.log(filename)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)
        src.on('end', async () => {
          try {
            let voucher = await Voucher({ name, category, nominals, thumbnail: filename })
            await voucher.save()
            req.flash('alertMessage', "Data Voucher Berhasil ditambah!")
            req.flash('alertStatus', "success")
            res.redirect('/voucher')
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
          }
        })
      } else {
        let voucher = await Voucher({ name, category, nominals })
        await voucher.save()
        req.flash('alertMessage', "Data Voucher Berhasil ditambah!")
        req.flash('alertStatus', "success")
        res.redirect('/voucher')
      }

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  },
  // Edit Voucher
  viewEdit: async (req, res) => {
    try {
      const { id } = req.params;  // Ambil dari params
      const category = await Category.find();
      const nominal = await Nominal.find();
      const voucher = await Voucher.findOne({ _id: id })   // Cek data berdasarkan id
        .populate('category')       // Populate Mengambil data dari collection category berdasarkan _id
        .populate('nominals');
      res.render('admin/voucher/edit', {
        voucher,
        category,
        nominal,
        name: req.session.user.name,
        title: "Halaman Edit Voucher",
      })
      // console.log(voucher)
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  },
  actionEdit: async (req, res) => {
    try {
      const { id } = req.params;
      const { name, category, nominals } = req.body;

      if (req.file) {
        let tmp_path = req.file.path;
        let originalExt = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
        let filename = req.file.filename + '.' + originalExt;
        let target_path = path.resolve(config.rootPath, `public/uploads/${filename}`)

        const src = fs.createReadStream(tmp_path)
        const dest = fs.createWriteStream(target_path)

        src.pipe(dest)
        src.on('end', async () => {
          try {
            const voucher = await Voucher.findOne({ _id: id })
            let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
            // Jika filenya diupload maka hapus foto
            if (fs.existsSync(currentImage)) {
              fs.unlinkSync(currentImage)
            }

            await Voucher.findOneAndUpdate({
              _id: id
            }, { name, category, nominals, thumbnail: filename })

            req.flash('alertMessage', "Data Voucher Berhasil ditambah!")
            req.flash('alertStatus', "success")
            res.redirect('/voucher')
          } catch (err) {
            req.flash('alertMessage', `${err.message}`)
            req.flash('alertStatus', 'danger')
            res.redirect('/voucher')
          }
        })
      } else {
        await Voucher.findOneAndUpdate({
          _id: id
        }, { name, category, nominals })
        req.flash('alertMessage', "Data Voucher Berhasil diubah!")
        req.flash('alertStatus', "success")
        res.redirect('/voucher')
      }
    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  },
  // Delete Voucher
  actionDelete: async (req, res) => {
    try {
      const { id } = req.params;
      const voucher = await Voucher.findByIdAndDelete({ _id: id });

      let currentImage = `${config.rootPath}/public/uploads/${voucher.thumbnail}`;
      // Jika filenya diupload maka hapus foto
      if (fs.existsSync(currentImage)) {
        fs.unlinkSync(currentImage)
      }

      req.flash('alertMessage', "Data Voucher Berhasil dihapus!")
      req.flash('alertStatus', "success")
      res.redirect("/voucher")

    } catch (err) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  },

  // Ubah Status
  actionStatus: async (req, res) => {
    try {
      const { id } = req.params;
      let voucher = await Voucher.findOne({ _id: id })
      let status = voucher.status === "Y" ? "N" : "Y";

      await Voucher.findOneAndUpdate({ _id: id }, { status })
      req.flash('alertMessage', "Berhasil ubah status!")
      req.flash('alertStatus', "success")
      res.redirect("/voucher")
    } catch (error) {
      req.flash('alertMessage', `${err.message}`)
      req.flash('alertStatus', 'danger')
      res.redirect('/voucher')
    }
  }
}