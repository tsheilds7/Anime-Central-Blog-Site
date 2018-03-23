//App Config
var express         = require("express");
var app             = express();
var request         = require("request");
var bodyParser      = require("body-parser");
var exports         = require("exports");
var method          = require("method-override");
var mongoose        = require("mongoose");
var sanitizer       = require("express-sanitizer");
var passport        = require("passport");
var localStrategy   = require("passport-local");
var Post = require("./models/post"); //retrieving the Post Model
var User = require("./models/user");//retrieving the User Model
var Blog = require("./models/blog");//retrieving the BLog Model
var connect         = mongoose.connect("mongodb://localhost/blogdb");
app.use(bodyParser.urlencoded({extended: true}));
app.use(sanitizer());
app.use(express.static("public"));


app.set('view engine', "ejs");
app.use(method("_method"));
if(connect){
    
    console.log("success connected to the  Database");
    
}

else{
    
    console.log("failed");
    
}

app.use(require("express-session")({
    secret: "Spongebob",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());




/*
Blog.create({
    title: "The Legend of Zelda: Breath of the Wild",
    image: "https://en.wikipedia.org/wiki/The_Legend_of_Zelda:_Breath_of_the_Wild#/media/File:Breath_of_the_Wild_paraglide.jpg",
    body: "The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo. A part of The Legend of Zelda series, it was released for the Nintendo Switch and Wii U consoles on March 3, 2017. The story follows Link, who awakens from a hundred-year slumber to a mysterious voice that guides him to defeat Calamity Ganon before he can destroy the kingdom of Hyrule."
});
*/


//Routes

//Welcome Route
app.get('/', function(req,res){
    res.render('welcome');
})




//Auth Routes
//show sign up form

app.get('/register', function(req,res){
    res.render("register");
})

app.post('/register',function(req,res){
    req.body.username;
    req.body.password;
    User.register(new User({username: req.body.username}), req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render('register');
        }
        passport.authenticate("local")(req,res,function(){
           res.redirect('/secret');
        });
    });
});




//Secret/Confirmation Page
app.get('/secret',isLoggedIn, function(req,res){
    res.render("secret");
})



//Auth Routes
//Show login form
app.get('/login',function(req,res){
    res.render("login");
})


app.post('/login',passport.authenticate("local",{ successRedirect: '/secret', failureRedirect: 'login'}),function(req,res){
    
    
});





//Auth Routes
//Logout
app.get('/logout',function(req,res){
    req.logout();
    res.redirect('/');
});


//Middleware IsLoggedIn if not redirect to welcome Page
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect('/')
}



/* The Seven RESTful Routes */




//GET ROUTE(INDEX)
// HTTP Verb: GET  Action: Index
app.get('/users',isLoggedIn, function(req,res){
    User.find({}, function(err, users){
        
        if(err){
            console.log(err)
        } else {
            res.render('users', {users: users});
        }
        
    })
})

//GET ROUTE(INDEX)
// HTTP Verb: GET  Action: Index
app.get('/blogs',isLoggedIn, function(req,res){
    Blog.find({},function(err,blogs){
        
        if(err){
            console.log("Error");
        } else {
            res.render('index', {blogs: blogs});
        }
        
    })
})

//NEW ROUTE(NEW)
//Http Verb: GET Action: New
app.get('/blogs/new',isLoggedIn, function(req,res){
    
    res.render('new');
    
})



//CREATE ROUTE(CREATE)
//Http Verb: POST Action: Create
app.post('/blogs',isLoggedIn, function(req,res){
    req.body.blog.body = req.sanitize(req.body.blog.body);
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            
             res.redirect('/blogs');
            
        }
        
        
    })
   
    
})


//SHOW ROUTE SINGLE(SHOW)
//Http Verb: GET  Action: SHOW
app.get('/blogs/:id',isLoggedIn, function(req,res){
    
    Blog.findById(req.params.id, function(err, foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
            res.render('show', {blog: foundBlog});
        }
        
        
        
    })
    
    
})



//EDIT ROUTE(EDIT)
//Http Verb: GET Action: Edit
app.get('/blogs/:id/edit',isLoggedIn, function(req,res){
    
    Blog.findById(req.params.id, function(err,foundBlog){
        if(err){
            res.redirect('/blogs');
        } else {
             res.render("edit", {blog: foundBlog});
        }
        
    })

    
})


//UPDATE ROUTE(UPDATE)
//Http Verb: PATCH/PUT  Action: Update
app.put('/blogs/:id',isLoggedIn, function(req,res){
     req.body.blog.body = req.sanitize(req.body.blog.body);
   Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
       if(err){
           res.redirect("/blogs");
       } else {
           
           res.redirect("/blogs/" + req.params.id);
       }
       
       
   })
    
})

//DELETE ROUTE(DESTROY)
//Http Verb: DELETE  Action: Destroy
app.delete('/blogs/:id',isLoggedIn, function(req,res){
    Blog.findByIdAndRemove(req.params.id, req.body.blog, function(err){
        if(err){
            res.redirect("/blogs/" + req.params.id);
        } else {
            
            res.redirect("/blogs");
        }
    })
   
    
})


app.listen(process.env.PORT, process.env.IP, function(){
    console.log("The YelpCamp Server Has Started");
});