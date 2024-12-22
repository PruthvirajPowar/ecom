document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');

    // Sample data - this should come from your backend API
    const products = [
        {
            id: 1,
            name: 'Handmade Vase',
            price: '$50',
            image: 'https://via.placeholder.com/400',
        },
        {
            id: 2,
            name: 'Knitted Scarf',
            price: '$30',
            image: 'https://via.placeholder.com/400',
        },
        {
            id: 3,
            name: 'Wooden Bowl',
            price: '$40',
            image: 'https://via.placeholder.com/400',
        },
    ];

    // Dynamically render products
    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');
        productElement.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.price}</p>
            <button class="btn">Add to Cart</button>
        `;
        productGrid.appendChild(productElement);
    });

    // Cart functionality
    let cartCount = 0;
    const cartButton = document.querySelector('.cart');
    productGrid.addEventListener('click', e => {
        if (e.target.tagName === 'BUTTON') {
            cartCount++;
            cartButton.textContent = `Cart (${cartCount})`;
        }
    });
});
