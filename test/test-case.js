// Define all product
var product = { codeProduct: 1, name: 'Lavender heart', price: 9.25 };
var product2 = { codeProduct: 2, name: 'Personalised cufflinks', price: 45.00 };
var product3 = { codeProduct: 3, name: 'Kids T-shirt', price: 19.95 };

describe("Basket", function() {

    // Define the object
    var basket = new Basket();
    
    beforeEach(function(){
        basket.reset();
    })
    
    describe("constructor", function() {

        it("should have an empty basket", function() {
          expect( basket.basket ).to.have.length( 0 );
        });

    });

    describe( "#add", function() {
        it("should throw if no item is passed in", function() {
            expect( basket.addProduct() ).to.equal( false );
        });

        it("should add the product into the basket", function() {
            basket.addProduct( product );
            expect( basket.basket ).to.have.length( 1 );
        });
    });
    
    describe( "#reset" , function(){
        it( "should reset the basket and return 0", function() {
            basket.addProduct( product2 );
            basket.addProduct( product2 );
            basket.addProduct( product );
            basket.reset();
            expect( basket.basket ).to.have.length( 0 );
        });
    });
    
    describe( "#remove", function() {
        
        it("should add the product into the basket", function() {
            basket.addProduct( product );
            basket.addProduct( product2 );
            expect( basket.basket ).to.have.length( 2 ) ;
        });
        
        it("should remove the product from the basket", function() {
            basket.addProduct( product );
            basket.addProduct( product2 );
            expect( basket.basket ).to.have.length( 2 ) ;
            basket.removeProduct( product2 );
            expect( basket.basket ).to.have.length( 1 ) ;
        });
    });
});

describe( "checkout", function() {
    // Define the object
    var basket = new Basket();
    var checkout = new Checkout();

    beforeEach(function(){
        basket.reset();
    });
    
    describe( "#constructor", function() {

        it("should have a price equal to 0", function() {
            expect( checkout.totalPrice ).to.equal( 0 );
        });
        
    });

    describe( "#checkout", function(){

        it( "should return a price (Int)", function() {
            expect( checkout.checkout( basket.basket ) ).to.be.a( 'number' );
        });

        it( "should take a basket as parameter and return the price : 89.32", function() {
            basket.addProduct( product2 );
            basket.addProduct( product2 );
            basket.addProduct( product );
            expect( checkout.checkout( basket.basket ) ).to.equal( 89.325 );
        });
        
        it( "should create a reduction for the 2 Lavender and then return the price : 96.15", function() {
            basket.addProduct( product2 );
            basket.addProduct( product2 );
            basket.addProduct( product );
            basket.addProduct( product );
            expect( checkout.checkout( basket.basket ) ).to.equal( 96.15 );
        });
        
        it( "should return the price : 45", function() {
            basket.addProduct( product2 );
            expect( checkout.checkout( basket.basket ) ).to.equal( 45 );
        });
        
        it( "should create the reduction for 5 Lavender and return the price : 42.5	", function() {
            basket.addProduct( product );
            basket.addProduct( product );
            basket.addProduct( product );
            basket.addProduct( product );
            basket.addProduct( product );
            expect( checkout.checkout( basket.basket ) ).to.equal( 42.5	 );
        });

    });
    
    describe( "#reduction", function(){

        it( "should return the reduction of : 1.50", function() {
            basket.addProduct( product );
            basket.addProduct( product );
            expect( checkout.reductionLavender( basket.basket ) ).to.equal( 1.50 );
        });
        
        it( "should return the reduction of : 9", function() {
            basket.addProduct( product2 );
            basket.addProduct( product2 );
            // Have to put manually the total price here since the total price is calculated elsewhere in the code
            checkout.totalPrice = product2.price + product2.price;
            expect( checkout.reduceAbove60( basket.basket ) ).to.equal( 9 );
        });
    });
    
});