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

quantityInputs.forEach(quantityInput => {
    quantityInput.addEventListener('change', updateToTalPrice);
})

