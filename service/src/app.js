const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const createError = require("http-errors");
const urlRouter = require("./routes/url");

const app = express();

app.use(logger("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/url", urlRouter);

app.use(function (req, res, next) {
  next({ status: 404 });
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res
    .status(err.status || 500)
    .send(
      req.app.get("env") === "development"
        ? { status: 500, ...err }
        : createError(err.status)
    );
});

module.exports = app;
