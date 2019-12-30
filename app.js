const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const serveIndex = require('serve-index');
const app = express();
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/',
    debug : true
}));
app.get('/*', express.static(path.join(__dirname,'/files')));
app.get('/*', serveIndex(path.join(__dirname, '/files'),{'icons': true}));


app.post('/u', function(req, res){
    if(!req.files){
        res.send('oh dang that didn\'t work!');
    }
    else{
        let uploadedfile = req.files.thefile;
	uploadedfile.mv(path.join(__dirname, '/files/'+uploadedfile.name), function(err) {
    	if (err)
      		return res.status(500).send(err);
  });
        res.send('<p>you uploaded: '+uploadedfile.name+'<p>');
    }
    
});

app.get('/u', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(80);