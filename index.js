const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/public'));


app.get('/safety',(request,response)=>
{
    fs.readFile('./html/improve-safety.html', function (err, html) {
        if (err) {
            throw err;
        }
        else{
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }
        });

});

app.get('/ensure',(request,response)=>
{
    fs.readFile('./html/ensure-competency.html', function (err, html) {
        if (err) {
            throw err;
        }
        else{
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }
        });

});

app.get('/contact',(request,response)=>{

    fs.readFile('./html/contact.html', function (err, html) {
        if (err) {
            throw err;
        }
        else{
            response.writeHeader(200, {"Content-Type": "text/html"});
            response.write(html);
            response.end();
        }
        });

});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
