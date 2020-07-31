const express = require("express");
const routes = require("./routes/api");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// To use the routes exported from router in api.js we can use 'use' in nodejs.
// middleware is code that runs between req and res.
// method 'use' is used for middlewares.

// connect to mongodb.
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
});

/*
    Middleware - BodyParser.
    It can be used to access data passed in a req which we are unable
    to access through node or express. They don't have the functionality.
    BodyParser is used before app.use("/api", routes); as it the middleware
    will take the request, parse it and attach it to the req object.
*/

// bodyparser accepts different types of body forwards. here we are gonna accept json data.
app.use(bodyParser.json());
app.use("/api", routes);

// middleware for errorhandling. next from api.js will come to this middleware now.
app.use(function (err, req, res, next) {
    if (err) return;
}); // this is our own middleware function which can take upto 4 params.

// we pass req and res paramter in the callback function to send response to the frontend or send some data.
// we are making a get request (we means the browser) so the server needs to respond to it by sending some data.
// app.get("/api", function (req, res) {
//     res.send({
//         name: "Dharmang Gajjar",
//         age: 21,
//     });
//     // res.end();
// });

// listen for requests.
app.listen(3877, (req, res) => {
    console.log(req);
    console.log("listening on http://localhost:3877");
});
