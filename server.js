const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");

const { format } = require('date-fns');
const helpers = require("./utils/helpers");

const withAuthHelper = require("./utils/auth");

const routes = require("./routes");
//test routes
// const allDataRoutes = require('./routes/apiRoutes/allDataRoutes');


const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;

// Create the Handlebars.js engine object with custom helper functions
const hbs = exphbs.create({
  helpers: helpers,
});

// Set up sessions with cookies
const sess = {
  secret: "Super secret secret",
  cookie: {
    maxAge: 24 * 60 * 60 * 1000, // expires after 1 day
    // maxAge: 10 * 1000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));




// Inform Express.js which template engine we're using
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);
//test routes
// app.use('/api', allDataRoutes);

//withauth helper
app.use(withAuthHelper);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started at http://localhost:${PORT}`)
  );
});