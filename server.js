let express = require('express');

let app = express();

app.use(express.static(__dirname+'/dist/selise-masum-task'));

app.get('/*', (req,res) => {
    res.sendFile(__dirname+'/dist/selise-masum-task/index.html');
});

app.listen(process.env.PORT || 8080);