import { format, compareAsc } from 'date-fns';
import {appendToTheDom} from './dom.js'

const toWeekView = (()=> {
    let currentDay = new Date();
    console.log(currentDay);

    // Return current day
    function getCurrentDay() {
        return currentDay;
    }

    function displayDate() {
        // Underline the menu item
        document.getElementById('week').style.borderBottom = '3px solid rgb(213, 101, 138)';

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

        const month = document.getElementById('date-info-1'); 
        month.textContent = format(Date.now(), 'LLLL')
        const week = document.getElementById('date-info-2');
        week.textContent = format(Date.now(), 'wo') + " " + format(Date.now(), 'd') + ", " + format(Date.now(), 'y')
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

    function getWeek(shift=1) {
        const first = currentDay.getDate() - currentDay.getDay() + shift;
        const last = first + 6;
        const monday = new Date(currentDay.setDate(first));
        const sunday = new Date(currentDay.setDate(last));
        return {monday, sunday}
    }

    function setDate(date) {
        const day = document.getElementById('date-info-1');
        day.textContent = format(date, 'EEEE');
        const month = document.getElementById('date-info-2');
        month.textContent = format(date, 'LLL') + " " + format(date, 'd') + ", " + format(date, 'y');
        }

    return { displayDate, getCurrentDay }
})();

export {toWeekView}