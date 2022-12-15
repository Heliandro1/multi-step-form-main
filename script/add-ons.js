const cards = document.querySelectorAll(".card");
const checkboxes = document.querySelectorAll("input[type='checkbox']");
const btnGoBack = document.querySelector("#btnGoBack");
const btnNext = document.querySelector("#btnNext");
btnNext.addEventListener("click", () =>{
    setAddOns();
    window.location = 'summary.html';
});
btnGoBack.addEventListener("click", () => window.location = 'select-plan.html');
window.addEventListener("load", () =>{
    setPlanType(getPlanType);
    for (const iterator of cards) {
        iterator.addEventListener("click", handleCardClick);
    }
});
function handleCardClick() {
    if (!this.classList.contains('select')) {
        for (const iterator of checkboxes) {
            if (iterator.parentElement.parentElement == this) {
                iterator.checked = true;
            }
        }
        this.classList.add('select');
    }else{
        for (const iterator of checkboxes) {
            if (iterator.parentElement.parentElement == this) {
                iterator.checked = false;
            }
        }
        this.classList.remove('select');
    }
}
function getPlanType() {
    const planSaved = localStorage.getItem('plan');
    let planType = null;
    if (!(planSaved == null)) {
        planType = [...JSON.parse(planSaved)];
        return planType[2];
    }
    return null;
}
function setPlanType(callback) {
    const plan = callback();
    if (!(plan == null)) {
        const prices = document.querySelectorAll(".price");
        if (plan == 'Yearly') {
            prices.item(0).innerText = '$10/yr';
            prices.item(1).innerText = '$20/yr';
            prices.item(2).innerText = '$20/yr';
        }
    }
}
function setAddOns() {
    const addname = document.querySelectorAll("div.select p > strong");
    const addprice = document.querySelectorAll("div.select > p.price");
    let addons = [];
    for (let index = 0; index < addname.length; index++) {
        const name = addname[index];
        const price = addprice[index];
        addons.push({name: name.innerText, price: price.innerText});
    }
    addOns(addons);
}
function addOns(addons) {
    localStorage.setItem('addons', JSON.stringify(addons));
}