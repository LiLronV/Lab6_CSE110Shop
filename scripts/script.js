// Script.js
let productList;
let productItem;
let cartObj;

localStorage = window.localStorage;
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://fakestoreapi.com/products')
  .then(response => response.json())
  .then(data => {
    localStorage.setItem('products', JSON.stringify(data));
    
for(let i = 0; i < data.length; i++){
   productList = document.getElementById('product-list');
   productItem = document.createElement('product-item');
   productItem.setAttribute('title', data[i].title);
   productItem.setAttribute('image', data[i].image);
   productItem.setAttribute('price', '$' +data[i].price);
   productItem.setAttribute('id', data[i].id);
   productList.appendChild(productItem);
    }

    if (localStorage.getItem('cart')){
      cartObj = localStorage.getItem('cart');
      //console.log("pog");
      let cartArr2 = JSON.parse(cartObj);
      for(let i = 1; i < cartArr2.length;i++){
        if(cartArr2[i] == 1){
          document.getElementById(String(i)).shadowRoot.querySelector('button').innerText = 'Remove from Cart';
          num++;
        }
        
      }
      document.getElementById('cart-count').innerText = num;
    }
    

  })




});


