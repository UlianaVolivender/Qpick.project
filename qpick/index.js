const products = {
    headphones: [
        { id: 1, name: 'Apple BY2 S8521', price: 100, rating: 4.7, photo: 'Image.png' },
        { id: 2, name: 'Apple', price: 500, rating: 4.7, photo: 'Image (4).png' },
        { id: 3, name: 'Apple', price: 200, rating: 4.7, photo: 'Image (5).png' },
    ],
    phones: [
        { id: 1, name: 'Iphone 14', price: 1500, rating: 4.7, photo: 'Image (6).png' },
        { id: 2, name: 'Iphone 13', price: 999, rating: 4.7, photo: 'Image (3).png' },
        { id: 3, name: 'Iphone X', price: 800, rating: 4.7, photo: 'Image (7).png' },
    ],
};

const cartItems = [];

const addFavoritesToggle = () => {
    document.querySelectorAll('.heart').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('heart-red')) {
                item.classList.remove('heart-red');
                item.innerHTML = 'favorite_border';
            } else {
                item.classList.add('heart-red');
                item.innerHTML = 'favorite';
            }
        });
    });
}

document.getElementById('cart-link').addEventListener('click', () => {
    const cart = document.getElementById('cart');

    cart.classList.toggle('invisible');

    console.log(cartItems)

    cart.innerHTML = cartItems.map(item => `<div>${item.name} - ${item.price}$</div>`).join('\n')
});

const cartCounter = document.getElementById('cart-counter')

const addCardCartClicks = () => {
    document.querySelectorAll('.cart-icon').forEach(item => {
        item.addEventListener('click', (event) => {
            const parentCard = event.target.closest('.card');
            const parentSectionId = parentCard.closest('.products-group-wrapper').id;

            const productGroupItems = products[parentSectionId];

            cartItems.push(productGroupItems.find(item => item.id.toString() === parentCard.id));

            cartCounter.innerHTML = cartItems.length.toString();
        });
    });
}

const loadProducts = () => {
    Object.entries(products).forEach(([key, values]) => {
        const section = document.getElementById(key);

        const sectionContent = `
            <div class="products-group">
                 ${values.map(value => getProductCard(value)).join('\n')}
            </div>`;

        section.innerHTML += sectionContent;
    });

    addFavoritesToggle();
    addCardCartClicks();
}

const getProductCard = (item) => {
    return `<div class="card earPods_card" id="${item.id}">
                <div class="cardHeartContainer">
                    <span class="material-icons heart-base heart">favorite_border</span>
                </div>
                <img src="${item.photo}" alt="${item.name}">
                <div class="cardInfo">
                    <div class="cardName">${item.name}</div>
                    <div class="carPrice">${item.price}$</div>
                </div>
                <div class="cart-footer">
                    <div class="rating-wrapper">
                        <span class="material-icons star-icon ">star</span>
                        <span class="rating">${item.rating}</span>                   
                    </div>
                  
                    <span class="material-icons cart-icon">add_shopping_cart</span>
                </div>
           </div>`
}

loadProducts();
