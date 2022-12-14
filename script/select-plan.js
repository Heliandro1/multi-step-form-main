const btnNext = document.querySelector("#btnNext");
const btnGoBack = document.querySelector("#btnGoBack");
const toggle = document.querySelector("#toggle");
const cards = document.querySelectorAll(".card");
let cardSelected = false
btnNext.addEventListener("click", isCardSelected);
window.addEventListener("load", () =>{
    for (const iterator of cards) {
        iterator.addEventListener("click", handleCardClick);
    }
});
btnGoBack.addEventListener("click", () => {window.location = 'index.html'});
toggle.addEventListener("click", roll);


function roll() {
    const arcade = document.querySelector("#sarcade");
    const adv = document.querySelector("#sadvanced");
    const pro = document.querySelector("#spro");
    const span = document.querySelectorAll("div#time p > span");
    if (!toggle.hasAttribute('yearly')) {
        toggle.style.animation = 'roll-right 0.5s ease';
        toggle.style.animationFillMode = 'forwards';
        arcade.innerHTML = "$90/yr <br> <span style = 'color: hsl(213, 96%, 18%);'>2 months free</span>";
        adv.innerHTML = "$120/yr <br> <span style = 'color: hsl(213, 96%, 18%);'>2 months free</span>";
        pro.innerHTML = "$150/yr <br> <span style = 'color: hsl(213, 96%, 18%);'>2 months free</span>";
        span.item(1).classList.add("selected-time");
        span.item(0).classList.remove("selected-time");
        toggle.setAttribute("yearly", '');
    }else{
        toggle.style.animation = 'roll-left 0.5s ease';
        toggle.style.animationFillMode = 'forwards';
        arcade.innerText = "$9/mo";
        adv.innerText = "$12/mo";
        pro.innerText = "$15/mo";
        span.item(0).classList.add("selected-time");
        span.item(1).classList.remove("selected-time");
        toggle.removeAttribute("yearly");
    }
}

function handleCardClick() {
    for (const iterator of cards) {
        if (iterator.classList.contains('select')) {
            iterator.classList.remove('select');
        }
    }
    if (!cardSelected) {
        const p = document.querySelector("div#erro > p");
        p.innerText = "";
    }
    if (!this.classList.contains('select')) {
        this.classList.add('select');
        cardSelected = true;
    }
}

function isCardSelected() {
    if (cardSelected) {
        return true;
    }
    const p = document.querySelector("div#erro > p");
    p.innerText = "Please select your plan";
    p.style.color = 'red';
    p.style.textAlign = 'center';
    return false;
}