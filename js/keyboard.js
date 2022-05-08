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
    createKeyboard(){
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

    
    //moving cursor through text, delete and backspace functionality
    workWithText(text, param){
        let startOfPointer = this.textareaElem.selectionStart;
        let endOfPointer = this.textareaElem.selectionEnd;
        if (this.textareaElem.selectionStart === this.textareaElem.selectionEnd){
          if (param === 'Delete') endOfPointer += 1;
          else if(param === 'Backspace'){
            startOfPointer = Math.max(0, startOfPointer - 1);
          } 
        }
        if (param === 'Delete' || param === 'Backspace'){
          this.textareaElem.setRangeText('', startOfPointer, endOfPointer);
        }else this.textareaElem.setRangeText(text);
    
        this.textareaElem.selectionStart = startOfPointer + text.length;
        this.textareaElem.selectionEnd = this.textareaElem.selectionStart;
    }

    //interacting with Shift
    shiftText(capsOff){
        this.keys.forEach((key) => {
            if (capsOff || key.getAttribute('character-en') === 'letter'){
                const tmp = key.getAttribute('contents-en');
                key.setAttribute('contents-en', key.getAttribute('shift-en'));
                key.setAttribute('shift-en', tmp);
            }
            if (capsOff || key.getAttribute('character-ua') === 'letter'){
                const tmp = key.getAttribute('contents-ua');
                key.setAttribute('contents-ua', key.getAttribute('shift-ua'));
                key.setAttribute('shift-ua', tmp);
            }
            if (this.layout === 'en'){
                key.innerText = key.getAttribute('contents-en');
              }else{
                key.innerText = key.getAttribute('contents-ua');
              }
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