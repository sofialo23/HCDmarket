
//make delete button work

const cart = document.querySelector('#cart-content');
const cartContainer = document.querySelector('.cart-container tbody');
const emptyCartBtn = document.querySelector('#empty-cart');
const itemsList = document.querySelector('.cardscontainer');
let cartItems = []; 
const cartImg = document.querySelector('#carritoImg');


itemsList.addEventListener('click', addItem);
emptyCartBtn.addEventListener('click', () =>{
    clearCart();
    cartItems = []; 
} );


            //SHOWS OR HIDES THE CART CONTENT
cartImg.addEventListener('click', ()=>{
    if(cart.style.display === 'block'){
        cart.style.display = "none";
    }
    else{
        cart.style.display = "block";
    }
})
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
            <td><a href="#"class="delete-btn">X</a></td>
        `;
        cartContainer.appendChild(row);
    });
}
        //CLEAN THE CART TO AVOID DUPLICATES
function clearCart(){
    while(cartContainer.firstChild){
        cartContainer.removeChild(cartContainer.firstChild);
    }
}