import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import dotenv from "dotenv"
import AuthRoute from "./routes/AuthRoutes.js"
import UserRoutes from "./routes/UserRoutes.js"
import PostRoute from "./routes/PostRoute.js"
import CommentRoute from "./routes/CommentRoute.js"
import UploadRoute from "./routes/UploadRoutes.js"
import StoryRoutes from "./routes/StoryRoutes.js"
import NotificationRoutes from "./routes/NotificationRoutes.js"
import cors from 'cors'
import { Server } from "socket.io"

//routes


const app = express()
const io = new Server({
    cors: true
});

//to serve images for public
app.use(express.static('public'));
app.use("/images", express.static("images"));

//middleware
app.use(bodyParser.json({ limt: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limt: '30mb', extended: true }))
app.use(cors())
dotenv.config()

const emailToSocketMapping = new Map();
const socketToEmailMap = new Map();



io.on('connection', socket => {
    console.log("new connection")
    socket.on("join-room", (data) => {
        const { roomId, emailId } = data;
        console.log("User ", emailId, " joined Room ", roomId)
        emailToSocketMapping.set(emailId, socket.id)
        socketToEmailMap.set(socket.id, emailId);
        socket.join(roomId)
        socket.emit("joined-room", { roomId })
        console.log("user requested for room ",roomId);
        socket.broadcast.to(roomId).emit("user-joined", { emailId })
    })

    socket.on("call-user", (data) => {
        const { emailId, offer } = data;
        const fromEmail = socketToEmailMap.get(socket.id);
        const socketId = emailToSocketMapping.get(emailId)
        socket.to(socketId).emit('incomming-call', { from: fromEmail, offer })
    })

    socket.on('call-accepted',(data)=>{
        const {emailId,ans}=data;
        const socketId=emailToSocketMapping.get(emailId);
        socket.to(socketId).emit('call-accepted',{ans});
    })
})


//database connection
mongoose.connect(process.env.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    app.listen(5000 || process.env.PORT, () => {
        console.log("Connected to Mongo successfully......" + 5000 || process.env.PORT);
    })
}).catch((e) => {
    console.log("error in database connection index.js")
    console.log(e);
})

const ioPort = process.env.ioPort

io.listen(ioPort, () => {
    console.log("Listening Socket.io at " + ioPort + " ....");
})



app.use('/auth', AuthRoute); //its meaning is that if you want to work on authentication route the you have to pass via "/auth"
app.use('/user', UserRoutes);
app.use('/post', PostRoute);
app.use('/upload', UploadRoute);
app.use('/CommentRoute', CommentRoute);
app.use('/StoryRoutes', StoryRoutes);
app.use('/NotificationRoutes', NotificationRoutes);