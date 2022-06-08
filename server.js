if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express');
const app = express(); //*создали сервер через express()

// const dotenv = require("dotenv");
// dotenv.config();
const appRouter = require('./routes/index');
const mongoose = require('mongoose');


app.use(express.json()); //*для корректного получения данных в JSON-format
app.use(express.urlencoded({ extended: false })); //*для корректного получения данных в url-encoded format

app.use(express.static(__dirname + '/public'));

//todo Mongo connection

mongoose.connect(process.env.MONGO_URL)
const db = mongoose.connection
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Successfully connected to Database!'));

//todo end of Mongo connection
// app.get('*', (req, res) => {
//   res.sendFile(__dirname + '/client/public/index.html');
// })

app.use('/', appRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


