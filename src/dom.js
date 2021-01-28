import {Todo, storage } from './logic.js'

const domInteractions = (() => {
    let counter = 0;
    let activePage = ''


    setTimeout(()=> {
        runModule();
    }, 100);

    function runModule() {
        clearTheTodoArea();
        counter = 0;
        activePage = document.querySelector('.current-page').id;
        const currentPageTodos = storage.getFromLocalStorage(activePage, storage.getDate())
        if (currentPageTodos != undefined) {
            for (let i = 0; i < currentPageTodos.length; i++) {
                createDomElement(currentPageTodos[i]);
                updateTodoDom(currentPageTodos[i])
                counter++;
            }   
        }
        isTodoListEmpty(); 
    }

    // Clear the page of todos while seitching between pages
    function clearTheTodoArea() {
        const unpinned = document.querySelector('#todos-container > ul:nth-child(2)');
        const pinned = document.querySelector('#pinned-todos > ul:nth-child(1)');
        unpinned.innerHTML = '';
        pinned.innerHTML = '';
    }

    // display the results of the form input
    const form = document.getElementById('form-data');
    form.addEventListener('submit', (event)=> {
        const newTodo = Todo(event.target.firstElementChild.value, storage.getDate(), counter)
        storage.storeTodo(activePage, storage.getDate(), newTodo)
        counter++;
        domInteractions.createDomElement(newTodo);
        isTodoListEmpty();
        event.target.firstElementChild.value = '';
        event.preventDefault();
    });

    
    // Update dom info if todo has been pinned, marked as fished or has memo
    function updateTodoDom(todo) {
        const t = todo.getFullInfo();
        const todoDom = document.getElementById(todo.getId());
        // Check if pinned
        if (t.priority == true) {
            const pinned = document.querySelector('#pinned-todos > ul:nth-child(1)');
            pinned.parentNode.style.display = 'block';
            todoDom.childNodes[3].lastChild.firstChild.textContent = 'Unpin the task';
            pinned.prepend(todoDom);
        }
        // Check if has memo
        if (t.description != '') {
            const memo = document.createElement('p');
            memo.setAttribute('class', 'memo')
            memo.textContent = t.description;
            todoDom.append(memo)
        }
        // Check if done
        if (t.done == true) {
            console.log(todoDom)
            todoDom.classList.toggle('done');
        }
        
    }

    // event function to mark finished todos
    function newEvent(ev) {
        if (ev.target.tagName === 'LI') {
            ev.target.classList.toggle('done');
            storage.changeDone(activePage, storage.getDate(), ev.target.id)
        } else if (ev.target.classList[0] == 'checkbox') {
            ev.target.parentElement.classList.toggle('done');
            storage.changeDone(activePage, storage.getDate(), ev.target.parentElement.id)
        }
    }

    // Event to open and close menu
    function openMenu(ev) {
        if (ev.target.classList[0] == 'menu') {
            if (document.getElementById('opened') != null) {
                document.getElementById('opened').removeAttribute('id');
            }
            const menu = ev.target;
            menu.nextElementSibling.setAttribute('id', 'opened');
            memoExists(ev.target);
        } else if (ev.target.className == 'menu-item-1' ||
                    ev.target.className == 'menu-item-2'||
                    ev.target.className == 'menu-item-3'||
                    ev.target.className == 'menu-item-container') {
            if (ev.target.className == 'menu-item-1') {
                pinToTheTop(ev.target.offsetParent.offsetParent.parentElement);
            } else if (ev.target.className == 'menu-item-2') {
                addOrDeleteMemo(ev.target);
            } else if (ev.target.className == 'menu-item-3') {
                deleteMenuItem(ev.target.offsetParent.offsetParent.parentElement);
            }
        } else {
            if (document.getElementById('opened') != null) {
                document.getElementById('opened').removeAttribute('id');
            } 
        }
        // Check if todo is pinned
        pinnedIsEmpty();
    }

    // create html elements for todo
    function createDomElement(todo) {
        const todoList = document.querySelector('#todos-container > ul:nth-child(2)');
        const listElem = document.createElement('li');
        const checkbox = document.createElement('span');
        const menu = document.createElement('span');
        menu.setAttribute('class', 'menu');
        menu.textContent = '...';
        checkbox.setAttribute('class', 'checkbox');
        listElem.textContent = todo.getTitle();
        listElem.setAttribute('id', todo.getId());

        listElem.addEventListener('click', newEvent);
        document.addEventListener('click', openMenu);
        

        // append everything
        listElem.appendChild(checkbox);
        listElem.appendChild(menu);
        addMenu(listElem);
        todoList.appendChild(listElem);   
    }

    // function to add menu 
    function addMenu(listItem) {
        const menuContainer = document.createElement('div');
        menuContainer.setAttribute('class', 'menu-container');

        const triange = document.createElement('div');
        triange.setAttribute('class', 'triangle-up');
        
        const menuListContainer = document.createElement('div');
        menuListContainer.setAttribute('class', 'menu-item-container');
        addMenuItem(menuListContainer);

        menuContainer.appendChild(triange)
        menuContainer.appendChild(menuListContainer)
        listItem.appendChild(menuContainer);
    }

    function addMenuItem(menuDiv) {
        // first item
        const firstItem = document.createElement('div');
        firstItem.setAttribute('class', 'menu-item-1');
        firstItem.textContent = 'Pin on the top';

        // second item
        const secondItem = document.createElement('div');
        secondItem.setAttribute('class', 'menu-item-2');
        secondItem.textContent = 'Add a memo';

        // third item
        const thirdItem = document.createElement('div');
        thirdItem.setAttribute('class', 'menu-item-3');
        thirdItem.textContent = 'Delete task';

        menuDiv.appendChild(firstItem);
        menuDiv.appendChild(secondItem);
        menuDiv.appendChild(thirdItem);
    }

    // Menu functionality
    function deleteMenuItem(target) {
        storage.deleteTodo(activePage, storage.getDate(), target.id)
        target.remove()
        isTodoListEmpty();
    }

    function pinToTheTop(target) {
        isPinned(target.childNodes[3]);
        const item = target
        if (target.parentNode.parentNode.id == 'pinned-todos') {
            const unpinned = document.querySelector('#todos-container > ul:nth-child(2)');
            unpinned.append(item);
        } else if (target.parentNode.parentNode.id == 'todos-container') {
            const pinned = document.querySelector('#pinned-todos > ul:nth-child(1)');
            pinned.prepend(item);
        }
        storage.changePriority(activePage, storage.getDate(), item.id);
        document.getElementById('opened').removeAttribute('id');  
    }

    function pinnedIsEmpty() {
        const pinned = document.querySelector('#pinned-todos > ul:nth-child(1)');
        if (pinned.childNodes.length > 0) {
            pinned.parentNode.style = 'display: block';
        } else {
            pinned.parentNode.style = 'display: none';
        }
    }

    function isPinned(target) {
        if (target.parentNode.parentNode.parentNode.id != 'pinned-todos') {
            document.getElementById('opened').lastChild.firstElementChild.textContent = 'Unpin the task';
        } else if (target.parentNode.parentNode.parentNode.id != 'todos-container') {
            document.getElementById('opened').lastChild.firstElementChild.textContent = 'Pin to the top'
        }
    }

    function addOrDeleteMemo(target) {
        const elemId = target.parentNode.parentNode.parentNode.id
        if (target.textContent == 'Add a memo') {
            const form = document.createElement('form')
            form.autocomplete = 'off';
            form.setAttribute('id', 'memo-form');
            const textarea = document.createElement('input');
            textarea.type = 'text';

            const submit = document.createElement('input')
            submit.type = 'submit'
            submit.value = '+';
            submit.setAttribute('id', 'memo-form-submit');

            textarea.placeholder = 'Enter your memo here';
            textarea.setAttribute('id', 'memo-input');

            form.appendChild(textarea);
            form.appendChild(submit);
            target.parentNode.parentNode.parentNode.append(form)
            document.getElementById('opened').removeAttribute('id');
            
            form.onsubmit = function addComment(event) {
                const memo = document.createElement('p');
                memo.setAttribute('class', 'memo')
                memo.textContent = event.target.firstChild.value;
                storage.changeDesription(activePage, storage.getDate(), elemId, memo.textContent);
                event.target.parentNode.append(memo)
                form.remove() 
            }
        } else {
            storage.changeDesription(activePage, storage.getDate(), elemId, '');
            target.parentNode.parentNode.parentNode.lastChild.remove()
            document.getElementById('opened').removeAttribute('id');
        }
    }

    function memoExists(target) {
        if (target.className == 'menu') {
            if (target.parentNode.lastChild.className == 'memo') {
                document.getElementById('opened').lastChild.childNodes[1].textContent = 'Delete memo';
            } else {
                document.getElementById('opened').lastChild.childNodes[1].textContent = 'Add a memo';
            }
        }
    }

    // Function to check whether there is a message saying about empty todo
    function isTodoListEmpty() {
        // Delete the empty todo-message
        const pinnedTodos = document.querySelector('#pinned-todos > ul:nth-child(1)');
        const unpinnedTodos = document.querySelector('#todos-container > ul:nth-child(2)');
        if (pinnedTodos.firstElementChild == null && unpinnedTodos.firstElementChild == null) {
            document.getElementById('no-task-message').style.display = 'block';
        } else {
            document.getElementById('no-task-message').style.display = 'none';
        }
    }

    
    return { createDomElement, runModule }
})();



export {domInteractions}


