import { toDayView } from './day.js'
import { toWeekView } from './week.js'
import { toMonthView } from './month.js'
import { toYearView } from './year.js'

// Module to store and alter todos data
const storage = (()=> {
    const storageObj = {
        'day': {},
        'week': {},
        'month': {},
        'year': {},
    }

    function getDate() {
        if (document.getElementById('date-info-2').textContent != '') {
            const date = document.getElementById('date-info-1').textContent + ': ' + document.getElementById('date-info-2').textContent
            return date
        } else {
            return document.getElementById('date-info-1').textContent
        }
        
        
    }

    function storeTodo(anchor, date, todo) {
        if (!storageObj[anchor].hasOwnProperty(date)) {
            storageObj[anchor][date] = []
            storageObj[anchor][date].push(todo)
        } else {
            storageObj[anchor][date].push(todo);
        }
        storeToLocalStorage(anchor, date, todo)
    }



    function deleteTodo(anchor, date, id) {
        for (let i = 0; i < storageObj[anchor][date].length; i++) {
            if (storageObj[anchor][date][i].getId() == id) {
                storageObj[anchor][date].splice(i, 1);
                deleteFromLocalStorage(anchor, date, id);
            }
        }
    }

    function changePriority(anchor, date, id) {
        for (let i = 0; i < storageObj[anchor][date].length; i++) {
            if (storageObj[anchor][date][i].getId() == id) {
                storageObj[anchor][date][i].setPriority();
                updateLocalStorage(anchor, date, storageObj[anchor][date][i])
            }
        }
    }

    function changeDesription(anchor, date, id, description) {
        for (let i = 0; i < storageObj[anchor][date].length; i++) {
            if (storageObj[anchor][date][i].getId() == id) {
                storageObj[anchor][date][i].setDescription(description);
                updateLocalStorage(anchor, date, storageObj[anchor][date][i])
            }
        }
    }

    function changeDone(anchor, date, id) {
        for (let i = 0; i < storageObj[anchor][date].length; i++) {
            if (storageObj[anchor][date][i].getId() == id) {
                storageObj[anchor][date][i].setDone();
                updateLocalStorage(anchor, date, storageObj[anchor][date][i])
            }
        }
    }

    function updateLocalStorage(anchor, date, todo) {
        const obj = JSON.parse(localStorage.getItem(anchor));
        for (let i = 0; i < obj[date].length; i++) {
            if (obj[date][i].id == todo.getId()) {
                obj[date][i] = todo.getFullInfo();
            }
        }
        localStorage.setItem(anchor, JSON.stringify(obj))
    }

    function storeToLocalStorage(anchor, date, todo) {
        if (localStorage.getItem(anchor) == null) {
            localStorage.setItem(anchor, JSON.stringify({}))
        }
        const obj = JSON.parse(localStorage.getItem(anchor))
        if (!obj.hasOwnProperty(date)) {
            obj[date] = []
            obj[date].push(todo.getFullInfo())
        } else {
            obj[date].push(todo.getFullInfo());
        }
        localStorage.setItem(anchor, JSON.stringify(obj))
    }

    function deleteFromLocalStorage(anchor, date, id) {
        const obj = JSON.parse(localStorage.getItem(anchor))
        for (let i = 0; i < obj[date].length; i++) {
            if (obj[date][i].id == id) {
                obj[date].splice(i, 1)
            }
        }
        localStorage.setItem(anchor, JSON.stringify(obj))
    }

    function getFromLocalStorage(anchor, date) {
        if (localStorage.getItem(anchor) != null) {
            const obj = JSON.parse(localStorage.getItem(anchor));
            const restoredArr = []
            if (obj[date] != undefined) {
                for (let i = 0; i < obj[date].length; i++) {
                    const todo = Todo(obj[date][i].title, obj[date][i].dueDate, obj[date][i].id)
                    if (obj[date][i].description != '') {
                        todo.setDescription(obj[date][i].description)
                    } 
                    if (obj[date][i].priority == true) {
                        todo.setPriority()
                    }
                    if (obj[date][i].done == true) {
                        todo.setDone()
                    }
                    restoredArr.push(todo)
                }
                obj[date] = restoredArr 
                storageObj[anchor][date] = obj[date]   
            }
            return obj[date]
        } 
    }

    return {storageObj, getDate, storeTodo, deleteTodo, changePriority, changeDesription, changeDone, getFromLocalStorage}
})();



// Constructor function to create todos
const Todo = function(title, dueDate, id) { 
    let description = '';
    let priority = false;
    let done = false;
    
    const getTitle = () => title;
    
    function setDescription(descr) {
        description = descr;
    }

    function setPriority() {
        if (priority == false) {
            priority = true;
        } else {
            priority = false;
        }
    }

    function setDone() {
        if (done == false) {
            done = true;
        } else {
            done = false;
        }
    }

    function getFullInfo() {
        return {id, title, dueDate, description, priority, done}
    }

    function getId() {
        return id
    }
    
    return {getId, getTitle, setDescription, setPriority, getFullInfo, setDone}
}

// Tab switching login
function checkCurrentPage() {
    const elem = document.querySelector('.current-page');
    const isYear = document.querySelector('.year-view');
    if (elem != null) {
        elem.style.borderBottom = 'none';
        elem.removeAttribute('class', 'current-page');
    }
    if (isYear != null) {
        isYear.removeAttribute('class', 'year-view');
    }
}

function switchTab() {
    document.getElementById('day').addEventListener('click', ()=> {
        checkCurrentPage();
        toDayView.displayDate();
    })
    document.getElementById('week').addEventListener('click', ()=> {
        checkCurrentPage();
        toWeekView.displayDate();
    })
    document.getElementById('month').addEventListener('click', ()=> {
        checkCurrentPage();
        toMonthView.displayDate();
    })
    document.getElementById('year').addEventListener('click', ()=> {
        checkCurrentPage();
        toYearView.displayDate();
    })
}
toDayView.displayDate();
switchTab();

export {Todo, storage}


