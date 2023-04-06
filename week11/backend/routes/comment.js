const express = require("express");
const path = require("path")
const pool = require("../config");
const router = express.Router();

// Require multer for file upload
const multer = require('multer')
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads')
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })

// Get comment
router.get('/:blogId/comments',async function(req, res, next){
    try{
        const[rows,fields] = await pool.query("SELECT * FROM comments WHERE blog_id = ?",[req.params.blogId,]);
        
        // return json ของรายการ blogs
        
        return res.json(rows);
    
      } catch (err) {
        console.log(err)
        return next(err);
      }
});

// Create new comment
// router.post('/:blogId/comments',async function(req, res, next){
//     try{
//         const[max] = await pool.query("SELECT MAX(id)+1`next_id` FROM comments")
//         const[time] = await pool.query('SELECT CURRENT_TIMESTAMP `time`')
//         const[rows] = await pool.query("INSERT INTO comments VALUE(?,?,?,?,?,?)",
//         [max[0].next_id,req.params.blogId,req.body.comment, req.body.like, time[0].time , req.body.comment_by_id]);
        
//         console.log(max[0])

//         return res.json({message:"A new comment is added (ID: "+rows.insertId +")"})

//     }
//     catch(err){
//         return next(err)
//     }
    
// });

router.post('/:id/comments', upload.single('myImage'),async function(req, res, next){
    const conn = await pool.getConnection()
    // Begin transaction
    await conn.beginTransaction();
    const file = req.file
    try{
        let row = await conn.query("INSERT INTO comments(blog_id, comment,`like`, comment_date ,comment_by_id) VALUES(?, ?, 0,CURRENT_TIMESTAMP, null);",
        [req.params.id,req.body.comment]);
        if(file){
            await conn.query(
              "INSERT INTO images(blog_id, file_path, comment_id) VALUES(?, ?, ?);",
              [req.params.id, file.path.substr(6), row[0].insertId])
          }
        // console.log(max[0])
          
        await conn.commit()
        return res.redirect(`/blogs/${req.params.id}`,)
    }
    catch (err) {
        await conn.rollback();
        next(err);
      } finally {
        console.log('finally')
        conn.release();
      }
    
});

// Update comment
router.put('/comments/:commentId',async function(req, res, next){

    try{
        await pool.query("UPDATE comments SET blog_id = ?, comment = ?, comments.like = ?, comment_date = ?,comment_by_id = ? WHERE id = ?",
        [req.body.blog_id,req.body.comment,req.body.like, req.body.comment_date, req.body.comment_by_id,req.params.commentId]);

        return res.json({
            "message": "Comment ID "+req.params.commentId+" is updated.",
            "comment": {
              "comment": req.body.comment,
              "like": req.body.like,
              "comment_date": req.body.comment_date,
              "comment_by_id": req.body.comment_by_id,
              "blog_id": req.body.blog_id
            } //ดึงข้อมูล comment ที่เพิ่งถูก update ออกมา และ return ใน response กลับไปด้วย
        })
        // console.log(req.body.blog_id,req.body.comment,req.body.like, req.body.comment_date, req.body.comment_by_id,req.params.commentId)
    }
    catch(err){
        return next(err)
    }
    
});

// Delete comment
router.delete('/comments/:commentId', async function(req, res, next){
    try{
        await pool.query(`DELETE FROM comments WHERE id = ?`,
        [req.params.commentId]);

        return res.json({
            "message": "Comment ID "+req.params.commentId+" is deleted."
        })
        // console.log(req.body.blog_id,req.body.comment,req.body.like, req.body.comment_date, req.body.comment_by_id,req.params.commentId)
    }
    catch(err){
        return next(err)
    }
});

// Delete comment
router.put('/comments/addlike/:commentId',async function(req, res, next){
    try{
        const [sel] = await pool.query("SELECT blog_id, id, comments.like FROM comments WHERE id = ?",[req.params.commentId])
        await pool.query("UPDATE comments SET comments.like = ? WHERE id = ?",
        [++sel[0].like, req.params.commentId]);
        console.log(sel[0])
        return res.json({
            "blogId": sel[0].blog_id,
            "commentId": sel[0].id,
            "likeNum": sel[0].like
        })
        
        // console.log(req.body.blog_id,req.body.comment,req.body.like, req.body.comment_date, req.body.comment_by_id,req.params.commentId)
    }
    catch(err){
        return next(err)
    }
    
});


exports.router = router