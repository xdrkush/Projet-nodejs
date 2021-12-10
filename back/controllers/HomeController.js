/*
 * Controller: Home
 * **************** */ 

exports.homepage = (req, res) => {
  const fakedb = require('../../public/data/db.json');
  
  if(process.env.ISADMIN == "false"){var admin = false}else{var admin = true}
  if(process.env.ISCONNECT == "false"){var sess = false}else{var sess = true}

  res.render('home', {
    title: "SiteLand - Home",
    session: sess,
    isAdmin: admin,
    blogitem: fakedb.blog
  })
}
// exports.homepageID = (req, res) => {
//     console.log('params', req.params.id)
//     res.render("home",{
//       PageId: req.params.id
//     });
// };