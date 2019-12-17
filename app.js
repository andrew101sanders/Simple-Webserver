const express = require('express');
const path = require('path');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const serveIndex = require('serve-index');
const app = express();
app.use(fileUpload());
app.get('/*', express.static(path.join(__dirname,'/files')));
app.get('/*', serveIndex(path.join(__dirname, '/files'),{'icons': true}));


app.post('/u', function(req, res){
    if(!req.files){
        res.send('oh dang that didn\'t work!');
    }
    else{
        let uploadedfile = req.files.thefile;
        res.send('<p>you uploaded: '+uploadedfile.name+'<p>');
        fs.writeFile(path.join(__dirname, '/files/'+uploadedfile.name), uploadedfile.data, function(err){
            if (err) console.log(err);
        });
        console.log(uploadedfile);
    }
    
});

app.get('/u', function(req, res){
    res.sendFile(path.join(__dirname, '/index.html'));
});

app.listen(80);