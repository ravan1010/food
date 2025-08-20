import express from 'express';
import dbconnection from './utils/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import admin_router from './router/admin_router.js';
import OG_router from './router/OG_router.js';
import getpost from './router/Ul.router.js';
import owner from './router/owner_router.js';
import path from 'path';

import { fileURLToPath } from "url";
import { dirname } from "path";



const port = 5001;
const app = express()

app.use(express.urlencoded({extended:true, limit: '200mb'}))
app.use(express.json({ limit: '200mb' }))
app.use(cookieParser())

const allowedOrigins = [
  "http://localhost:5173",   // React dev
  "https://food-frontend-uxf6.onrender.com"         // another origin
];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (like Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true
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
app.get("/slug", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/vite-project/dist/index.html"));
}); 



dbconnection().then(() => {
      app.listen(port, () => {
            console.log(`server run at ${port} `)
        })
}) 
 
