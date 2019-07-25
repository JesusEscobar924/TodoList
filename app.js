const addForm = document.querySelector("#add");
const list = document.querySelector(".to-dos");
const search = document.querySelector(".search input");
const searchForm = document.querySelector(".search")

let arrayTodo = [];

class To_do {
    constructor(todo) {
        this.todo = todo;
    }
    generateTemplate(todo) {
        const html = `
    <li>
        <span class="tachar">${this.todo}</span>
        <i class="fa fas fa-trash delete"></i>
    </li>`;
        list.innerHTML += html;
    }
}

// Agregar to-dos

addForm.addEventListener('submit', e => {
    e.preventDefault();
    const todo = addForm.add.value.trim();
    const newTodo = new To_do(todo);
    if (todo.length) {
        newTodo.generateTemplate(todo);
        addForm.reset();
        arrayTodo.push(todo);
        localStorage.setItem('to-do', arrayTodo);
    }
});

// Eliminar to-dos
list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
});

// Buscar to-dos

const filterTodos = term => {
    Array.from(list.children)
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => todo.classList.add('filtered'));


    Array.from(list.children)
        .filter(todo => todo.textContent.includes(term))
        .forEach(todo => todo.classList.remove('filtered'));

};

searchForm.addEventListener('submit', e => {
    e.preventDefault();
});

search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

// Tachar to-dos

list.addEventListener('click', e => {
    if (e.target.classList.contains('tachado')) {
        e.target.classList.remove('tachado');
    } else if (!e.target.classList.contains('tachado')) {
        e.target.classList.add('tachado')
    }
});

//  Comprobar localstorage

if (localStorage.getItem('to-do')) {
    let localArray = localStorage.getItem('to-do').split(",");

    localArray.forEach(l => {
        const arrayStored = new To_do(l);
        arrayStored.generateTemplate(l);
    })
};