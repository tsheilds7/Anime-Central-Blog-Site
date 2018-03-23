
/*Data Relationships like one to many, one to one, many to many, etc. */

//Embedding Data




var Connections = require("./models/connect");
var Post = require("./models/post");
var User = require("./models/user");





/*var newUser = new user({
    
    email: "izuku@yahoo.com",
    name: "Izuku Midoriya",
    
    
})

newUser.posts.push({
    
     title: "All Might",
     content: "My favorite hero of all time is All Might" 
    
})

newUser.save(function(err,user){
    if(err){
        
        console.log("There was a problem!");
        
    } else {
        
        console.log(user);
        
    }
    
})*/


User.findOne({name: "Izuku Midoriya"}, function(err, User){
    if(err){
        console.log(err);
    } else {
        User.posts.push({
            title: "Enemy",
            content: "My enemy is the League of Villians"
        })
        User.save(function(err,User){
             if(err){
        
        console.log("There was a problem!");
        
    } else {
        
        console.log(User);
        
    }
        })
    }
    
})





/*User.findOne({name: "Izuku Midoriya"}, function(err, User){
    if(err){
        console.log(err);
    } else {
        console.log(User);
    }
    
})*/


