exports.blogpage = (req, res) => {
    const fakedb = require('../../db.json');

    res.render('blog',{
        title: "SiteLand - Blog",
        blogitem: fakedb.blog
      })
}
