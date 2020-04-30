const http = require('http');
const app = require('./src/app');
const mongoose = require("mongoose");
require('dotenv').config();

const port = process.env.PORT;

const server = http.createServer(app);

mongoose
    .connect(`mongodb+srv://sir_gregg:${process.env.MONGO_ATLAS_PW}@tutor-app-rxsot.mongodb.net/test?retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => console.log("Successfully connect to MongoDB."))
    .catch(err => console.error("Connection error", err));

server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));