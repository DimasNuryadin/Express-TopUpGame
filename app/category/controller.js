module.exports = {
  index: async (req, res) => {
    try {
      // render file yang ada di folder view
      res.render('index', {
        title: 'Express TopUpGame'
      })
    } catch (err) {
      console.log(err)
    }
  }
}