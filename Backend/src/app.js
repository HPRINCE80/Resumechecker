const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

// CORS setup — routes se pehle hona chahiye
app.use(cors({
  origin: 'https://resumechecker-1-vsad.onrender.com',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser()); // ye line uncomment aur properly add karo

/*require all the routes here*/
const authRouter = require('./routes/auth.routes');
const interviewRouter = require('./routes/interview.routes');

app.use('/api/auth', authRouter);
app.use('/api/interview', interviewRouter);
app.use('/api/resumes', require('./routes/resume.routes'));

module.exports = app;