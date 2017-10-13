module.exports = {
  loginUser: function (req, res){
    res.send(res.data('user'))
  }
}
