exports.homepage = (req, res) => {  
  res.render('home',{
      title: "SiteLand - Home"
    })
}
// exports.homepageID = (req, res) => {
//     console.log('params', req.params.id)
//     res.render("home",{
//       PageId: req.params.id
//     });
// };