const express = require('express');
const app = express();

const mongoose = require('mongoose');

require('dotenv').config();


app.use(express.json());

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { console.log("Connection to mongodb established")},
    err => { console.log("Failed to connect to mongodb", err)}
  );

const cors = require('cors');
app.use(cors({
  origin:['http://localhost:4200']
}))

const user = require('./routes/user.route');
const product = require('./routes/product.route');


app.use('/', express.static('files'));
app.use('/api/users', user)
app.use('/api/products', product)


app.use('/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
)

module.exports = app;
