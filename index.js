require('dotenv').config();
const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthCookie, setUserInLocals } = require("./middlewares/authentication");
const app = express();
const port = process.env.PORT || 3000;
const Blog = require("./models/blog");

//DB connection
mongoose
  .connect(process.env.MONGO_URL)
  .then((e) => {
    console.log("Connected to database");
  })
  .catch((e) => {
    console.log("Error connecting to database");
  });

// view engine setup
app.set("view engine", "ejs");
app.set("views", path.resolve(__dirname, "views"));

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthCookie("token"));
app.use(setUserInLocals);
app.use(express.static(path.resolve(__dirname, "public")));
// routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);
app.get("/", async (req, res) => {
  const allBLogs = await Blog.find({})
  return res.render("home.ejs",{
    user:req.user,
    blogs:allBLogs,
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
