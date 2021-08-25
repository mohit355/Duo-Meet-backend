const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");

const port = process.env.PORT || 4000;
const app = express();
const server = http.createServer(app);

// imports routes
const routes = require("./app/routes");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Atlas DB connected");
  })
  .catch((err) => {
    console.log("error in connecting with local DB ", err);
  });

// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// routes middleware
app.use("/api", routes);

const io = (module.exports.io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
}));

const socketManager = require("./app/socketManager");
io.on("connection", socketManager);

// if (process.env.NODE_ENV === "production") {
//   // Serve any static files
//   app.use(express.static(path.join(__dirname, "client/build")));
//   // Handle React routing, return all requests to React app
//   app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "client/build", "index.html"));
//   });
// }

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
