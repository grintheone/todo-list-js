import { format, compareAsc } from 'date-fns';
import {domInterations} from './dom.js'

const toDayView = (()=> {
    let currentDay = new Date();

    // Return current day
    function getCurrentDay() {
        return currentDay;
    }

    function displayDate() {
        // Underline the menu item
        document.getElementById('day').style.borderBottom = '3px solid rgb(213, 101, 138)';
        document.getElementById('day').setAttribute('class', 'current-page');

        // Attach events
        nextDay();
        previousDay();
        document.onkeydown = function(e) {
            if (e.keyCode === 37) {
                e.preventDefault();
                currentDay.setDate(currentDay.getDate() - 1);
                setDate(currentDay);
            } else if (e.keyCode === 39) {
                e.preventDefault();
                currentDay.setDate(currentDay.getDate() + 1);
                setDate(currentDay);
            }
        };

        const day = document.getElementById('date-info-1'); 
        day.textContent = format(Date.now(), 'EEEE')
        const month = document.getElementById('date-info-2');
        month.textContent = format(Date.now(), 'LLL d, y');
    }

    function nextDay() {
        const nextBtn = document.getElementById('next');
        nextBtn.addEventListener('click', ()=> {
            currentDay.setDate(currentDay.getDate() + 1);
            setDate(currentDay);
        });
    }

    function previousDay() {
        const previousBtn = document.getElementById('previous');
        previousBtn.addEventListener('click', ()=> { 
            currentDay.setDate(currentDay.getDate() - 1);
            setDate(currentDay);
        })
    }

    function setDate(date) {
        const day = document.getElementById('date-info-1'); 
        day.textContent = format(date, 'EEEE');
        const month = document.getElementById('date-info-2');
        month.textContent = format(date, 'LLL') + " " + format(date, 'd') + ", " + format(date, 'y');
        }

    return { displayDate, getCurrentDay }
})();

export {toDayView}