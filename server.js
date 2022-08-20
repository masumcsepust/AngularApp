const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(__dirname + '/dist/angular-heroku-demo'));
app.get('/*', (req, res) => res.sendFile(path.join(__dirname+ '/dist/angular-heroku-demo')));
app.listen(PORT, () => console.log(`Listening on ${ PORT }`));