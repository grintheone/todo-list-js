import { format, compareAsc } from 'date-fns';
import {domInteractions} from './dom.js'


const toMonthView = (()=> {
    let currentDay = new Date();

    function displayDate() {
        // Underline the menu item
        document.getElementById('month').style.borderBottom = '3px solid rgb(213, 101, 138)';
        document.getElementById('month').setAttribute('class', 'current-page');
        
        setDate(currentDay);
        // Attach events
        nextMonth();
        previousMonth();
        document.onkeydown = function(e) {
            if (e.keyCode === 37) {
                e.preventDefault();
                currentDay.setMonth(currentDay.getMonth() - 1);
                setDate(currentDay);
            } else if (e.keyCode === 39) {
                e.preventDefault();
                currentDay.setMonth(currentDay.getMonth() + 1);
                setDate(currentDay);
            }
        };
    }

    function nextMonth() {
        const nextBtn = document.getElementById('next');
        nextBtn.addEventListener('click', ()=> {
            currentDay.setMonth(currentDay.getMonth() + 1);
            setDate(currentDay);
        });
    }

    function previousMonth() {
        const previousBtn = document.getElementById('previous');
        previousBtn.addEventListener('click', ()=> { 
            currentDay.setMonth(currentDay.getMonth() - 1);
            setDate(currentDay);
        })
    }

    function setDate(date) {
        const year = document.getElementById('date-info-2'); 
        year.textContent = format(date, 'y');
        const month = document.getElementById('date-info-1');
        month.textContent = format(date, 'MMMM');
        setTimeout(()=> {
            domInteractions.runModule();
        }, 100);
        }

    return { displayDate }
})();

export {toMonthView}