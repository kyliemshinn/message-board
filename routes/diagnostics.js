const diagnostics = require("express").Router();
const { v4: uuidv4 } = require("uuid");
const { readAndAppend, readFromFile } = require("../helpers/fsUtils");
const dataPackage = require("../db/diagnostics.json");

// GET Route for retrieving diagnostic information
diagnostics.get("/", (req, res) => {
  // TODO: Logic for sending all the content of db/diagnostics.json
  res.json(dataPackage);
});

// POST Route for a error logging
diagnostics.post("/", (req, res) => {
  // TODO: Logic for appending data to the db/diagnostics.json file
  console.log('hiiiii')
  const { tip, topic, username } = req.body;

  const newData = {
    time: 0,
    error_id: uuidv4(),
    errors: {
      tip,
      topic,
      username,
    },
  };
  
  //take diagnostic file and put the new data on it
  readAndAppend(newData, './db/diagnostics.json')

  const response = {
    status: "success",
    body: newData,
  };

  res.json(response)

});

module.exports = diagnostics;
