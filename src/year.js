import { format, compareAsc } from 'date-fns';
import {domInteractions} from './dom.js'


const toYearView = (()=> {
    let currentDay = new Date();

    function displayDate() {
        // Underline the menu item
        document.getElementById('year').style.borderBottom = '3px solid rgb(213, 101, 138)';
        document.getElementById('year').setAttribute('class', 'current-page');
        
        setDate(currentDay);
        // Attach events
        nextMonth();
        previousMonth();
        document.onkeydown = function(e) {
            if (e.keyCode === 37) {
                e.preventDefault();
                currentDay.setMonth(currentDay.getMonth() - 12);
                setDate(currentDay);
            } else if (e.keyCode === 39) {
                e.preventDefault();
                currentDay.setMonth(currentDay.getMonth() + 12);
                setDate(currentDay);
            }
        };
    }

    function nextMonth() {
        const nextBtn = document.getElementById('next');
        nextBtn.addEventListener('click', ()=> {
            currentDay.setMonth(currentDay.getMonth() + 12);
            setDate(currentDay);
        });
    }

    function previousMonth() {
        const previousBtn = document.getElementById('previous');
        previousBtn.addEventListener('click', ()=> { 
            currentDay.setMonth(currentDay.getMonth() - 12);
            setDate(currentDay);
        })
    }

    function setDate(date) {
        const year = document.getElementById('date-info-1'); 
        year.textContent = format(date, 'y');
        year.setAttribute('class', 'year-view');
        const month = document.getElementById('date-info-2');
        month.textContent = '';
        setTimeout(()=> {
            domInteractions.runModule();
        }, 100);
        }

    return { displayDate }
})();

export {toYearView}