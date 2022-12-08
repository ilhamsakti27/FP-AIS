const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser')
const app = express();
const corsConfig = {
  credentials: true,
  origin: true,
};
app.use(cors(corsConfig));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// app.use(cookieParser)

app.use(
  cookieSession({
    name: "jenius-session",
    secret: "COOKIE_SECRET", // should use as secret environment variable
    httpOnly: false,
    sameSite: 'strict'
  })
);

// database
const db = require("./app/models");
const Role = db.role;

//db.sequelize.sync();
// force: true will drop the table if it already exists
 db.sequelize.sync({force: false}).then(() => {
   console.log('Drop and Resync Database with { force: false }');
  //  initial();
 });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});

// routes
require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// function initial() {
//   Role.create({
//     id: 1,
//     name: "user",
//   });

//   Role.create({
//     id: 2,
//     name: "moderator",
//   });

//   Role.create({
//     id: 3,
//     name: "admin",
//   });
// }
