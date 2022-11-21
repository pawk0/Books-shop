async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

async function start() {
    const urlData = 'books.json';
    const data = await getData(urlData);
    console.log(data);
}

start();

const header = new DocumentFragment();
