import express from 'express';
import cors from "cors";
import authRoute from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"
import postRoute from "./routes/post.route.js"


const app = express();


// http://localhost:5173/
app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }))
app.use(express.json())
app.use(cookieParser())


app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/posts", postRoute)
app.use("/api/test", testRoute)




app.listen(8800, () => {
    console.log('Server is running on port 8800');
})