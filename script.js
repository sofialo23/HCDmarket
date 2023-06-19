
//make delete button work

const cart = document.querySelector('#cart-content');
const cartContainer = document.querySelector('.cart-container tbody');
const emptyCartBtn = document.querySelector('#empty-cart');
const itemsList = document.querySelector('.cardscontainer');
let cartItems = []; 
const cartImg = document.querySelector('#carritoImg');
const deleteBtn = document.querySelectorAll('.delete-btn');


itemsList.addEventListener('click', addItem);
        
        //DELETES ALL THE ELEMENTS FROM THE CART
emptyCartBtn.addEventListener('click', () =>{
    clearCart();
    cartItems = []; 
} );

            //SHOWS OR HIDES THE CART CONTENT
cartImg.addEventListener('click', () => {
    if(cart.style.display === 'block'){
        cart.style.display = "none";
    }
    else{
        cart.style.display = "block";
    }
});

        //DELETES THE SELECTED ELEMENT FROM THE CART
cartContainer.addEventListener('click', deleteItem);
    

        //DETECT WHERE WAS CLICKED AND GETS THE ELEMENT
function addItem(e){
    e.preventDefault();
    if(e.target.classList.contains('add-cart-btn')){
        const cardInfo = e.target.parentElement.parentElement.parentElement; 
        readItemInfo(cardInfo);
    }

}

function readItemInfo(card){
        //WE CHECK WHETHER THE ITEM SELECTED HAS ALREADY BEEN ADDED TO THE CART SO WE ONLY UPDATE THE AMOUNT
    const cardId = card.querySelector('button').getAttribute('data-id');
    const size = card.querySelector('.sizes').value;

    const exists = cartItems.some(el =>
        el.id === cardId && el.size === size);
            //ONLY MODIFY THE AMOUNT
    if(exists){ 
        const newArray = cartItems.map((el, i, arr)=>{
            if(el.id === cardId && el.size === size){ 
                arr[i].amount++;
                return el;
            }
            else{
                return el;
            }
        })
        cartItems = [...newArray];
       
    }       //CREATES A NEW ELEMENT
    else{
        const item = {
            id: card.querySelector('button').getAttribute('data-id'),
            image: card.querySelector('img').src,
            name: card.querySelector('.description h2').textContent,
            size:card.querySelector('.sizes').value,
            price: card.querySelector('.discount-price').textContent,
            amount: 1
        }
    
        cartItems = [...cartItems, item];
    }
   cartHTML();
}

        //DISPLAYS ELEMENTS IN THE CART
function cartHTML(){
    clearCart();
    cartItems.forEach(item =>{
        const{id, image, name, size, price, amount} = item;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><img src="${image}" width="100"</td>
            <td>${name}</td>
            <td>${size}</td>
            <td>${price}</td>
            <td>${amount} </td>
            <td><a href="#"class="delete-btn" data-id="${id}">X</a></td>
        `;
        cartContainer.appendChild(row);
    });
}


        //DELETES THE SELECTED ELEMENT FROM THE CART
function deleteItem(e){
    if(e.target.classList.contains('delete-btn')){
        const selectedId = e.target.getAttribute('data-id'); //get the id
        const selectedSize = e.target.parentElement.parentElement.querySelector(':nth-child(3)').textContent; //get the choosen size
        const newArray = cartItems.filter((el)=>{
            if(el.id !== selectedId){ 
                return el;
            }
            else if(el.size !== selectedSize){
                return el;
            }
        })
        cartItems = [...newArray];
        cartHTML();
    }
}


        //CLEAN THE CART TO AVOID DUPLICATES
function clearCart(){
    while(cartContainer.firstChild){
        cartContainer.removeChild(cartContainer.firstChild);
    }
}