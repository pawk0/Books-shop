let name = document.getElementById("name");
let surname = document.getElementById("surname");
let street = document.getElementById("street");
let house = document.getElementById("house");
let flat = document.getElementById("flat");
let date = document.getElementById("date");
let gifts = document.getElementById("gifts");
let submitter = document.getElementById("confirm-delivery");

let inputs = [name, surname, street, house, flat, date];

const today = new Date();
const yyyy = today.getFullYear();
let mm = today.getMonth() + 1; // Months start at 0!
let dd = today.getDate() + 1;
if (dd < 10) dd = '0' + dd;
if (mm < 10) mm = '0' + mm;
const formatted = `${yyyy}-${mm}-${dd}`
date.min = formatted;

function enableButton() {
    let inps = inputs.every(element => {
        return element.checkValidity()
    })
    submitter.disabled = !inps;
}

inputs.forEach(input => {
    input.addEventListener(
        "invalid",
        event => {
            input.classList.add("error");
        },
        false
    );
});

inputs.forEach(input => {
    input.addEventListener(
        "change",
        event => {
            input.classList.remove("error");
            input.checkValidity();
            enableButton();
        },
        false
    );
});

let checks = gifts.getElementsByClassName("check")
const maxGifts = 2;

for (let i = 0; i < checks.length; i++)
    checks[i].onclick = selectiveCheck;

function selectiveCheck(event) {
    let checkedChecks = document.querySelectorAll(".check:checked");
    if (checkedChecks.length >= maxGifts + 1)
        return false;
}

function showSummary() {
    const fragment = new DocumentFragment();

    let div1 = document.createElement('div');
    div1.classList.add('modal');

    let div2 = document.createElement('div');
    div2.classList.add('modal-content');


    let spn = document.createElement('span');
    spn.innerHTML = '&times;';
    spn.classList.add('closee')


    div1.appendChild(div2);
    div2.appendChild(spn);
    fragment.append(div1);

    let message = `The order created. The delivery address is ${street.value} house ${house.value} flat ${flat.value}. Customer ${name.value} ${surname.value}.`
    let p = document.createElement('p')

    p.innerHTML = message;
    div2.appendChild(p);

    document.getElementsByTagName('body')[0].append(fragment);

    let modal = div1;
    let span = spn;

    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
        div1.remove();
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

}

submitter.addEventListener('click', event => {
    event.preventDefault();

    showSummary();
})

