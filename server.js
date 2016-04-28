var express = require('express');
var app = module.exports = express();
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
var config = require('./config/config');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('dist'));

app.post('/api/comments', function(req, res, next) {
  var data = req.body;
  if (!data.message) return res.status(400).send({message: 'message required'});
  if (!data.email) return res.status(400).send({message: 'email required'});
  if (!data.name) return res.status(400).send({message: 'name required'});
  var mailOptions = {
    from: data.email,
    to: "canoebetonets@gmail.com",
    subject: "Nouveaux commentaires de " + data.name + "(" + data.email + ")",
    text: data.message
  };
  var transporter = nodemailer.createTransport(config);
  console.log("Trying to send mail...");
  transporter.sendMail(mailOptions, function(err, result) {
    if (err) {
      console.log(err);
      res.redirect('/');
    } else {
      console.log(result);
      res.redirect('/');
    }
    next();
  });
});

app.listen(3000);
console.log("Running on port 3000");
