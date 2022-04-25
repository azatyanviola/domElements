'use strict';

//* How to add an element  */

const selectedOption = fruit.options[fruit.selectedIndex];
  console.log( selectedOption.value );
  console.log( selectedOption.text );

const newOption = new Option("plum", "Plum");
  fruit.append(newOption);

  
  newOption.selected = true;


  //********************* */

  let area = null;
  let view = document.getElementById('view');

  view.onclick = function() {
    editStart();
  };

  function editStart() {
    area = document.createElement('textarea');
    area.className = 'edit';
    area.value = view.innerHTML;

    area.onkeydown = function(event) {
      if (event.key == 'Enter') {
        this.blur();
      }
    };

    area.onblur = function() {
      editEnd();
    };

    view.replaceWith(area);
    area.focus();
  }

  function editEnd() {
    view.innerHTML = area.value;
    area.replaceWith(view);
  } 


  //**** How to move the mouse  */

  mouse.tabIndex = 0;

mouse.onfocus = () => {
    mouse.style.position = 'fixed';
    document.addEventListener('keydown', moveMouse)
}

mouse.onblur  = () => {
    document.removeEventListener('keydown', moveMouse);
}

function moveMouse(e){
    const mouseCoords = mouse.getBoundingClientRect();
    if(e.code == 'ArrowRight'){
        mouse.style.left = mouseCoords.left + mouse.offsetWidth + 'px';
    }else if(e.code == 'ArrowLeft'){
        mouse.style.left = mouseCoords.left - mouse.offsetWidth + 'px';
    }else if(e.code == 'ArrowUp'){
        mouse.style.top = mouseCoords.top - mouse.offsetHeight + 'px';
    }else if(e.code == 'ArrowDown'){
        mouse.style.top = mouseCoords.top + mouse.offsetHeight + 'px';
    }
}

/**  Calculator   */
const form = document.forms.calculator;
const moneyBefore = document.getElementById('money-before');
const moneyAfter = document.getElementById('money-after');
const heightAfter = document.getElementById('height-after');

updateDiagram();

form.money.addEventListener('input', inputHandler);
form.months.addEventListener('change', inputHandler);
form.interest.addEventListener('input', inputHandler);

function inputHandler(e) {
  updateDiagram();
}

function calculateProfit(initial, interest, months) {
  return Math.round(initial * (1 + interest / 100 * months / 12));
}

function updateDiagram() {
  moneyBefore.textContent = form.money.value;
  moneyAfter.textContent = calculateProfit(form.money.value, form.interest.value, form.months.selectedOptions[0].value);
  heightAfter.style.height = moneyAfter.textContent / moneyBefore.textContent * 100 + 'px';
}

//**The window with form */

function showCover() {
  const coverDiv = document.createElement('div');
  coverDiv.id = 'cover-div';

  
  document.body.style.overflowY = 'hidden';

  document.body.append(coverDiv);
}

function hideCover() {
  document.getElementById('cover-div').remove();
  document.body.style.overflowY = '';
}

function showPrompt(text, callback) {
  showCover();
  let form = document.getElementById('prompt-form');
  let container = document.getElementById('prompt-form-container');
  document.getElementById('prompt-message').innerHTML = text;
  form.text.value = '';

  function complete(value) {
    hideCover();
    container.style.display = 'none';
    document.onkeydown = null;
    callback(value);
  }

  form.onsubmit = function() {
    let value = form.text.value;
    if (value == '') return false; 

    complete(value);
    return false;
  };

  form.cancel.onclick = function() {
    complete(null);
  };

  document.onkeydown = function(e) {
    if (e.key == 'Escape') {
      complete(null);
    }
  };

  let lastElem = form.elements[form.elements.length - 1];
  let firstElem = form.elements[0];

  lastElem.onkeydown = function(e) {
    if (e.key == 'Tab' && !e.shiftKey) {
      firstElem.focus();
      return false;
    }
  };

  firstElem.onkeydown = function(e) {
    if (e.key == 'Tab' && e.shiftKey) {
      lastElem.focus();
      return false;
    }
  };

  container.style.display = 'block';
  form.elements.text.focus();
}

document.getElementById('show-button').onclick = function() {
  showPrompt('Enter aniything', function(value) {
    console.log('You entered' + ' ' + value);
  });
};
