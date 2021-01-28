import { format, compareAsc } from 'date-fns';
import {domInteractions} from './dom.js'

const toDayView = (()=> {
    let currentDay = new Date();

    function displayDate() {
        // Underline the menu item
        document.getElementById('day').style.borderBottom = '3px solid rgb(213, 101, 138)';
        document.getElementById('day').setAttribute('class', 'current-page');
        
        setDate(currentDay);
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
        month.textContent = format(date, 'LLL d, y');
        setTimeout(()=> {
            domInteractions.runModule();
        }, 100);
        }

    return { displayDate }
})();

export {toDayView}