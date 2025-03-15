const serverless = require("serverless-http");
const express = require("express");
const path=require("path");
const expressLayouts=require("express-ejs-layouts");
const bodyParser=require("body-parser");
const session=require('express-session');
const passport=require('passport');
const flash=require('connect-flash');
const mongoose=require('mongoose');
const connectDB=require('./initializeDb');

const app = express();

// Ensure database connection before processing requests
const startServer = async () => {

  app.get("/", (req, res) => {
    return res.status(200).json({
      message: "Hello from root!",
    });
  });

  app.get("/hello", (req, res) => {
    return res.status(200).json({
      message: "Hello from path!",
    });
  });

  app.get("/Initialize_db", async(req, res) => {

    const dbResponse=await connectDB();
    return res.status(200).json({
      status:dbResponse.status,
      message: dbResponse.message
    });
  });

  app.use((req, res) => {
    return res.status(404).json({
      error: "Not Found",
    });
  });
};

startServer();

module.exports.handler = async (event, context) => {
  context.callbackWaitsForEmptyEventLoop = false;

  return serverless(app)(event, context);
};