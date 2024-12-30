
const todoInput = document.getElementById('todo-input');
const dueDateInput = document.getElementById('due-date');
const categorySelect = document.getElementById('category-select');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
const filterCategory = document.getElementById('filter-category');
const sortBy = document.getElementById('sort-by');

let todos = JSON.parse(localStorage.getItem('todos')) || [];

addTodoButton.addEventListener('click', addTodo);

function addTodo() {
    const todoText = todoInput.value.trim();
    const dueDate = dueDateInput.value;
    const category = categorySelect.value;

    if (todoText) {
        const todo = {
            id: Date.now(),
            text: todoText,
            completed: false,
            dueDate: dueDate,
            category: category,
            dateAdded: new Date().toISOString()
        };

        todos.push(todo);
        updateLocalStorage();
        renderTodoList();

        todoInput.value = '';
        dueDateInput.value = '';
        categorySelect.value = '';
    }
}

function renderTodoList() {
    todoList.innerHTML = '';

    const filteredTodos = filterTodos();
    const sortedTodos = sortTodos(filteredTodos);

    sortedTodos.forEach(todo => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="todo-item ${todo.completed ? 'completed' : ''}">
                <span>${todo.text}</span>
                <span>${todo.dueDate ? `Due: ${todo.dueDate}` : ''}</span>
                <span>${todo.category}</span>
                <div class="todo-actions">
                    <button onclick="toggleTodo(${todo.id})">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button onclick="editTodo(${todo.id})">Edit</button>
                    <button onclick="deleteTodo(${todo.id})">Delete</button>
                </div>
            </div>
        `;
        todoList.appendChild(li);
    });
}


function toggleTodo(id) {
    todos = todos.map(todo => 
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    updateLocalStorage();
    renderTodoList();
}

function editTodo(id) {
    const todo = todos.find(todo => todo.id === id);
    const newText = prompt('Edit todo:', todo.text);
    if (newText !== null) {
        todos = todos.map(todo => 
            todo.id === id ? { ...todo, text: newText.trim() } : todo
        );
        updateLocalStorage();
        renderTodoList();
    }
}


function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    updateLocalStorage();
    renderTodoList();
}

filterCategory.addEventListener('change', renderTodoList);

function filterTodos() {
    const category = filterCategory.value;
    return category ? todos.filter(todo => todo.category === category) : todos;
}

sortBy.addEventListener('change', renderTodoList);

function sortTodos(todosToSort) {
    const sortType = sortBy.value;
    return todosToSort.sort((a, b) => {
        if (sortType === 'due-date') {
            return new Date(a.dueDate) - new Date(b.dueDate);
        } else {
            return new Date(a.dateAdded) - new Date(b.dateAdded);
        }
    });
}

function updateLocalStorage() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

renderTodoList();


document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const playPauseBtn = document.getElementById('play-pause');
    const progressBar = document.getElementById('progress-bar');
    const volumeControl = document.getElementById('volume');
    const playbackSpeed = document.getElementById('playback-speed');
    const fullscreenBtn = document.getElementById('fullscreen');


    function togglePlayPause() {
        if (video.paused) {
            video.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            video.pause();
            playPauseBtn.textContent = 'Play';
        }
    }


    playPauseBtn.addEventListener('click', togglePlayPause);
    video.addEventListener('click', togglePlayPause);

    video.addEventListener('timeupdate', () => {
        const progress = (video.currentTime / video.duration) * 100;
        progressBar.value = progress;
    });

 
    progressBar.addEventListener('input', () => {
        const time = (progressBar.value / 100) * video.duration;
        video.currentTime = time;
    });


    volumeControl.addEventListener('input', () => {
        video.volume = volumeControl.value;
    });

    
    playbackSpeed.addEventListener('change', () => {
        video.playbackRate = parseFloat(playbackSpeed.value);
    });

    fullscreenBtn.addEventListener('click', () => {
        if (video.requestFullscreen) {
            video.requestFullscreen();
        } else if (video.mozRequestFullScreen) { 
            video.mozRequestFullScreen();
        } else if (video.webkitRequestFullscreen) {
            video.webkitRequestFullscreen();
        } else if (video.msRequestFullscreen) {
            video.msRequestFullscreen();
        }
    });
});


