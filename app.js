// Declaration of elements
const darkBtn = document.getElementById('toggle');
const showcase = document.getElementById('showcase');
const input = document.getElementById('todo-input');
const submitBtn = document.getElementById('submit');
const clearBtn = document.getElementById('clear');
const todoList = document.getElementById('list');
const alert = document.getElementById('alert');
const deleteBtn = document.querySelectorAll('#close');

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
    li.className = 'list-item';
    li.innerHTML = `${input.value}<i class="fas fa-times-circle" id="close"></i>`;
    todoList.appendChild(li);
    clearInput();
    Store.addTasks(li.textContent);
    console.log(li.textContent);
  } else {
    alert.style.visibility = 'visible';
    darkBtn.style.zIndex = '-1';
    setTimeout(() => {
      alert.style.visibility = 'hidden';
      darkBtn.style.zIndex = 0;
    }, 3000);
  }
}

function deleteTask(e) {
  if (e.target.id === 'close') {
    e.target.parentElement.remove();
  }
  Store.deleteTasks();
}

// Local storage

class Store {
  static getLocal() {
    let tasks = [];
    if (localStorage.getItem('tasks') === null) {
      return tasks;
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    return tasks;
  }

  static addTasks(task) {
    const tasks = Store.getLocal();

    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  static displayLocal() {
    const tasks = Store.getLocal();

    tasks.forEach((task) => {
      const li = document.createElement('li');
      li.className = 'list-item';
      li.innerHTML = `${task}<i class="fas fa-times-circle" id="close"></i>`;
      todoList.appendChild(li);
    });
  }

  static deleteTasks() {
    const tasks = Store.getLocal();

    tasks.forEach((index) => {
      tasks.splice(index, 1);
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

// Event Listeners

document.addEventListener('DOMContentLoaded', Store.displayLocal);
darkBtn.addEventListener('click', darkMode);
input.addEventListener('change', checkInput);
clearBtn.addEventListener('click', clearInput);
submitBtn.addEventListener('click', addTask);
todoList.addEventListener('click', deleteTask);
