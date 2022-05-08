import keys from './keys.js'

class Keyboard {
    constructor(keyboardElem, textareaElem) {
      this.keyboardElem = keyboardElem;
      this.textareaElem = textareaElem;
      this.isCaps = false;
      this.isDown = false;
      this.layout = localStorage.getItem('language') === 'ua' ? 'ua' : 'en';
      this.keys = [];
    }

    //adding buttons from keys.js and setting attributes for them
    createKeyboard() {
        this.keyboardElem.classList.add('keyboard');
        keys.forEach((key) => {
          const keySymbols = document.createElement('button');
          keySymbols.setAttribute('id', key.code);
          keySymbols.setAttribute('type', 'button');
          keySymbols.setAttribute('character-en', key.character.en);
          keySymbols.setAttribute('character-ua', key.character.ua);
          keySymbols.setAttribute('contents-en', key.contents.en);
          keySymbols.setAttribute('contents-ua', key.contents.ua);
          keySymbols.setAttribute('shift-en', key.shift.en);
          keySymbols.setAttribute('shift-ua', key.shift.ua);
          keySymbols.classList.add('key', key.code);
          if (this.layout === 'en'){
            keySymbols.textContent = key.contents.en;
          }else{
            keySymbols.textContent = key.contents.ua;
          }
          this.keyboardElem.appendChild(keySymbols);
          this.keys.push(keySymbols);
        });
      }
}
    
    
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
const keyboardOnPage = new Keyboard(keyboardElem, textarea);
keyboardOnPage.createKeyboard();
// keyboardOnPage.addEventListeners();