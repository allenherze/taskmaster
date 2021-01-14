// Declaration of elements
const darkBtn = document.getElementById('toggle');
const showcase = document.getElementById('showcase');
const input = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const todoList = document.getElementById('list');
const alert = document.getElementById('alert');

// Toggle Dark Mode
function darkMode() {
  darkBtn.classList.toggle('fa-sun');
  document.documentElement.classList.toggle('dark-mode');
}

// Check the input and view clear button
function checkInput(e) {
  e.preventDefault();
  if (input.value !== '') {
    clearBtn.style.visibility = 'visible';
  } else {
    clearBtn.style.visibility = 'hidden';
  }
}

// Clear the input
function clearInput() {
  input.value = '';
  clearBtn.style.visibility = 'hidden';
}

// Add the task
function addTask() {
  if (input.value !== '') {
    const li = document.createElement('li');
    li.innerHTML = `<li class="list-item">${input.value} <i class="fas fa-times-circle" id="close"></i></li>`;
    todoList.appendChild(li);
    clearInput();
  } else {
    alert.style.visibility = 'visible';
    darkBtn.style.zIndex = '-1';
    setTimeout(() => {
      alert.style.visibility = 'hidden';
      darkBtn.style.zIndex = 0;
    }, 3000);
  }
}

function completeTasks(e) {
  if (e.target.className === 'list-item') {
    e.target.style.textDecoration = 'line-through';
    e.target.style.color = '#ff513b';
  }
}

// Event Listeners

darkBtn.addEventListener('click', darkMode);
input.addEventListener('change', checkInput);
clearBtn.addEventListener('click', clearInput);
submitBtn.addEventListener('click', addTask);
todoList.addEventListener('click', completeTasks);
