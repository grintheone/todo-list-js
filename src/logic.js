import { format, compareAsc } from 'date-fns';
import {domInterations} from './dom.js'

// Module to store and alter todos data
const storage = (()=> {
    const storageObj = {
        'days': [],
        'weeks': [],
        'months': [],
        'years': [],
    }

    return {storageObj}
})();

const todos = []

// Constructor function to create todos
const todo = function(title) { 
    const getTitle = () => title;
    const setDescription = (description) => description;

    return {getTitle, setDescription}
}


export {todos, todo}


