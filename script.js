// html elements
const allProducts = document.getElementById('all-products');
const mensProducts = document.getElementById('mens-products');
const womensProducts = document.getElementById('womens-products');
const jeweleryProducts = document.getElementById('jewelery-products');
const electronicProducts = document.getElementById('electronic-products');
const productEle = document.querySelector('#all-products > div');
const mensProductEle = document.querySelector('#mens-products > div');
const womensProductEle = document.querySelector('#womens-products > div');
const jeweleryProductEle = document.querySelector('#jewelery-products > div');
const electronicProductEle = document.querySelector('#electronic-products > div');
const productSection = document.querySelectorAll('#product-section button');
const cartBtn = document.getElementById('cart-btn');
const cartCount = document.getElementById('cart-count');



// event listeners
productSection[0].addEventListener('click', () => displayProducts('block', 'none', 'none', 'none', 'none'));
productSection[1].addEventListener('click', () => displayProducts('none', 'block', 'none', 'none', 'none'));
productSection[2].addEventListener('click', () => displayProducts('none', 'none', 'block', 'none', 'none'));
productSection[3].addEventListener('click', () => displayProducts('none', 'none', 'none', 'block', 'none'));
productSection[4].addEventListener('click', () => displayProducts('none', 'none', 'none', 'none', 'block'));


// callback functions
function displayProducts(a,b,c,d,e){
    allProducts.style.display = a;
    mensProducts.style.display = b;
    womensProducts.style.display = c;
    jeweleryProducts.style.display = d;
    electronicProducts.style.display = e;
    
}

// console.log(localStorage);
// localStorage.clear();

function addToCart(e, product) {
  e.preventDefault()
  if(localStorage.getItem(product.id)) {
    let obj = JSON.parse(localStorage.getItem(product.id))
    obj.count++;
    localStorage.setItem(product.id, JSON.stringify(obj));
    console.log(localStorage.getItem(product.id),obj.count);
    
    localStorage.setItem(product.id, localStorage.getItem(product.id));
    return
  }else{
    product.count = 1;
  }
  let str = JSON.stringify(product);
  
  localStorage.setItem(product.id, str);
    getCartCount();
}


// fetch data through api
const fetchData = async () => {
    try{
        const resp = await fetch(`https://fakestoreapi.com/products`);
        const body = await resp.json();
        // const body = api;
        // console.log(body);
        getProducts(body);
    }
    catch(err){
        console.log(err);
    }
}

// display product info
const getProducts = products => {
    products.forEach((product, i) => {

        productEle.children.item(i).children.item(0).children.item(0).setAttribute('src', `${product.image}`);

        let {title} = product;
        title = title.slice(0,12) + '...';
        productEle.children.item(i).children.item(0).children.item(1).children.item(0).innerText = title;

        let {description:desc} = product;
        desc = desc.slice(0,90) + '...';
        productEle.children.item(i).children.item(0).children.item(1).children.item(1).innerText = desc;

        let {price} = product;
        price = '$ ' + price;
        productEle.children.item(i).children.item(0).children.item(2).children.item(0).innerText = price;


        productEle.children.item(i).children.item(0).children.item(3).children.item(0).addEventListener('click', (e)=>e.preventDefault());
        productEle.children.item(i).children.item(0).children.item(3).children.item(1).addEventListener('click', (e)=>addToCart(e,product));


        const {category} = product;
        if(category === "men's clothing") categoryProducts(mensProductEle, product.image, title, desc, price, product);
        if(category === "jewelery") categoryProducts(jeweleryProductEle, product.image, title, desc, price, product);
        if(category === "electronics") categoryProducts(electronicProductEle, product.image, title, desc, price, product);
        if(category === "women's clothing") categoryProducts(womensProductEle, product.image, title, desc, price, product);
    });
}

// increment sections products counts
const getCount = e => {
    if(e === mensProductEle) return mensCount++;
    if(e === womensProductEle) return womensCount++;
    if(e === jeweleryProductEle) return jeweleryCount++;
    if(e === electronicProductEle) return electronicCount++;
}

// display different section products
let mensCount = 0;
let womensCount = 0;
let jeweleryCount = 0;
let electronicCount = 0;
const categoryProducts = (e,a,b,c,d,p) => {
    let count = getCount(e);
    e.children.item(count).children.item(0).children.item(0).setAttribute('src', `${a}`);
    e.children.item(count).children.item(0).children.item(1).children.item(0).innerText = b;
    e.children.item(count).children.item(0).children.item(1).children.item(1).innerText = c;
    e.children.item(count).children.item(0).children.item(2).children.item(0).innerText = d;
    e.children.item(count).children.item(0).children.item(3).children.item(0).addEventListener('click', (el)=>el.preventDefault());
    e.children.item(count).children.item(0).children.item(3).children.item(1).addEventListener('click', (el)=>addToCart(el, p));
}


function getCartCount(){
  cartCount.innerText = localStorage.length;
  if(localStorage.length) {
    cartBtn.classList.remove('btn-outline-dark');
    cartBtn.classList.add('btn-dark');
  }
  else{
    if(cartBtn.classList.contains('btn-dark')) cartBtn.classList.add('btn-outline-dark')
  }
}
getCartCount();

  
// call fetch func
fetchData();