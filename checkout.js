import { products } from '../scripts/products.js';

// Select main elements
const container = document.querySelector('.checkout-container');
const displayMessage = document.querySelector('.message');

// Elements from right-hand Order Summary box
const shippingAmountElement = document.querySelector('.shipping-amount');
const subtotalElement = document.querySelector('.subtotal-row .payment-summary-money');
const totalElement = document.querySelector('.total-row .payment-summary-money');
const taxElement = document.querySelector('.tax-amount');

// generate html with js
let cartHTML = '';
products.forEach((product) => {
  cartHTML += `
  <div class="cart-item-container">
    <div class="cart-item-details-grid">
      <img class="product-image" src="${product.image}">
      <div class="cart-item-details">
        <div class="product-name">${product.name}</div>
        <div class="product-price">$${(product.priceCents).toFixed(2)}</div>
        <div class="product-quantity">
          <select class="quantity-selector">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
      </div>
      <div class="delivery-options">
        <div class="delivery-options-title">Choose a delivery option:</div>
        <select class="shipping-select">
          <option value="standard">Standard $3.99</option>
          <option value="express">Express $10.99</option>
        </select>
      </div>
    </div>
  </div>
  `;
});

container.innerHTML = cartHTML;

const quantitySelectors = document.querySelectorAll('.quantity-selector');
const shippingSelects = document.querySelectorAll('.shipping-select');

quantitySelectors.forEach((select) => {
  select.addEventListener('change', updateShippingSummary);
});

shippingSelects.forEach((select) => {
  select.addEventListener('change', updateShippingSummary);
});
//Update shipping summary (used in real time + on calculate)
function updateShippingSummary() {
  const cartItems = document.querySelectorAll('.cart-item-container');
  let totalShipping = 0;
  let subtotal = 0;

  cartItems.forEach((item) => {
    const price = Number(item.querySelector('.product-price').textContent.replace('$', ''));
    const quantity = Number(item.querySelector('.quantity-selector').value);

    subtotal += price * quantity;

    const shipping = item.querySelector('.shipping-select').value;
    const cost = shipping === 'standard' ? 3.99 : 10.99;
    totalShipping += cost;
  });
  // CALCULATE THE tax amount
    const tax = subtotal * 0.1; 
    const total = subtotal + totalShipping + tax;
  // Update right-hand shipping amount
  if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingAmountElement) shippingAmountElement.textContent = `$${totalShipping.toFixed(2)}`;
  if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
  if (totalElement) totalElement.textContent = `$${(subtotal + totalShipping).toFixed(2)}`;
}

// Change shipping updates immediately
document.querySelectorAll('.shipping-select').forEach((select) => {
  select.addEventListener('change', () => {
    updateShippingSummary();
  });



});
updateShippingSummary();
const placeOrderButton = document.querySelector('.place-order-button');

placeOrderButton.addEventListener('click', () => {
  // Check if message already exists to avoid duplicates
  let existingMessage = document.querySelector('.thank-you-message');
  if (!existingMessage) {
    const message = document.createElement('div');
    message.classList.add('thank-you-message');
    message.textContent = 'Thank you for purchasing!';
    
    placeOrderButton.insertAdjacentElement('afterend', message);
  }
});
