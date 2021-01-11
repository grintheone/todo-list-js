import { fromUnixTime } from "date-fns";
import './style/style.css';
import {todo} from './logic.js';
import {appendToTheDom} from './dom.js';

var list = document.querySelectorAll('ul');
for (let i = 0; i < list.length; i++) {
    list[i].addEventListener('click', function(ev) {
        if (ev.target.tagName === 'LI') {
           ev.target.classList.toggle('done');
        }
      }, false);
}
