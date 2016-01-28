// Basket Object - This object is a classic Basket, you can add product, remove product or reset it

var Basket = function(){
    this.init();
};

Basket.prototype.init = function(){
    this.basket = [];
};

Basket.prototype.addProduct = function( product ){
    if( arguments.length === 0 ){
        return false;
    }
        
    this.basket.push( product );
};

Basket.prototype.reset = function( product ){
    this.basket = [];
};

Basket.prototype.removeProduct = function( product ){
    // Check if the product is in the basket.
    var index = findIndexByKeyValue( this.basket, 'name', product.name )
    // If found then remove it
    if (index > -1) {
        this.basket.splice(index, 1);
    }
};


// Checkout Object - This object receive a Basket calcul the total price and then check if there is a reduction or not.

var Checkout = function(){
    this.totalPrice = 0;
}

Checkout.prototype.checkout = function( basket ){
    var reduction;

    this.totalPrice = this.calculTotalAmount( basket );
    reduction = this.checkIfDropPrice( basket );
    
    return ( ( reduction === false ) ? this.totalPrice : this.totalPrice - reduction );
};

Checkout.prototype.calculTotalAmount = function( basket ){
    var total = 0;
    for (var i = 0; i < basket.length; i++) {
        total += basket[i].price
    }
    return total;
};

Checkout.prototype.checkIfDropPrice = function ( basket ) {
    
    var reduction = 0;
    
    // The +60 rule
    reduction += this.reduceAbove60( basket );
    // the Lavender rule
    reduction += this.reductionLavender( basket );
    
    return ( reduction === 0 ) ? false : reduction ;
};


/*
* I choose to put all reduction directly as function on the prototype of the checkout object but we could choose to pass 
* the function into the object in the constructor and call this function during the checkout. ( Seems that this is what you did in Ruby ).
*/

Checkout.prototype.reduceAbove60 = function( basket ){
    var reduction = 0;

    // Reduction above 60 Logic
    if( this.totalPrice > 60 ){
        reduction = this.totalPrice * (10/100);
    }
    return reduction;
};

Checkout.prototype.reductionLavender = function( basket ){
    var reduction = 0,
        nbrLavender = 0;
    // Lavender Reduction logic
    for (var i = 0; i < basket.length; i++) {
        if( basket[i].codeProduct === 1 ){
            nbrLavender++;
        }
    }
    if( nbrLavender >= 2 ){
        reduction += ( 0.75 * nbrLavender );
    }

    return reduction;
}

// Helper function
// It return the position in the array when it find the object, otherwise, it return -1
function findIndexByKeyValue( arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] == valuetosearch) {
            return i;
        }
    }
    return -1;
}
