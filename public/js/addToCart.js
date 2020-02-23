const btnAddToCart = document.querySelector('.btn-addToCart');
const quantityInput = document.querySelector('input[name="quantity"]');
const flowerIdInput = document.querySelector('input[name="flowerId"]')
const userIdInput = document.querySelector('input[name="userId"]');
const url = 'http://localhost:8080/api/carts';

const addToCart = async () => {
    const data = { 'userId': userIdInput.value, 'flowerId': flowerIdInput.value, 'quantity': quantityInput.value };
    const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    await response.json().then(data => {
        document.querySelector('.msg_success').innerHTML = `<h2>Order successfully!</h2>`;
        window.scrollTo(0, 0);
    });
}

btnAddToCart.addEventListener('click', addToCart);