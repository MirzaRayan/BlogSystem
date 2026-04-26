import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


import UserRouter from './src/routes/user.routes.js'

app.use('/api/user', UserRouter)



import PostRouter from './src/routes/post.routes.js'

app.use('/api/post', PostRouter)



export default app
