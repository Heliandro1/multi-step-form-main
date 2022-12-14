const btnNext = document.querySelector("#btnNext-personal");
const error = document.querySelectorAll(".erros");
btnNext.addEventListener("click", isValidFields);

function isValidFields() {    
    const fieldName = document.querySelector("#name");
    const fieldEmail = document.querySelector("#email");
    const fieldPhoneNumber = document.querySelector("#phoneNumber");
    if (fieldName.value.trim() == '') {
        setError('This field is required', '#field-name');
    }else if(!isValidName(fieldName.value.trim().split(' '))){
        setError('Your name is too few', '#field-name');    
    }else if(fieldName.dataset.erro == 'error'){
        removeError('#field-name');
    }
    if (fieldEmail.value.trim() == '') {
        setError('This field is required', '#field-email');
    }else if(!isValidEmail(fieldEmail.value.trim())){
        setError('Invalid Email Adress', '#field-email');
    }else if(fieldEmail.dataset.erro == 'error'){
        removeError('#field-email');
    }
    if (fieldPhoneNumber.value.trim() == '') {
        setError('This field is required', '#field-number');
    }else if (!isValidPhoneNumber(fieldPhoneNumber.value)) {
        setError('Please match the requested format', '#field-number');
    }else if(fieldPhoneNumber.dataset.erro == 'error'){
        removeError('#field-number');
    }
    if (isValidName(fieldName.value.trim().split(' ')) && isValidEmail(fieldEmail.value.trim()) && isValidPhoneNumber(fieldPhoneNumber.value)) {
        window.location = 'select-plan.html';
    }
}
function setError(error, field) {
    const span = document.createElement("span");
    span.classList.add("erro");
    span.innerText = error;
    const errorField = document.querySelector(field);
    const errorElement = document.querySelector(`${field} + input`);
    errorElement.style.borderColor = 'red';
    errorElement.dataset.erro = 'error';
    if (errorField.children.length == 2) {
        errorField.removeChild(errorField.lastChild);
        errorField.appendChild(span)
    }else{
        errorField.appendChild(span);
    }
}
function removeError(field) {
    const errorField = document.querySelector(field);
    const errorElement = document.querySelector(`${field} + input`);
    errorElement.style.borderColor = 'hsl(229, 24%, 87%)';
    if (errorField.children.length == 2) {
        errorField.removeChild(errorField.lastChild);
    }
}
function isValidName(name) {
    if (name.length >= 2) {
        let vr = '';
        let isvalid = false;
        name.forEach(element => {
            if(element.length >= 4){
                if (!(element.match(/[a-z\u00C0-\u00FF]*/gi) == null)) {
                    element.match(/[a-z\u00C0-\u00FF]*/gi).forEach(element => {
                        vr += element;
                    });
                    vr.length == element.length ? isvalid = true : isvalid = false;
                    vr = '';
                }
            }
            else{
                isvalid = false;
            }
        });
        if (isvalid) {
            return true;
        }
    }
    return false;
}
function isValidEmail(email) {
    let regex = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/gi
    if (regex.test(email)) {
        return true;
    }
    return false;
}
function isValidPhoneNumber(number) {
    let regex = /^\+\d{1,3}\s\d{3}\s\d{3}\s\d{3}/g
    if (regex.test(number)) {
        return true;
    }
    return false;
}