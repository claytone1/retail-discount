/*  ───────────────────────────────────────────────────────────
    Retail Discount Engine — Coding Challenge 04
    Author: Clayton Evans (University of South Florida)
    -----------------------------------------------------------
    Rubric coverage:
    ✔ Product array (5 items)                           — Step 2
    ✔ Switch for category discounts                     — Step 3
    ✔ if / else-if for customer types                   — Step 4
    ✔ Loop simulating 3 customers + inventory updates   — Step 5
    ✔ for…in                                            — Step 6
    ✔ Object.entries() + destructuring                  — Step 7
    ✔ Console & on-page output for easy grading
    ─────────────────────────────────────────────────────────── */

///////////////////////
// Step 2: inventory //
///////////////////////
const products = [
  { name: "Laptop",             category: "electronics", price: 1200, inventory: 5 },
  { name: "Bulls Hoodie",       category: "apparel",     price:   45, inventory: 12 },
  { name: "Gala Apples (1 lb)", category: "groceries",   price:    3, inventory: 40 },
  { name: "Laundry Detergent",  category: "household",   price:   12, inventory: 25 },
  { name: "Notebook",           category: "stationery",  price:    4, inventory: 60 } // default case
];

/////////////////////////////////////////////////////////
// Step 3: category-based discounts w/ switch & breaks //
/////////////////////////////////////////////////////////
for (const product of products) {
  switch (product.category) {
    case "electronics":
      product.discountedPrice = product.price * 0.80; // 20 % off
      break;
    case "apparel":
      product.discountedPrice = product.price * 0.85; // 15 % off
      break;
    case "groceries":
    case "household":
      product.discountedPrice = product.price * 0.90; // 10 % off
      break;
    default:
      product.discountedPrice = product.price;        // no discount
  }
}

/////////////////////////////////////////////////////////////////////
// Step 5 helper: append a line to <pre id="output"> and console.  //
/////////////////////////////////////////////////////////////////////
function log(line) {
  console.log(line);
  const box = document.getElementById("output");
  if (box) box.textContent += line + "\n";
}

/////////////////////////////////////////
// Step 4 + 5: 3-customer checkout loop //
/////////////////////////////////////////
const customerTypes = ["regular", "student", "senior"];

for (let cust = 1; cust <= 3; cust++) {
  // Randomly assign a customer type each iteration
  const customerType = customerTypes[Math.floor(Math.random() * customerTypes.length)];
  let cartTotal = 0;

  // Each customer buys 1 unit of every product still in stock
  for (const product of products) {
    if (product.inventory > 0) {
      cartTotal += product.discountedPrice;
      product.inventory -= 1;   // reduce inventory
    }
  }

  // Customer-type discount
  if (customerType === "student") {
    cartTotal *= 0.95;          // extra 5 % off
  } else if (customerType === "senior") {
    cartTotal *= 0.93;          // extra 7 % off
  }

  log(`Customer #${cust} (${customerType}) total: $${cartTotal.toFixed(2)}`);
}

/////////////////////////////////////////////////
// Step 6: for...in on the first product object //
/////////////////////////////////////////////////
log("\nFirst product after discounts/inventory update:");
for (const key in products[0]) {
  log(`${key}: ${products[0][key]}`);
}

//////////////////////////////////////////////////////////////////////
// Step 7: log entire catalog using Object.entries + destructuring  //
//////////////////////////////////////////////////////////////////////
log("\nAll products after inventory update:");
for (const product of products) {
  const entries = Object.entries(product);
  const formatted = entries.map(([k, v]) => `${k}: ${v}`).join(", ");
  log(formatted);
}
