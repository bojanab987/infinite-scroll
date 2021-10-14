const displayDiv = document.querySelector('.js-display-users');

let current_page = 0;
const CURRENT_PG = 1;
const LIMIT = 10;
let nextScroll = 0;
let morePgs = true;

document.addEventListener('DOMContentLoaded', async () => {
    current_page = await getParam('page');
    if (!current_page) {
        await getUsers(CURRENT_PG);
    } else {
        await getUsers(Number(current_page) + Number(nextScroll));
    }
});

window.addEventListener('scroll', async () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight) {
        current_page++;
        await getUsers(Number(current_page));
    }
});

async function getParam(parameter) {
    const query = window.location.search;
    const paramsUrl = new URLSearchParams(query);
    const pageOrLim = paramsUrl.get(parameter);
    return pageOrLim;
}

async function updateURL(page, limit) {
    var newRelativePathQuery = window.location.pathname + `?page=${page}&limit=${limit}`
    window.history.pushState(null, '', newRelativePathQuery);

}

async function getUsers(page) {
    const response = await fetch(`http://localhost:3001/api/users?page=${page}&limit=${LIMIT}`)
    const data = await response.json();
    const users = data.results;
    //    console.log(data)
    console.log(users);

    morePgs = data.hasMore;
    console.log(morePgs)
    for (let i = 0; i < users.length; i++) {
        displayDiv.innerHTML +=
            `<ul class="list">  ${users[i].name}  
                <li>Id: ${users[i].id}</li>
                <li>Email: ${users[i].email}</li>
                <li>Address: ${users[i].address}</li>
                <li>Country: ${users[i].country}</li>
                <li>Company: ${users[i].company}</li>
            </ul><br>`;
    }
}

