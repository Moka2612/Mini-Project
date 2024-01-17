// All button add qty
const buttonAdd = document.querySelectorAll(".btn-primary");

// All button minus qty
const buttonMinus = document.querySelectorAll(".btn-warning");

// All button delete row
const buttonDelete = document.querySelectorAll(".btn-danger");

// All Qty value
const qtyList = document.getElementsByClassName("form-control");

// All Record Row
const allRow = document.querySelectorAll(".table-group-divider tr");

// Increase Quantity
for (let i = 0; i < buttonAdd.length; i++) {
  buttonAdd[i].addEventListener("click", function () {
    let increase = parseInt(qtyList[i].innerText);

    increase += 1;

    qtyList[i].innerText = increase;

    updateTotal(increase, i);
  });
}

// Decreased Quantity
for (let i = 0; i < buttonMinus.length; i++) {
  buttonMinus[i].addEventListener("click", function () {
    let decrease = parseInt(qtyList[i].innerText);

    decrease -= 1;
    decrease = decrease > 0 ? decrease : 1;
    qtyList[i].innerText = decrease;

    updateTotal(decrease, i);
  });
}

// Delete Record Row
for (let i = 0; i < buttonDelete.length; i++) {
  buttonDelete[i].addEventListener("click", function () {
    allRow[i].remove();
  });
}

function updateTotal(qty, i) {
  //Price curent
  const priceCurrent = document.querySelectorAll(
    `tbody tr:nth-child(${i + 1}) td:nth-child(4) span`
  )[0].innerText;

  // Discount current
  const discountCurrent = document.querySelectorAll(
    `tbody tr:nth-child(${i + 1}) td:nth-child(5) span`
  )[0].innerText;

  // Tax current
  let taxCurrent = document.querySelectorAll(
    `tbody tr:nth-child(${i + 1}) td:nth-child(6) span`
  )[0];

  // Calculate tax
  const tax = Math.ceil(qty * priceCurrent * 0.125);

  // Update Tax
  taxCurrent.innerText = tax;

  //Total Calculate
  const Total = qty * priceCurrent - discountCurrent + +taxCurrent.innerText;

  // Update Total
  document.querySelectorAll(
    `tbody tr:nth-child(${i + 1}) td:nth-child(7) span`
  )[0].innerText = Total;

  let totalPrice = 0;
  let totalDiscount = 0;
  let totalTax = 0;

  // Query total price
  const allTotal = document.querySelectorAll("tbody tr td:nth-child(7) span");
  // Query total Tax
  const allTax = document.querySelectorAll("tbody tr td:nth-child(6) span");
  // Query total discount
  const allDiscount = document.querySelectorAll(
    "tbody tr td:nth-child(5) span"
  );

  //Total Price Calculate
  for (i = 0; i < allTotal.length; i++) {
    totalPrice += +allTotal[i].innerText;
  }
  // Update total price
  document.getElementById("total-price").innerText = totalPrice;

  //Total Discount Calculate
  for (i = 0; i < allDiscount.length; i++) {
    totalDiscount += +allDiscount[i].innerText;
  }
  // Update total discount
  document.getElementById("total-discount").innerText = totalDiscount;

  //Total Tax Calculate
  for (i = 0; i < allTax.length; i++) {
    totalTax += +allTax[i].innerText;
  }
  // Update total tax
  document.getElementById("total-tax").innerText = totalTax;
}
