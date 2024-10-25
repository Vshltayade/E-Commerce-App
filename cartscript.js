// html elements
const emptyCart = document.getElementById('empty-cart');
const productCart = document.getElementById('product-cart');
const cartItems = document.getElementById('cart-items');
const cardEx = document.getElementById('one-card');


// check if cart empty
if(localStorage.length) {
    emptyCart.style.display = 'none';
    productCart.style.display = 'block';
    displayInCart();
}
else {
    emptyCart.style.display = 'block';
    productCart.style.display = 'none';
}


console.log(localStorage);

function displayInCart(){
    for(let keys in localStorage){
        if(keys.length <= 2){
            let card = cardEx.cloneNode(true);
            let obj = JSON.parse(localStorage[keys]);
            card.removeAttribute('id');
            card.children.item(0).children.item(0).children.item(0).setAttribute('src', obj.image);
            card.children.item(0).children.item(1).children.item(0).children.item(0).innerText = obj.title;
            card.children.item(0).children.item(2).children.item(1).children.item(0).children.item(1).innerText = '$'+obj.price;
            cartItems.appendChild(card);
            
        }
    }
}
