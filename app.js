import express from "express"
import bodyParser from "body-parser"
import Login from './contorar/login.js';
import Register from './contorar/register.js';
import mongodb from './database/mongo.js'
import cors from "cors"



const app = express();

app.use(cors())
app.use(bodyParser.json());
mongodb();

app.post('/api/register', Register);

app.post('/api/login', Login);

export default app

