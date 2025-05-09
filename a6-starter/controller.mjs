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
//Create using POST /orders
app.post("/orders", (req, res) => {
  if (!isValid(req)) {
    res.status(400).json(ERROR_INVALID_REQ);
  } else {
    const order = model.createOrder(req.body.company, req.body.quantity);
    res.status(201).json(order);
  }
});

//Read all using GET /orders (query parameter)
app.get("/orders/", (req, res) => {
  console.log(`query: ${req.query.company}`);

  let r_array = model.readOrders(req.query.company);
  res.status(200).json(r_array);
});

//Read one using GET /orders/:id (path parameter)
app.get("/orders/:id", (req, res) => {
  console.log(`params: ${req.params.id}`);

  let r_array = model.readOrder(req.params.id);

  if (r_array) {
    res.status(200).json(r_array);
  } else {
    res.status(404).json(ERROR_NOT_FOUND);
  }
});

//Update using PUT /orders/:id (path parameter) (quantity)
app.put("/orders/:id", (req, res) => {
  console.log(`params: ${req.params.id}`);
  console.log(`quantity: ${req.body.quantity}`);

  if (
    !(
      req.body.quantity &&
      Number.isInteger(req.body.quantity) &&
      req.body.quantity > 1
    )
  ) {
    res.status(400).json(ERROR_INVALID_REQ);
  } else {
    let r_array = model.updateOrder(req.params.id, req.body);

    if (r_array) {
      res.status(200).json(r_array);
    } else {
      res.status(404).json(ERROR_NOT_FOUND);
    }
  }
});
