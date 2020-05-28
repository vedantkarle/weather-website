const path = require("path");
const express = require("express");
const hbs = require("hbs");
const location = require("./utils/location");
const forecast = require("./utils/forecast");
const app = express();

const port = process.env.PORT || 3000;

const viewsPath = path.join(__dirname, "../views");
const partialsPath = path.join(__dirname, "../views/partials");
//  Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(path.join(__dirname, "../public")));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Vedant",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Vedant",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Vedant",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Address must be provided!",
    });
  }
  location(req.query.address, (error, { address } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(address, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }

      res.send({
        forecast: forecastData,
        address: req.query.address,
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vedant",
    errorMessage: "Help article not found!",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Vedant",
    errorMessage: "Page Not found",
  });
});

app.listen(port, () => {
  console.log("Server started on " + port);
});
