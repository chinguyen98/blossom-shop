const btnAddToCart = document.querySelector('.btn-addToCart');
const quantityInput = document.querySelector('input[name="quantity"]');
const flowerIdInput = document.querySelector('input[name="flowerId"]')
const userIdInput = document.querySelector('input[name="userId"]');

const addToCart = async () => {
    if (userIdInput == null) {
        window.location.href = "/users/login";
    } else {
        alert('Khach da dang nhap!');
    }
}

btnAddToCart.addEventListener('click', addToCart);