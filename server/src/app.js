const express =     require("express");
const bodyParser =  require("body-parser");
const morgan =      require("morgan");
const cors =        require("cors");

const app =         express();
const port = processes.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());

// Routes
// --- //

// Error Handlers
app.use((req, res, next) => {
  next({ status : 404, error : "Path not found." });
});

app.use((req, res, next) => {
  const error = {};

  error.status = err.status || 500;
  error.message = err.message || "Internal server error.",
  error.stack = err.stack;

  res.status(error.status).send(error);
});

// Start
function listener() {
  console.log(`Now listening on port: ${port}.`);
}

app.listen(listener);
