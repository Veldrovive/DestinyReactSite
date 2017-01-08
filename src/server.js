//import express from 'express'
//import path from 'path'

var path = require('path');
var express = require('express');

const app = express();

app.use(express.static(__dirname + '/client'));
app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/client/index.html'))).listen(3000,() => console.log('Server on port 3000'))
