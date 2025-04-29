const express = require('express');
const cors = require('cors');
const webRoutes = require('../routes/webRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', webRoutes);

module.exports = app;