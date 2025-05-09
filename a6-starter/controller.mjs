import express from "express";
import * as model from "./model.mjs";

const ERROR_INVALID_REQ = { Error: "Invalid request" };
const ERROR_NOT_FOUND = { Error: "Not found" };
const PORT = 3000;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});

// Don't change or add anything above this line

/**
 *
 * @param {object} req
 * @returns
 */
function isValid(req) {
  // @param {string} company // >= 2 chars length
  // @param {number} quantity // cannot be zero
  if (!req.body.company) {
    console.log("no company");
    return false;
  }
  if (!req.body.quantity) {
    console.log("no quantity");
    return false;
  }
  if (!(typeof req.body.company === "string")) {
    console.log(`Company - ${req.body.company} - is not a string`);
    return false;
  }
  if (req.body.company.length < 2) {
    console.log("Company is less than 2 chars");
    return false;
  }
  if (!Number.isInteger(req.body.quantity)) {
    console.log("Quantity is not an integer");
    return false;
  }
  if (req.body.quantity <= 0) {
    console.log(`Quantity - ${req.body.quantity} - is less than 1`);
    return false;
  }
  //end of validation
  return true;
}

/**
 *
 */
app.post("/orders", (req, res) => {
  if (!isValid(req)) {
    res.status(400).json(ERROR_INVALID_REQ);
  } else {
    const order = model.createOrder(req.body.company, req.body.quantity);
    res.status(201).json(order);
  }
});

//TODO: Add code for other routes in the REST API
