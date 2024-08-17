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

let cart_data = [

]


const opentBtn = document.getElementById('open_cart_btn');
const cart = document.getElementById('sidecart');
const closeBtn = document.getElementById('close_btn');
const backdrop = document.querySelector('.backdrop');
const itemsEl = document.querySelector('.items');
const cartItems = document.querySelector('.cart_items');
const itemsNum  = document.getElementById('item_num');
const subtotalPrice = document.getElementById('subtotal_price');



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


function addItemToCart(idx, itemId) {
    const foundItem = cart_data.find(
        (item) => item.id.toString() === itemId.toString()
    )
    if (foundItem) {
        increaseQyt(foundItem.id)
    } else {
        cart_data.push(ITEMS[idx])
    }
    // cart_data.push(ITEMS[idx]);
    updateCart();
    openCart()
}

function removeCartItem(itemId) {
    cart_data = cart_data.filter((item) => item.id != itemId);
    updateCart();
}

function renderItems() {
    ITEMS.forEach((item, idx) => {
        const itemEl = document.createElement('div')
        itemEl.classList.add('item')
        // itemEl.onclick = () => addItemToCart(idx, item.id);
        itemEl.innerHTML = `
                <img src="${item.image}" alt="">
                <button onclick="addItemToCart(${idx}, ${item.id})">Add To Cart</button> `
        itemsEl.appendChild(itemEl)
    });
}

// disply render cart item 





function increaseQyt(itemId) {
    cart_data = cart_data.map(item => item.id.toString() === itemId.toString()
     ? { ...item, qyt: item.qyt + 1 } : item);
     updateCart();
}
function decreaseQyt(itemId) {
    cart_data = cart_data.map(item => item.id.toString() === itemId.toString()
     ? { ...item, qyt: item.qyt > 1 ? item.qyt - 1 : item.qyt} : item);
     updateCart();
}

function calcItemNum(){
    let itemCount = 0;
    cart_data.forEach(item => itemCount += item.qyt);
    itemsNum.innerHTML = itemCount;
}

function calcSubtotalPrice(){
    let sub_total_price = 0;
    cart_data.forEach(item => sub_total_price += (item.price * item.qyt ));
    subtotalPrice.innerHTML = sub_total_price;

}
function renderCartItems() {
    cartItems.innerHTML = '';
    cart_data.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart_item');
        cartItem.innerHTML = `
         <div class="remove_item" onclick="removeCartItem(${item.id})">
                        <span>&times;</span>
                    </div>
                    <div class="item_img"><img src="${item.image}" alt=""></div>

                    <div class="item_details">
                        <p>${item.name}</p>
                        <strong>$${item.price}</strong>
                        <div class="qyt">
                            <span onclick="decreaseQyt(${item.id})">-</span>
                            <strong>${item.qyt}</strong>
                            <span onclick="increaseQyt(${item.id})">+</span>
                        </div>
                    </div>
        `;
        cartItems.appendChild(cartItem);
    })
}

function updateCart() {
    renderCartItems();
    calcItemNum();
    calcSubtotalPrice();
}