const express = require("express");
const pool = require("../config");
const router = express.Router();

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
router.post('/:blogId/comments',async function(req, res, next){
    try{
        const[max] = await pool.query("SELECT MAX(id)+1`next_id` FROM comments")
        const[time] = await pool.query('SELECT CURRENT_TIMESTAMP `time`')
        const[rows] = await pool.query("INSERT INTO comments VALUE(?,?,?,?,?,?)",
        [max[0].next_id,req.params.blogId,req.body.comment, req.body.like, time[0].time , req.body.comment_by_id]);
        
        console.log(max[0])

        return res.json({message:"A new comment is added (ID: "+rows.insertId +")"})

    }
    catch(err){
        return next(err)
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
        await pool.query("DELETE FROM comments WHERE id = ?",
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