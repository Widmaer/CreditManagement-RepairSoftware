var bcrypt  = require('bcrypt')
var User = require('../models/User')
var Client = require('../models/Client')
exports.login = async function(req,res){
  if(!req.user){
    res.json({
      error:true,
      message:"No user found"
    })
  }
  else{
    req.session.user = req.user;
    res.redirect('/clients')
  }
}
exports.register = async function(req,res){
  var username = req.body.username;
  var password = req.body.password;
  var email = req.body.email;
  if(!username||!password||!email){
    res.json({
      error:true,
      message:"Please enter all fields"
    })
  }
  else{
    var hash = await bcrypt.hash(password,10);
    var newUser = new User({
      username:username,
      password:hash,
      email:email,
    })
    await newUser.save()
    res.redirect('/login')
  }
}

exports.index = async function(req,res){
  if(!req.session.user){
    res.render('index')
  }
  else{
    res.redirect('/clients')
  }

}

exports.clients =async function(req,res){
  if(!req.session.user){
    res.redirect('/login')
  }
  else{
  var user = await User.findById(req.user._id).populate('clients')
  var clients = user.clients;
  res.render('client',{
    clients:clients
  })
}
}
exports.addClient = async function(req,res){
  var name = req.body.name;
  var description=req.body.description;
  var startDate=req.body.startDate;
  var program=req.body.program;
  var agent = req.body.agent;
  var email = req.body.email;
  var phone = req.body.phone;
  var status=req.body.status;
  var progress=req.body.progress;
  var newClient = new Client({
    name:name,
    description:description,
    startDate:startDate,
    program:program,
    Agent:agent,
    contactInfo:{
      email:email,
      phoneNo:phone
    },
    status:status,
    progress:progress,
    user:req.session.user._id,
  });
  var currentUser = await User.findById(req.session.user._id).populate('clients')
  currentUser.clients.push(newClient);
  await newClient.save();
  await currentUser.save();
  var clients = currentUser.clients;
  res.redirect('/clients')
}
