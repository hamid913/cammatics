const express = require('express');
const app = express();
const fs = require('fs');

app.use(express.static(__dirname + '/public'));


app.get('/',(req,response)=>
{
    fs.readFile('./html/home-2.html', function (err, html) {
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
