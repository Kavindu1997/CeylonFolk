import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import {db} from './config/db.js'
import Routes from './routes/route.js';

const app=express();

app.use(express.json({ limit: '30mb',extended:true }));
app.use(express.urlencoded({ limit: '30mb',extended:true}));
app.use(cors());

app.use('/index',Routes);



const PORT=process.env.PORT || 5000;
app.listen(PORT,console.log(`Server running on port: ${PORT}`));