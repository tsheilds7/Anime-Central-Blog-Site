var mongoose = require("mongoose");

var connect =mongoose.connect("mongodb://localhost/blog-demo_2");
module.exports = connect;

if(connect){
    console.log('Connected to Database');
} else {
    
    console.log('There was an error');
}






//Connect Model