var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

//USER  -  username, password, posts
var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    posts: [{
        
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
        
    }]
})

userSchema.plugin(passportLocalMongoose);// adds methods that come with passport-local-mongoose  to the Schema


module.exports = mongoose.model("User", userSchema);

var user = module.exports;



//User Model