const btnConfirm = document.querySelector("#btnConfirm");
const btnGoBack = document.querySelector("#btnGoBack");
window.addEventListener("load", renderElements);
btnConfirm.addEventListener("click", () => window.location = 'finish-up.html');
btnGoBack.addEventListener("click", () => window.location = 'add-ons.html');
function renderElements() {
    renderPlanSelected(getPlanSelected);
    renderAddOns(getAddOnSaved);
    setTotal(getPlanSelected, getAddOnSaved);
}
function renderPlanSelected(callback) {
    const div = document.querySelector("div#plan-selected");
    const planInfo = callback();
    if (!(planInfo == null)) {
        div.innerHTML += `<p><strong>${planInfo[0]}</strong><br> <a href="select-plan.html" rel="prev noopener noreferer">Change</a></p>`;
        div.innerHTML += `<p id="price"><strong>${planInfo[1]}</strong></p>`;
        
    }
}
function renderAddOns(callback) {
    const planContainer = document.querySelector(".plan-container");
    const addInfo = callback();
    if (!(addInfo == null)) {
        addInfo.forEach(element => {
            planContainer.innerHTML += `<div class="add-ons">
            <p><span>${element.name}</span></p>
            <p class="add-on-price">${element.price}</p>
            </div>`;
        });
    }
}
function setTotal(callbackPlan, callbackAddOn) {
    let total = 0;
    const divTotal = document.querySelector(".total-selected");
    const planInfo = callbackPlan();
    const addOn = callbackAddOn();
    if (!(planInfo == null) && !(addOn == null)) {
        total = parseInt([...planInfo[1]]);
        console.log(total);
        addOn.forEach(element => {
            total += Number(parseInt(element.price));
        });
        divTotal.innerHTML = `<p><span>Total (per ${planInfo[2] == 'Monthly' ? `month` : `year`})</span></p>
        <p id="total">+$${planInfo[2] == 'Monthly' ? `${total}/mo` : `${total}/yr`}</p>`
    }
    function parseInt([...number]) {
        let num = '';
        number.filter(e => {
            if(Number.isInteger(Number(e))) return e;
        }).forEach(e =>{
            num += e;
        });
        return Number(num);
    }
}
function getPlanSelected() {
    const planSaved = localStorage.getItem('plan');
    let planType = null;
    if (!(planSaved == null)) {
        planType = [...JSON.parse(planSaved)];
        return planType;
    }
    return null;
}
function getAddOnSaved() {
    const addOnSaved = localStorage.getItem('addons');
    let adds = null;
    if (!(addOnSaved == null)) {
        adds = [...JSON.parse(addOnSaved)];
        return adds;
    }
    return null;
}