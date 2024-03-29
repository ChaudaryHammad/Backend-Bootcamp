const express = require("express");
const app = express();
const PORT = 5000;
const urlRoute = require("./routes/url");
const userRoute = require("./routes/user");
const staticRoute = require("./routes/staticRouter");
const { connectToMongo } = require("./connection");
const Url = require("./models/url");
const path = require("path");
const cookieParser = require("cookie-parser");
const {checkForAuthentication,restrictTo} = require("./middleware/auth")

app.use(cookieParser());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: false }));


app.use(express.json());
connectToMongo();


app.use(checkForAuthentication)
app.use("/",  staticRoute);

app.use("/url",restrictTo(['NORMAL',['ADMIN']]), urlRoute);

app.use('/user',userRoute)

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    }
  );

  // res.redirect(entry.redirectURL);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
