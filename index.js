const dbConnect = require("./db/dbConnect");
const userRouter = require("./router/userRouter");
const tesoRouter = require("./router/tesoRouter");
const express = require("express");
const app = express();
const http = require('http').Server(app);
const cors = require('cors');
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter);
app.use(tesoRouter);

dbConnect();

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
);
res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
);
next();
});

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000"
    }
});

require('./socket/rootSocket')(socketIO);

http.listen(PORT, async () => {
    console.log(`Server listening on ${PORT}`);
});