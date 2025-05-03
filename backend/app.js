const express = require('express');
const cors = require('cors');
const petRoutes = require('./routes/petRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/pets', petRoutes);

module.exports = app;
