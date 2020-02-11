const priceForAddInput = document.querySelector('#priceForAdd');
const nameForAddInput = document.querySelector('#nameForAdd');
const pictureForAddInput = document.querySelector('#pictureForAdd');
const forAddErrors = Array.from(document.querySelectorAll('[data-err]'));


function validAdminAddFlowerForm(e) {
    const errors = [];
    forAddErrors.forEach(err => err.innerHTML = '');
    if (nameForAddInput.value == '') {
        errors.push({
            id: 'nameForAdd',
            err: 'Flower name is required!'
        });
    }
    if (priceForAddInput.value == '') {
        errors.push({
            id: 'priceForAdd',
            err: 'Flower price is required!'
        });
    }
    if (isNaN(priceForAddInput.value)) {
        errors.push({
            id: 'priceForAdd',
            err: 'Please enter price format correctly!'
        });
    }
    if (pictureForAddInput.files.length == 0) {
        errors.push({
            id: 'pictureForAdd',
            err: 'Please upload image!'
        });
    }
    if (pictureForAddInput.files[0]['type'].split('/')[0] != 'image') {
        errors.push({
            id: 'pictureForAdd',
            err: 'Please upload image!'
        });
    }
    if (errors.length > 0) {
        errors.forEach(error => {
            document.querySelector(`span[data-err="${error.id}"]`).innerHTML = error.err;
        });
        return false;
    }
    return true;
}