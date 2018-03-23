
/*Data Relationships like one to many, one to one, many to many, etc. */

//Embedding Data


var Connections = require("./models/connect");// Retrieving the Connect Model
var Post = require("./models/post"); //retrieving the Post Model
var User = require("./models/user");//retrieving the User Model





/*user.create({ // creates user named crash bandicoot
    email: "crash@bandicoot.com",
    name: "Crash Bandicoot"
})*/



/*Post.create({
    
    title: "Crash Nitro Kart",//creates post in post collection
    content: "The year was 2003"
    
}, function(err, Post){//closure function
    if(err){
        console.log(err);
    } else {
        console.log(Post)
    
    User.findOne({name: "Crash Bandicoot"}, function(err, User){//if no error find user with name crash bandicoot and push the post into the user's post collection
        if(err){
            console.log(err)
        } else {
            User.posts.push(Post)
            User.save(function(err,data){
                if(err){
                    console.log(err);
                }else {
                    console.log(data);
                }
            })
        }
    })
    }
})*/

//Find User
//Find all posts for that user

User.findOne({name: "Crash Bandicoot"}).populate("posts").exec(function(err,User){//find user named crash bandicoot in users collection in database and log to the console
    if(err){
        console.log(err);
    } else {
        console.log(User);
    }
    
    
});

