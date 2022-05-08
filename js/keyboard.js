import keys from './keys'

//create elements
const wrapper = document.createElement('div');
const title = document.createElement('h1');
const textarea = document.createElement('textarea');
const keyboardElem = document.createElement('div');
const info = document.createElement('h2');


//adding content to elements
wrapper.classList.add('wrapper');
title.textContent = 'Virtual keyboard';
info.innerText = 'Создана в macOS\nСмена языка: Ctrl + Cmd (⌘) (должно работать с WindowsKey для Windows, но не тестировал)';


//building DOM
wrapper.appendChild(title);
wrapper.appendChild(info);
wrapper.appendChild(textarea);
wrapper.appendChild(keyboardElem);
document.body.appendChild(wrapper);

//adding keyboard to the page
const keyboardObj = new Keyboard(keyboardElem, textarea);
keyboardObj.keyboardGen();
keyboardObj.addListeners();

//locking focus on textarea
textarea.focus();