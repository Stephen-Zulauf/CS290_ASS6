import database from './data/database.mjs';
import Order from './order.mjs';


/**
 * 
 * @param {string} company 
 * @param {number} quantity 
 * @returns 
 */
function createOrder(company, quantity){
    const order = new Order(company, quantity)
    database.push(order)
    return order
}

// Don't change anything above this line

// TODO: Add code for other functions and export the functions so that the
// controller can call them


export {createOrder};