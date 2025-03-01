//---------------------------------------------signup page call------------------------------------------------------
exports.signup = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      //adding other variables
      var gender=post.gender;
      var country=post.country;
      var sport=post.sport
      var education=post.education;
      var age=post.age
      var email=post.email;
      //Image and Video:
      var profileImage = '';
      var profileVideo = '';

      //for testing purposes:
      //console.log(fname+" "+lname+" "+mob+" "+gender+" "+country+" "+sport+" "+education+" "+age+" "+email+" "+name+" "+pass);

      //if one or more of the fields is empty print an error:
      if(name == '' || pass == '' || fname == '' || lname == ''|| mob == ''|| gender == '' || country == '' || sport == '' || education == '' || age == '' || email == ''){
         message="error";
         res.render('signup.ejs',{message: message});
      }
      else{
         var sql = "INSERT INTO `users`(`first_name`, `last_name`, `mob_no`, `gender`, `country`, `sport`, `education`, `age`, `email`, `user_name`, `password`, `profile_image`, `profile_video`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + gender + "','" + country + "','" + sport + "','" + education + "','" + age + "','" + email + "','" + name + "','" + pass + "','" + profileImage + "','" + profileVideo + "')";
         //previous query
         //var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`user_name`, `password`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + name + "','" + pass + "')";

         var query = db.query(sql, function(err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('signup.ejs',{message: message});
         }); 
      }

      

   } else {
      res.render('signup');
   }
};
 
//-----------------------------------------------login page call------------------------------------------------------
exports.login = function(req, res){
   var message = '';
   var sess = req.session; 

   //console.log(sess);

   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
     
      var sql="SELECT id, first_name, last_name, user_name FROM `users` WHERE `user_name`='"+name+"' and password = '"+pass+"'";  
      
      //second sql query to search for the coach:
      var sql2="SELECT id, first_name, last_name, user_name FROM `coaches` WHERE `user_name`='"+name+"' and password = '"+pass+"'";;

      //query:
      db.query(sql2, function(err, results){
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            //determines what user has signed in
            req.session.type = "coach";
            res.redirect('/home/dashboard');
         }
      });

      //query:
      db.query(sql, function(err, results){      
         if(results.length){
            req.session.userId = results[0].id;
            req.session.user = results[0];
            //determines what user has signed in
            req.session.type = "athlete";
            //for testing purposes
            //console.log(results[0].id);
            res.redirect('/home/dashboard');
         }
         else{
            //check if it is the coach login in:
            message = 'Wrong Credentials.';
            res.render('index.ejs',{message: message});//display the error message
         }
                 
      });
   } 
   else {
      res.render('index.ejs',{message: message});//Render the original sign-in page
   }
           
};
//-----------------------------------------------dashboard page functionality----------------------------------------------
           
exports.dashboard = function(req, res, next){
   var user =  req.session.user,
   userId = req.session.userId;
   var type = req.session.type;
   //dashboard testing purposes:
   //console.log('ddd='+userId);
   if(userId == null){
      res.redirect("/login");
      return;
   }
   if(type == "athlete"){
      var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'"; 
   }
   else if(type == "coach"){
      var sql="SELECT * FROM `coaches` WHERE `id`='"+userId+"'"; 
   }
   db.query(sql, function(err, results){
      res.render('dashboard.ejs', {user:user});
   });
};
//------------------------------------logout functionality----------------------------------------------
exports.logout=function(req,res){
   req.session.destroy(function(err) {
      res.redirect("/");//now this takes you back to the home page
   })
};
//--------------------------------render user details after login--------------------------------
exports.profile = function(req, res){
   var userId = req.session.userId;
   if(userId == null){
      res.redirect("/login");
      return;
   }

   if(req.session.type == "coach"){
      var sql="SELECT * FROM `coaches` WHERE `id`='"+userId+"'";
   }
   else{
      var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";       
   }
       
   db.query(sql, function(err, result){
      data = result;
      data[0].type = req.session.type;
      res.render('profile.ejs',{data});
   });
};
//---------------------------------edit users details after login----------------------------------
exports.editprofile=function(req,res){
   var userId = req.session.userId;
   //retrieve the user type
   //ternery operator to set it to null if it is not coach
   var type = (req.session.type == "coach")? "coach": "athlete";
   //console.log("Type: ",type)
   

   //if user doesnt exist:
      if(userId == null){
      res.redirect("/login");
      return;
   }
   //to specify the path
   const path=require('path');
   //path:
   let oneStepBack=path.join(__dirname,'../');

   //image file:
   let imageFile;
   let uploadPathImage;
   //video file:
   let videoFile;
   let uploadPathVideo;

   //No files:
   if(!req.files || Object.keys(req.files).length === 0){
      return res.status(400).send('No files were uploaded.')
   }
   //Both:
   else{
      if(req.files.imageFile != null){
         //just to see what the file looks like:
         imageFile = req.files.imageFile;
         //use mv() to upload
         uploadPathImage = (oneStepBack+'public/upload/'+imageFile.name)
         imageFile.mv(uploadPathImage, function(err){
            if(err)return res.status(500).send(err)})

         //sql command to update profile_image:
         if(type == "coach"){var sql2 = "UPDATE `coaches` SET `profile_image` ='"+imageFile.name+"' WHERE `id`='"+userId+"'";}
         else{
            var sql2 = "UPDATE `users` SET `profile_image` ='"+imageFile.name+"' WHERE `id`='"+userId+"'";
         }
         //query to render the page
         db.query(sql2, function(err,result){
         })
      }
      if(req.files.videoFile != null){
         videoFile = req.files.videoFile;
         //use mv() to upload
         uploadPathVideo = (oneStepBack+'public/upload/'+videoFile.name)
         videoFile.mv(uploadPathVideo, function(err){
            if(err)return res.status(500).send(err)})
         
         //sql command to update profile_video:
         if(type == "coach"){ 
            var sql3 = "UPDATE `coaches` SET `profile_video` ='"+videoFile.name+"' WHERE `id`='"+userId+"'"
         }
         else{
            var sql3 = "UPDATE `users` SET `profile_video` ='"+videoFile.name+"' WHERE `id`='"+userId+"'"
         }
         
         //query to render the page
         db.query(sql3, function(err,result){
         })
      }
      
      //query to render the page either way
      //we need 1 last sql query:
      if(type == "coach"){var sql="SELECT * FROM `coaches` WHERE `id`='"+userId+"'";}
      else{
         var sql="SELECT * FROM `users` WHERE `id`='"+userId+"'";
      }
      db.query(sql, function(err, results){
         results[0].type = type;
         res.render('profile.ejs',{data:results});
      });
   }
};



