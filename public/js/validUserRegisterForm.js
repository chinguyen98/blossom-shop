const nameInput = document.querySelector('input[name="name"]');
const emailInput = document.querySelector('input[name="email"]');
const phoneInput = document.querySelector('input[name="phone"]');
const addressInput = document.querySelector('input[name="address"]');
const passwordInput = document.querySelector('input[name="password"]');
const confirmpasswordInput = document.querySelector('input[name="confirmpassword"]');
const dataErr = Array.from(document.querySelectorAll('[data-err]'));

function validForm(e) {
    let errors = [];
    dataErr.forEach(item => item.innerHTML = "");
    if (nameInput.value == "") {
        errors.push({
            id: 'name',
            err: 'Please enter your name!'
        });
    }
    if (emailInput.value == "") {
        errors.push({
            id: 'email',
            err: 'Please enter your email!'
        });
    }
    if (passwordInput.value == "") {
        errors.push({
            id: 'password',
            err: 'Please enter your password!'
        });
    }
    if (confirmpasswordInput.value == "") {
        errors.push({
            id: 'confirmpassword',
            err: 'Please enter your confirm password!'
        });
    }
    var validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmailRegex.test(emailInput.value)) {
        errors.push({
            id: 'email',
            err: 'Please enter the correct email format!'
        });
    }
    if (confirmpasswordInput.value !== passwordInput.value) {
        errors.push({
            id: 'confirmpassword',
            err: 'Confirm password does not match!'
        });
    }
    if (phoneInput.value == '') {
        errors.push({
            id: 'phone',
            err: 'Please enter your phone number!'
        })
    }
    if (isNaN(phoneInput.value)) {
        errors.push({
            id: 'phone',
            err: 'Please enter right number format!'
        })
    }
    if (addressInput.value == '') {
        errors.push({
            id: 'address',
            err: 'Please enter your address!'
        })
    }
    if (errors.length > 0) {
        errors.forEach(error => {
            document.querySelector(`span[data-err="${error.id}"]`).innerHTML = error.err;
        })
        return false;
    }
    return true;
}


