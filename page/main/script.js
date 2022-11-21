function loadHeader() {
    let header = document.createElement('header')
    let hLink = document.createElement("a");
    hLink.href= "index.html"

    let h1 = document.createElement("h1");
    h1.innerHTML = "Bookshop";

    hLink.append(h1);
    header.append(hLink);

    return header;
}

function loadFooter() {
    let footer = document.createElement('footer');

    let fLink = document.createElement("a");
    fLink.href= "https://github.com/pawk0"
    fLink.classList.add("github-link")

    let fImg = document.createElement('img');
    fImg.classList.add("github-logo")

    fImg.alt="github logo";
    fImg.src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg";

    // fLink.innerText="GITHUB";
    fLink.append(fImg);

    let fLink2 = document.createElement("a");
    fLink2.href= "https://rs.school/"

    let fImg2 = document.createElement('img');
    fImg2.classList.add("rs-logo")
    fImg2.alt="RS School logo";
    fImg2.src="https://rs.school/images/rs_school.svg";

    fLink2.append(fImg2);


    footer.append(fLink);
    footer.append(fLink2);

    return footer;
}

function loadMain() {
    let main = document.createElement('main');

    let mSection1 = document.createElement('section');
    main.append(mSection1);
    mSection1.classList.add('col')
    mSection1.classList.add('col1')

    let h41 = document.createElement('h4');
    mSection1.append(h41);
    h41.innerText = "Book catalog";

    let mSection11 = document.createElement('section');
    mSection1.append(mSection11);
    mSection11.classList.add('books-catalog');
    mSection11.draggable=false;


    let mSection2 = document.createElement('section');
    main.append(mSection2);
    mSection2.classList.add('col')
    mSection2.classList.add('col2')
    mSection2.id="droptarget";

    let h42 = document.createElement('h4');
    mSection2.append(h42);
    h42.innerText = "Order books";


    let mSection21 = document.createElement('section');
    mSection2.append(mSection21);
    mSection21.classList.add('order-list');

    let table = document.createElement('table');
    mSection21.append(table);
    table.classList.add('order-list-table')

    let thead = document.createElement('thead');
    table.append(thead);

    let tr = document.createElement('tr');
    thead.append(tr);

    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    th2.innerHTML = "Price";
    let th3 = document.createElement('th');
    th3.innerHTML = "Book";
    let th4 = document.createElement('th');
    th4.innerHTML = "Remove";

    tr.append(th1);
    tr.append(th2);
    tr.append(th3);
    tr.append(th4);












    let tbody = document.createElement('tbody');
    table.append(tbody);






    let div2 = document.createElement('div');
    mSection21.append(div2);
    div2.classList.add('confirmation')

    let pp = document.createElement('p');
    div2.append(pp);
    pp.innerText="Total price: "

    let spn1 = document.createElement('span');
    pp.append(spn1);
    spn1.classList.add("price")
    spn1.classList.add("total-price")
    spn1.innerText = "0";

    let btn1 = document.createElement('button');
    div2.append(btn1);

    btn1.id="confirm-order";
    btn1.classList.add("button");
    btn1.innerText = "Confirm order";
    btn1.onclick=goToOrder;




    return main;
}

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

async function start() {
    const urlData = 'books.json';
    const data = await getData(urlData);

    let bodyFragment = new DocumentFragment();

    bodyFragment.append(loadHeader())
    bodyFragment.append(loadMain())
    bodyFragment.append(loadFooter())

    document.getElementsByTagName("body")[0].append(bodyFragment);

    loadMain();

    loadBooks(data, document.querySelector('.books-catalog'));

    enableDrag(data);
}

function goToOrder() {
    if (+document.querySelector(".total-price").innerHTML > 0)
        location.href = 'form.html'
}

