const express = require("express");

const Handlebars = require("handlebars");
const expresshandlebars = require("express-handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const connectDB = require("./config/database");

const postRouter = require("./routes/posts");

// Khởi động app
const app = express();

// khởi động express handlebars
app.engine(
  "handlebars",
  expresshandlebars({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);
app.set("view engine", "handlebars");

// Khởi động bodyparser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Khởi động methodOverride middleware
app.use(methodOverride("_method"));

// Khởi động express middleware
app.use(express.json());

// kết nối cơ sở dữ liệu
connectDB();

// mốt số route cơ bản, có thể đưa vào một file riêng như postRouter
app.get("/", (req, res) => res.render("index"));
app.get("/about", (req, res) => res.render("about"));

app.use("/posts", postRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server khởi động tại PORT " + PORT);
});
