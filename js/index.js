const ITEMS = [
    {
        id: 1,
        name: "Iphone",
        price: 400,
        image: 'images/1png.png',
        qyt: 1,
    },
    {
        id: 2,
        name: "Iphone 2 ",
        price: 297.5,
        image: 'images/1png.png',
        qyt: 1,
    },
    {
        id: 3,
        name: "Iphone 3 ",
        price: 100,
        image: 'images/1png.png',
        qyt: 1,
    },
    {
        id: 1,
        name: "Iphone 4",
        price: 180,
        image: 'images/1png.png',
        qyt: 1,
    },
]

const cart_data = [

]


const opentBtn = document.getElementById('open_cart_btn');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');
const itemsEl = document.querySelector('.items');
const cartItems = document.querySelector('.cart_items');


opentBtn.addEventListener('click', openCart);
closeBtn.addEventListener('click', closeCart);
backdrop.addEventListener('click', closeCart);
renderItems()

renderCartItems()
function openCart() {
    cart.classList.add('open');

    backdrop.style.display = 'block'

    setTimeout(() => {
        backdrop.classList.add('show')
    }, 0)
}

function closeCart() {
    cart.classList.remove('open');
    backdrop.classList.remove('show');


    setTimeout(() => {
        backdrop.style.display = 'none'
    }, 500)
}


function addItemToCart(idx , itemId){
    const foundItem = cart_data.find(
        (item)=>item.id.toString() === itemId.toString()
    )
    if(foundItem){

    }else{
        cart_data.push(ITEMS[idx])
    }
    cart_data.push(ITEMS[idx]);
    updateCart();
    openCart()
}
function renderItems() {
    ITEMS.forEach((item , idx) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('item')
        itemEl.onclick = () => addItemToCart(idx);
        itemEl.innerHTML = `
                <img src="${item.image}" alt="">
                <button>Add To Cart</button> `
        itemsEl.appendChild(itemEl)
    });
}

// disply render cart item 

function renderCartItems(){
    cartItems.innerHTML = '';
    cart_data.forEach(item=>{
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.innerHTML = `
         <div class="remove_item">
                        <span>&times;</span>
                    </div>
                    <div class="item_img"><img src="${item.image}" alt=""></div>

                    <div class="item_details">
                        <p>${item.name}</p>
                        <strong>$${item.price}</strong>
                        <div class="qyt">
                            <span>-</span>
                            <strong>${item.qyt}</strong>
                            <span>+</span>
                        </div>
                    </div>
        `;
        cartItems.appendChild(cartItem);
    })
}

function updateCart(){
    renderCartItems();
}