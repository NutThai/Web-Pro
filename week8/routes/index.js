const express = require('express')
const router = express.Router()
var article = require('../article-db')

router.get('/', function(req, res, next) {
    let sea = req.query.search
    let arti = article.filter(x => x.title.toLowerCase().includes((sea || "").toLowerCase()))
    var data = { title: 'Express', article: arti || null}
    res.render('index', data)
})
router.get('/blog/:id', function(req,res,next){
    let blog = article.find(x=> x.id == req.params.id)
    var data = { title: 'Express', blog: blog}
    if(blog) res.render('detail', data)
    next("ไม่พบบทความ")
})
module.exports = router