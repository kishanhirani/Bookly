const express = require('express');
const bodyParser = require('body-parser');
const rootRouter = require('./routes/index.js')
const mongoose = require('mongoose')
const session = require('express-session')




const app = express();
mongoose.connect('mongodb+srv://kishanhirani79:Omen1234@cluster0.ip2jaux.mongodb.net/Bookly')
app.use(session({
    secret: "billa",
}))

app.use(bodyParser.json());

app.use('/api', rootRouter)

console.log('http://localhost:8080');


app.listen(8080);