function addBookToBag(title, bookData) {
    let book = bookData.filter(obj => {
        return obj.title === title;
    })[0];

    let tbody = document.querySelector('.order-list-table').getElementsByTagName("tbody")[0];

    let newRow = new DocumentFragment();

    let row = document.createElement("tr");
    newRow.append(row);

    let cell1 = document.createElement("td");
    let imgCell = document.createElement("img");
    imgCell.src = book.imageLink;
    cell1.append(imgCell);
    row.append(cell1)

    let cell2 = document.createElement("td");
    cell2.classList.add("price");
    cell2.innerHTML = book.price;
    row.append(cell2);

    let cell3 = document.createElement("td");
    let s1 = document.createElement('span');
    s1.classList.add("title")
    s1.innerHTML = book.title;

    let s2 = document.createElement('span');
    s2.classList.add("obl")
    s2.innerHTML = book.author;

    cell3.append(s1);
    cell3.append(s2);

    row.append(cell3);

    let cell4 = document.createElement("td");
    let c4a = document.createElement("a");
    c4a.classList.add("button");
    c4a.classList.add("close");
    c4a.innerHTML = "&times;";
    cell4.append(c4a);

    row.append(cell4);

    tbody.append(newRow)

    let currentPrice = document.querySelector(".total-price");

    currentPrice.innerHTML = +currentPrice.innerHTML + book.price;

    c4a.addEventListener('click', event => {
        row.remove();
        currentPrice.innerHTML = +currentPrice.innerHTML - book.price;
    })
}

function loadBooks(bookData, bookCatalog) {
    let fragment = new DocumentFragment();
    let modalsFragment = new DocumentFragment();
    let i = 1;

    bookData.forEach(book => {
        let bookDOM = document.createElement("div");
        bookDOM.classList.add('book');
        bookDOM.draggable = true;

        let img1 = document.createElement("img");
        img1.src = book.imageLink;
        img1.alt = book.title;
        img1.draggable = false;
        bookDOM.append(img1);

        let div2 = document.createElement("div");
        div2.classList.add('book-details');
        bookDOM.append(div2);

        let p1 = document.createElement("p");
        p1.classList.add('title');
        p1.innerHTML = book.title;
        div2.append(p1);

        let p2 = document.createElement("p");
        p2.classList.add('obl');
        p2.innerHTML = book.author;
        div2.append(p2);

        let p3 = document.createElement("p");
        p3.classList.add('price');
        p3.innerHTML = `Price: ${book.price}`;
        div2.append(p3);


        let a1 = document.createElement("a");
        a1.classList.add('button');
        a1.href = `#desc-${i}`;
        a1.innerHTML = "Show more";
        div2.append(a1);

        let button1 = document.createElement("button");
        button1.classList.add('button');
        button1.classList.add('add-to-bag');
        button1.innerHTML = `Add to bag`;
        button1.addEventListener('click', event => {
            addBookToBag(book.title, bookData);
        })
        div2.append(button1);

        let modal = document.createElement("div");
        modal.classList.add('popup-outside');
        modal.id = `desc-${i}`;
        // div2.append(modal);


        let div4 = document.createElement("div");
        div4.classList.add('popup');
        modal.append(div4);


        let p4 = document.createElement("p");
        p4.classList.add('title-popup');
        p4.innerHTML = `Price: ${book.title}`;
        div4.append(p4);

        let div5 = document.createElement("div");
        div5.classList.add('desc');
        div4.append(div5);

        let a2 = document.createElement("a");
        a2.classList.add('close');
        a2.href = `#close`;
        a2.innerHTML = "&times";
        div4.append(a2);


        let img2 = document.createElement("img");
        img2.classList.add('photo-description');
        img2.src = book.imageLink;
        img2.alt = book.title;
        div5.append(img2);


        let p5 = document.createElement("p");
        p5.classList.add('obl');
        p5.innerHTML = book.description;
        div5.append(p5);

        i++
        fragment.append(bookDOM)
        modalsFragment.append(modal);
    })

    bookCatalog.append(fragment);
    bookCatalog.append(modalsFragment);
}

function enableDrag(bookData) {
    let dragged = null;

    let draggable = document.getElementsByClassName("book");

    Array.from(draggable).forEach(element => {
        element.addEventListener("dragstart", (event) => {
            dragged = event.target;
        });
    })

    const target = document.getElementById("droptarget");
    target.addEventListener("dragover", (event) => {
        event.preventDefault();
    });

    target.addEventListener("drop", (event) => {
        event.preventDefault();

        addBookToBag(dragged.querySelector(".title").innerText, bookData);
    });
}

// const header = new DocumentFragment();
// const main = new DocumentFragment();
// const footer = new DocumentFragment();

start();