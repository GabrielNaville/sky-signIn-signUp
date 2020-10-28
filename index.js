const express = require ('express');
const mongoose = require ('mongoose');
const bodyparser = require ('body-parser');
const cookieParser = require ('cookie-parser');
const db = require ('./config/config').get(process.env.NODE_ENV);

const app = express ();

app.use(bodyparser.urlencoded({extended : false}));
app.use(bodyparser.json());
app.use(cookieParser());

mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);
mongoose.connect(db.DATABASE,  {useNewUrlParser: true, useUnifiedTopology: true}, function (err) {
    if (err) console.log(err);
    console.log('Database is connected');
})

require('./controller/authController')(app);
require('./controller/projectController')(app);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`App is ready at : ${PORT}`);
})