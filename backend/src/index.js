import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'colors';

const PORT = process.env.PORT || 3002;
const app = express();
const corsOption = { origin: 'http://localhost:3000' };
app.use(cors(corsOption));


app.get('/test', (req, res) => {
  res.send('RESPONSE FROM ENTRANCE GRANTED');
});

app.get('/',(req,res) => {
res.send('Welcome to Entrance Granted');
});

app.listen(PORT, () =>
  console.log(
    `Server is listening in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow
      .bold
  )
);