//---------------------------------------signup page call for coaches------------------------------------------------------
exports.signupCoach = function(req, res){
   message = '';
   if(req.method == "POST"){
      var post  = req.body;
      var name= post.user_name;
      var pass= post.password;
      var fname= post.first_name;
      var lname= post.last_name;
      var mob= post.mob_no;
      //adding other variables
      var sportClub = post.sportClub;
      var email=post.email;   
      //Image and Video:
      var profileImage = '';
      
      var profileVideo = '';//may get removed:

      //if one or more of the fields is empty print an error:
      if(name == '' || pass == '' || fname == '' || lname == ''|| mob == ''|| sportClub == '' || email == ''){
         message="error";
         res.render('signupCoach.ejs',{message: message});
      }
      else{
         //sql command to Insert the data into the table coaches
         var sql = "INSERT INTO `coaches`(`first_name`, `last_name`, `mob_no`, `sport_club`, `email`, `user_name`, `password`, `profile_image`, `profile_video`) VALUES ('" + fname + "','" + lname + "','" + mob + "','" + sportClub + "','" + email + "','" + name + "','" + pass + "','" + profileImage + "','" + profileVideo + "')";
         //var sql = "INSERT INTO `users`(`first_name`,`last_name`,`mob_no`,`gender`, `country`, `sport`, `education`, `age`, `email`, `user_name`, `password`, VALUES ('" + fname + "','" + lname + "','" + mob + "','" + gender + "','" + country + "','" + sport + "','" + education + "','" + age + "','" + email + "','" + name + "','" + pass + "','" + profileImage + "','" + profileVideo + "')";
         //upload the data
         var query = db.query(sql, function(err, result) {

            message = "Succesfully! Your account has been created.";
            res.render('signupCoach.ejs',{message: message});
         });
      }

      //otherwise re-render the sign-up page
   } else {
      res.render('signupCoach');
   }
};
//--------------------------------render Search For Athlete Page--------------------------------
exports.sap = function(req, res){
   message = '';
   //console.log("Test Length; ",list.length);
   //if req method is Post:
   if(req.method == "POST"){
      var searched = req.body.searched;
      //search for searched in the database:
      var sql ="SELECT* FROM `users` WHERE `first_name` ='"+searched+"'";
      db.query(sql, function(err, result){
         res.render('sap.ejs',{message:result});
      });
   }
   //otherwise:
   else{
      var userId = req.session.userId;
      if(userId == null){
         res.redirect("/login");
         return;
      }
      res.render('sap.ejs', {message});
   }  
}

//--------------------------------render Athlete Page in View Mode--------------------------------
exports.view_profile = function(req, res){
   message = '';
   const viewId = req.query.viewId;

   //db query to retrieve the user's data:
   var sql ="SELECT* FROM `users` WHERE `id` ='"+viewId+"'";
      db.query(sql, function(err, result){
         //render the viewProfile.ejs
         res.render('viewProfile.ejs',{data:result});
      });
};
