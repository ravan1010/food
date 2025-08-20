// const express = require('express')
import express from 'express'
const dbconnection = require('./utils/db.cjs')
// import dbconnection from ''
var cookieParser = require('cookie-parser')
var cors = require('cors');
const admin_router = require('./router/admin_router.cjs')
const OG_router = require('./router/OG_router.cjs')
const getpost = require('./router/Ul.router.cjs')
const owner = require('./router/owner_router.cjs')
// const path = require('path');

import { fileURLToPath } from "url";
import { dirname } from "path";



const port = 5001;
const app = express()

app.use(express.urlencoded({extended:true, limit: '200mb'}))
app.use(express.json({ limit: '200mb' }))
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173', // your React app's origin
  credentials: true,               // allow cookies to be sent
  
}));

app.get('/', (req, res) => {
  res.send('connected')
})

app.use('/api', admin_router)
app.use('/api', OG_router)
app.use('/api', getpost)
app.use('/api', owner)


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);



app.use(express.static(path.join(__dirname, "../frontend/vite-project/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/vite-project/dist/index.html"));
}); 



dbconnection().then(() => {
   
}) 
 app.listen(port, () => {
        console.log(`server run at ${port} `)
    })
