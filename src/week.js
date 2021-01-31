import { format, compareAsc } from 'date-fns';
import setDay from 'date-fns/setDay'
import {domInteractions} from './dom.js'


const toWeekView = (()=> {
    let currentDay = new Date();

    function displayDate() {
        // Underline the menu item
        document.getElementById('week').style.borderBottom = '3px solid rgb(213, 101, 138)';
        document.getElementById('week').setAttribute('class', 'current-page');
        
        setDate(currentDay);
        // Attach events
        nextDay();
        previousDay();
        document.onkeydown = function(e) {
            if (e.keyCode === 37) {
                e.preventDefault();
                currentDay.setDate(currentDay.getDate() - 7);
                setDate(currentDay);
            } else if (e.keyCode === 39) {
                e.preventDefault();
                currentDay.setDate(currentDay.getDate() + 7);
                setDate(currentDay);
            }
        };
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
        const sunday = setDay(date, 0, { weekStartsOn: 1 })
        const monday = setDay(date, 1, { weekStartsOn: 1 })
        const day = document.getElementById('date-info-1'); 
        day.textContent = format(date, 'y');
        const month = document.getElementById('date-info-2');
        month.textContent = format(monday, 'LLL d') + ' - ' + format(sunday, 'LLL d');
        setTimeout(()=> {
            domInteractions.runModule();
        }, 100);
        }
   
    return { displayDate }
})();

export {toWeekView}