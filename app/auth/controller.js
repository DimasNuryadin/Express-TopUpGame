const Player = require('../player/model')

// Multer
const path = require('path')
const fs = require('fs')   // Untuk mengakses file system
const config = require('../../config')

module.exports = {
  signUp: async (req, res, next) => {
    try {
      const payload = req.body;

      // Jika ada file photo
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
            let player = await Player({
              ...payload,   // Copy payload
              avatar: filename
            })
            await player.save()

            delete player._doc.password;      // Menghapus data password pada json untuk ditampilkan di response

            res.status(201).json({ data: player })
          } catch (err) {
            if (err && err.name === "ValidationError") {
              return res.status(422).json({
                error: 1,
                message: err.message,
                fields: err.errors
              })
            }
            // Jika error lain tampilkan ini
            next(err)
          }
        })
      } else {
        let player = await Player(payload).save()
        delete player._doc.password;      // Menghapus data password pada json untuk ditampilkan di response

        res.status(201).json({ data: player })
      }

    } catch (err) {
      if (err && err.name === "ValidationError") {
        return res.status(422).json({
          error: 1,
          message: err.message,
          fields: err.errors
        })
      }
      // Jika error lain tampilkan ini
      next(err)
    }
  }
}