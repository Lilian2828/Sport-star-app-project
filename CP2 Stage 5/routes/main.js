module.exports = function(app, forumData) {
 // Search for Posts page
 app.get('/search',function(req,res){
    res.render("search.ejs", forumData);
});

// Search for Posts form handler
app.get('/search-result', function (req, res) {
    //searching in the database
    let term = '%' + req.query.keyword + '%'
    let sqlquery = `SELECT *
                    FROM   posts p
                    JOIN   topics t
                    ON     t.topic_id=p.topic_id
                    JOIN   users u
                    ON     p.user_id=u.user_id
                    WHERE  post_title LIKE ? OR post_content LIKE ? OR topic_title LIKE ? OR username LIKE ?`

    db.query(sqlquery, [term, term, term, term], (err, result) => {
        if (err) {
            res.redirect('./');
        }

      let data = Object.assign({}, forumData, {posts:result});
      console.log(data)
      res.render('viewposts.ejs', data);
    });      
});
}