const emailInput = document.querySelector('input[name="email"]');
const passwordInput = document.querySelector('input[name="password"]');
const dataErr = Array.from(document.querySelectorAll('[data-err]'));

function validForm(e) {
    let errors = [];
    dataErr.forEach(item => item.innerHTML = "");
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
    var validEmailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!validEmailRegex.test(emailInput.value)) {
        errors.push({
            id: 'email',
            err: 'Please enter the correct email format!'
        });
    }
    if (errors.length > 0) {
        errors.forEach(error => {
            document.querySelector(`span[data-err="${error.id}"]`).innerHTML = error.err;
        })
        return false;
    }
    return true;
}