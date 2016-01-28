// CODE ADD TO SUPPORT THE UI 

var basket = new Basket();
var checkout = new Checkout();

// Define all product
var product = { codeProduct: 1, name: 'Lavender heart', price: 9.25 };
var product2 = { codeProduct: 2, name: 'Personalised cufflinks', price: 45.00 };
var product3 = { codeProduct: 3, name: 'Kids T-shirt', price: 19.95 };

var lavender = document.querySelector('#lavender');
var cufflinks = document.querySelector('#cufflinks');
var tshirt = document.querySelector('#tshirt');
var productsDisplay = document.querySelector('.products-display');
var priceDisplay = document.querySelector('#price');
var checkoutBtn = document.querySelector('#checkout');
var resetBtn = document.querySelector('#reset');

lavender.addEventListener('click', function(e) {
    basket.addProduct( product );

    var element = document.createElement('li');
    element.textContent = 'Add ' + product.name + ' : ' + product.price ;
    productsDisplay.appendChild( element );
});

cufflinks.addEventListener('click', function(e) {
    basket.addProduct( product2 );

    var element = document.createElement('li');
    element.textContent = 'Add ' + product2.name + ' : ' + product2.price ;
    productsDisplay.appendChild( element );
});

tshirt.addEventListener('click', function(e) {
    basket.addProduct( product3 );

    var element = document.createElement('li');
    element.textContent = 'Add ' + product3.name + ' : ' + product3.price ;
    productsDisplay.appendChild( element );
});

checkoutBtn.addEventListener('click', function(e) {
    priceDisplay.textContent = checkout.checkout( basket.basket );
});

resetBtn.addEventListener('click', function(e) {
    
    basket.reset();
    // Reset display of products
    while (productsDisplay.firstChild) {
        productsDisplay.removeChild( productsDisplay.firstChild );
    }
    // Reset the price display
    priceDisplay.textContent = '0';
});