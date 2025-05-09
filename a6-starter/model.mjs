import database from "./data/database.mjs";
import Order from "./order.mjs";

/**
 *
 * @param {string} company
 * @param {number} quantity
 * @returns
 */
function createOrder(company, quantity) {
  const order = new Order(company, quantity);
  database.push(order);
  return order;
}

// Don't change anything above this line

//returns all orders or just company orders in an array
function readOrders(company) {
  let r_array = [];
  if (company) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].company === company) {
        r_array.push(database[i]);
      }
    }
  } else {
    for (let i = 0; i < database.length; i++) {
      r_array.push(database[i]);
    }
  }
  return r_array;
}

function readOrder(id) {
  let r_array = [];

  if (id) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].id === id) {
        r_array.push(database[i].company);
        r_array.push(database[i].quantity);
        r_array.push(database[i].id);
        r_array.push(database[i].date);

        return r_array;
      }
    }
  }
  return null;
}

function updateOrder(id, body) {
  let r_array = [];

  if (id) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].id === id) {
        //function only changes quantity of order for now
        database[i].quantity = body.quantity;

        r_array.push(database[i].company);
        r_array.push(database[i].quantity);
        r_array.push(database[i].id);
        r_array.push(database[i].date);

        return r_array;
      }
    }
  }
  return null;
}

//deletes a single order by id
function deleteOrder(id, body) {
  if (id) {
    for (let i = 0; i < database.length; i++) {
      if (database[i].id === id) {
        //remove order from database
        database.splice(database[i], 1);

        return true;
      }
    }
  }
  return null;
}

export { createOrder, readOrders, readOrder, updateOrder, deleteOrder };
