const express = require('express');
// const cookieParser = require('cookie-parser');
// const cors = require('cors');

const app = express(); 
app.use(express.json());

/*require all the routes here*/
const authRouter = require('./routes/auth.routes');

app.use('/api/auth', authRouter);

// Middleware to parse JSON requests
// app.use(cookieParser());


module.exports = app;