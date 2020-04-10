const saveCartBtn = document.querySelector('.saveCartBtn');
const listDeleteCartBtn = Array.from(document.querySelectorAll('.deleteCartBtn'));
const quantityInputs = Array.from(document.querySelectorAll('.cartContainer input[type="number"]'));
const cartToTalPrice = document.querySelector('.cartToTalPrice');

const activeSaveButton = function () {
    saveCartBtn.disabled = false;
    saveCartBtn.classList.replace('btn-dark', 'btn-primary');
}

const deactiveSaveButton = function () {
    saveCartBtn.disabled = true;
    saveCartBtn.classList.replace('btn-primary', 'btn-dark');
}

const updateToTalPrice = function (quantityInputs) {
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
    deactiveSaveButton();
    document.querySelector('.msg_success').innerHTML = `<h2>${responseData.message}!</h2>`;
    window.scrollTo(0, 0);
}

const deleteCart = async (e) => {
    const response = await fetch(`/api/carts/${e.target.dataset.id}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        cache: 'no-cache',
        headers: { 'Content-Type': 'application/json' },
    });
    const responseData = await response.json();
    document.getElementById(`${e.target.dataset.id}`).innerHTML = '';
    const reQuantityInputs = Array.from(document.querySelectorAll('.cartContainer input[type="number"]'));
    if (reQuantityInputs.length !== 0) {
        updateToTalPrice(reQuantityInputs);
    } else {
        document.querySelector('.cartZone').style.display = 'none';
        document.querySelector('.emptyCartZone').style.display = 'block';
        document.querySelector('.cartToTalPriceZone').style.display = 'none';
    }
    document.querySelector('.msg_success').innerHTML = `<h2>${responseData.message}!</h2>`;
    window.scrollTo(0, 0);
}

const appendCart = (e) => {
    const data = Array.from(document.querySelectorAll('.cartContainer input[type="number"]')).map(quantityInput => {
        return { 'flowerId': quantityInput.dataset.id, 'quantity': quantityInput.value }
    });
    document.querySelector('input[name="cart"]').value = JSON.stringify(data);
    return true;
}

quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener('change', () => {
        activeSaveButton();
        updateToTalPrice(quantityInputs);
    });
});
listDeleteCartBtn.forEach(deleteCartBtn => {
    deleteCartBtn.addEventListener('click', deleteCart);
})
saveCartBtn !== null ? saveCartBtn.addEventListener('click', saveCart) : '';


