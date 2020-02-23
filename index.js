const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/public'));


app.get('/safety',(req,response)=>
{
    fs.readFile('./html/our goal/safety.html', function (err, html) {
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

app.get('/efficiency',(req,response)=>
{
    fs.readFile('./html/our goal/efficiency.html', function (err, html) {
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

// app.get('/sustainability',(req,response)=>
// {
//    fs.readFile('./html/our goal/sustainability.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     else{
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }
//     });

// });


const PORT = process.env.PORT || 5000;
app.listen(PORT);
