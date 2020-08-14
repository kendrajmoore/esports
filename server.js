// Initialize express
const express = require('express');
const bodyParser = require("body-parser");
// Initialize express
const exphbs = require('express-handlebars');
const app = express();
const path = require('path');
const morgan = require("morgan");
const dotenv = require('dotenv').config()
//cookier-parser
const cookieParser = require("cookie-parser");
//delete, edit
const methodOverride = require("method-override");
const cors = require("cors");
const Handlebars = require('handlebars');
// Import function exported by newly installed node modules.
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const models = require('./db/models');


// Choose a port to listen on
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

//middleware
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

require('./controllers/events')(app, models);
require('./controllers/rsvps')(app, models);

  
// When connecting Handlebars to the Express app...
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
  // ...implement newly added insecure prototype access
  handlebars: allowInsecurePrototypeAccess(Handlebars)
  })
);

app.set('view engine', 'handlebars');
  
app.get("/", (req, res) => {
  res.render("homepage.handlebars");
});

app.get("*", (req, res) => {
  res.json({ message: "404" });
});




// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
}) 