const express = require("express");
const path = require("path");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const hbs = require("hbs");

// console.log(__dirname);
// console.log(path.join(__dirname, "../public"));

const port = process.env.PORT || 3000;

// Define path for Express Config
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (request, response) => {
  response.render("index", {
    title: "Weather App",
    name: "Andrew",
  });
});
app.get("/about", (request, response) => {
  response.render("about", {
    title: "About",
    name: "Andrew",
  });
});
app.get("/help", (request, response) => {
  response.render("help", {
    title: "Help",
    name: "Andrew",
  });
});

app.get("/products", (request, response) => {
  if (!request.query.search) {
    return response.send({
      error: "You must provide a search term",
    });
  }

  console.log(request.query.search);
  response.send({
    products: [],
  });
});
app.get("/weather", (request, response) => {
  if (!request.query.address) {
    return response.send({
      error: "You must provide a address term",
    });
  }
  geocode.geocode(
    request.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return response.send({ error });
      }
      forecast.forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return response.send({ error });
        }
        response.send({
          forecast: forecastData,
          location,
          address: request.query.address,
        });
      });
    }
  );
});

app.get("*", (request, response) => {
  response.render("404", {
    title: "404",
  });
});

// app.get("/help", (request, response) => {
//   response.send("Help Page!");
// });
// app.get("/about", (request, response) => {
//   response.send("About Page!");
// });

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
