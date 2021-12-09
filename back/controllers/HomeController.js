exports.homepage = (req, res) => {
    res.render('home')
}
exports.homepageID = (req, res) => {
    console.log('id:', req.params.id)
  res.render("home",{
    PageId: req.params.id
  });
};