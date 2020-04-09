const saveCartBtn = document.querySelector('.saveCartBtn');
const quantityInputs = Array.from(document.querySelectorAll('.cartContainer input[type="number"]'));
const cartToTalPrice = document.querySelector('.cartToTalPrice');

const updateToTalPrice = function (e) {
    saveCartBtn.disabled = false;
    saveCartBtn.classList.replace('btn-dark', 'btn-primary');

    let totalPrice = 0;
    quantityInputs.forEach(quantityInput => {
        totalPrice += quantityInput.value * quantityInput.dataset.price;
    });
    cartToTalPrice.innerHTML = totalPrice;
}

const saveCart = async () => {
    let cart = quantityInputs.map(quantityInput => {
        return { 'flowerId': quantityInput.dataset.id, 'quantity': quantityInput.value };
    });
    const response = await fetch('/api/carts', {
        method: 'PUT',
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cart)
    });
    const responseData = await response.json();
    document.querySelector('.msg_success').innerHTML = `<h2>${responseData.message}!</h2>`;
    window.scrollTo(0, 0);
}

quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener('change', updateToTalPrice);
});

saveCartBtn.addEventListener('click', saveCart);

