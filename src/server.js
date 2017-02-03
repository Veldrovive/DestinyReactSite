//import express from 'express'
//import path from 'path'

var path = require('path');
var express = require('express');

const https = require('https');
const fs = require('fs');

const app = express();

var mysql = require('mysql')

var connection = mysql.createConnection({
  host     : '127.0.0.1',
  port     : '3310',
  user     : 'root',
  password : 'root',
});

/*connection.connect();

connection.query('SELECT * FROM clanExtender.clanInfo', function(err, rows, fields) {
  console.log("Queried")
  if (err) throw err;

  console.log('The solution is: ', rows);
});

connection.end();*/
var options = {
    key: fs.readFileSync( './ssl/key.pem' ),
    cert: fs.readFileSync( './ssl/cert.pem' ),
};
var port = 3000

var server = https.createServer(options, app).listen(port, function(){
  console.log("Express server listening on port " + port);
});

app.use(express.static(__dirname + '/client'));
app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/client/index.html')))
