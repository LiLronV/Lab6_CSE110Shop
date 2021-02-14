// product-item.js
let itemArr = Array.apply(0, Array(22)).map(function () {}); // taken from stackoverflow to create null array of size 22, there is no id 0.
let shadow;
let cartNumber = document.getElementById('cart-count');
let num = 0;

class ProductItem extends HTMLElement {
  constructor(){
    super();
    
    shadow = this.attachShadow({ mode: 'open' });
  }

   connectedCallback(){  
    let productList = document.getElementById("product-list");
    let list = document.createElement('li');
    let img = document.createElement('img');
    let pTitle = document.createElement('p');
    let pPrice = document.createElement('p');
    let style = document.createElement('style');
    let button = document.createElement('button');
    
    list.setAttribute('class', 'product');
    img.setAttribute('width', '200');
    img.setAttribute('src', this.getAttribute('image'));
    img.setAttribute('alt', this.getAttribute('title'));
    pTitle.setAttribute('class', 'title');
    pPrice.setAttribute('class', 'price');

    pTitle.textContent = this.getAttribute('title');
    pPrice.textContent = this.getAttribute('price');
  
    button.textContent = 'Add to Cart';
    button.id = this.id;
        
    button.onclick = function() {
      itemArr = JSON.parse(localStorage.getItem('cart'));
      if(button.textContent == 'Add to Cart'){
        button.textContent = 'Remove from Cart';
        itemArr[button.id] = 1;
        num++;
        
      }
      else{
        button.textContent = 'Add to Cart';
        itemArr[button.id] = 0;
        num--;
      }
      cartNumber.innerText = num;
      localStorage.setItem('cart',JSON.stringify(itemArr));
    }
    
    list.appendChild(img);
    list.appendChild(pTitle);
    list.appendChild(pPrice);
    list.appendChild(button);
    
    style.textContent = `
    .price {
      color: green;
      font-size: 1.8em;
      font-weight: bold;
      margin: 0;
    }
    
    .product {
      align-items: center;
      background-color: white;
      border-radius: 5px;
      display: grid;
      grid-template-areas: 
      'image'
      'title'
      'price'
      'add';
      grid-template-rows: 67% 11% 11% 11%;
      height: 450px;
      filter: drop-shadow(0px 0px 6px rgb(0,0,0,0.2));
      margin: 0 30px 30px 0;
      padding: 10px 20px;
      width: 200px;
    }
    
    .product > button {
      background-color: rgb(255, 208, 0);
      border: none;
      border-radius: 5px;
      color: black;
      justify-self: center;
      max-height: 35px;
      padding: 8px 20px;
      transition: 0.1s ease all;
    }
    
    .product > button:hover {
      background-color: rgb(255, 166, 0);
      cursor: pointer;
      transition: 0.1s ease all;
    }
    
    .product > img {
      align-self: center;
      justify-self: center;
      width: 100%;
    }
    
    .title {
      font-size: 1.1em;
      margin: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .title:hover {
      font-size: 1.1em;
      margin: 0;
      white-space: wrap;
      overflow: auto;
      text-overflow: unset;
    }
  
    `

    shadow.appendChild(list);
    shadow.appendChild(style);

  }
}

customElements.define('product-item', ProductItem);