import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "blogPosts",
  password: "WxmnYf!m6m",
  port: 5432
});

db.connect();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text({ extended: true }));

// Get all posts from database.
async function getPosts () {
    try {
        const result = await db.query("SELECT * FROM posts;");
        return result.rows;
    } catch (error) {
        console.error("Failed to get titles:", error.message);
    }
}

// Render homepage.
app.get("/", async (req,res) => {
    const posts = await getPosts();
    res.render("index.ejs", {posts: posts});
});

// Render startNewPosts.
app.get("/startNewPosts", async (req,res) => {
    const posts = await getPosts();
    res.render("startNewPosts.ejs", {posts: posts});
});

// Create a new post and insert it to database.
app.post("/newPost", async (req, res) => {
    try{
        const creat_date = new Date();

        const title = await db.query(
            "INSERT INTO posts (title, date_create, content) VALUES ($1, $2, $3) RETURNING title;", 
            [req.body.post_title, creat_date.toDateString(), req.body.post_content]
        );

        console.log('The file has been saved!');
        
        res.redirect("/viewPosts/" + title.rows[0].title);
    } catch (error) {
        console.error("Failed to get titles:", error.message);
    }
});

// View selected post.
app.get("/viewPosts/:name", async(req, res) => {
    const posts = await getPosts();
    
    try{
        const post = await db.query("SELECT * FROM posts WHERE title = $1;", [req.params.name]);
        res.render("viewPosts.ejs", { posts: posts, post: post.rows[0]});
    } catch (error) {
        console.error("Failed to get titles:", error.message);
    }
});

// Edit posted post.
app.post("/editPost", async (req, res) => {
    const posts = await getPosts();
    const post_id= Object.keys(req.body)[0];
    try{
        const post = await db.query("SELECT * FROM posts WHERE id = $1;", [post_id]);
        res.render("editPosts.ejs", { posts: posts, post: post.rows[0]});     
    } catch (error) {
        console.error("Failed to get titles:", error.message);
    }     
})

// Update posted post.
app.post("/repoPost", async (req, res) => {
    try{
        const result = await db.query("SELECT * FROM posts WHERE id = $1;", [req.body.post_id]);
        const prevPost = result.rows[0];
        const creat_date = new Date();
        let title;

        if (req.body.post_title !== prevPost.title && req.body.post_content !== prevPost.content) {
            title = await db.query(
                "UPDATE posts SET title=$1 ,date_create=$2, content=$3 WHERE id=$4 RETURNING title;", 
                [req.body.post_title, creat_date.toDateString(), req.body.post_content, req.body.post_id]
            );
        } else if (req.body.post_title === prevPost.title && req.body.post_content !== prevPost.content) {
            title = await db.query(
                "UPDATE posts SET date_create=$1, content=$2 WHERE id=$3 RETURNING title;", 
                [creat_date.toDateString(), req.body.post_content, req.body.post_id]
            );
        } else {
            title = await db.query(
                "UPDATE posts SET title=$1 ,date_create=$2 WHERE id=$3 RETURNING title;", 
                [req.body.post_title, creat_date.toDateString(), req.body.post_id]
            );
        }        

        console.log('The file has been saved!');
        
        res.redirect("/viewPosts/" + title.rows[0].title);
    } catch (error) {
        console.error("Failed to get titles:", error.message);
    }  
})

// Delete posted post.
app.post("/deletePost", async (req, res) => {  
    const post_id= Object.keys(req.body)[0];

    try{
        await db.query("DELETE FROM posts WHERE id = $1;", [post_id]);

        console.log('The file has been deleted!');
        res.redirect("/");
    } catch (error) {
        console.error("Failed to get titles:", error.message);
    }
});


app.listen(port, () => {
    console.log(`${port} is listening.`);
});