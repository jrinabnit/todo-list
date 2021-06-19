const form = document.getElementById('form');
const input = document.getElementById('input');
const todosUL = document.getElementById('todos');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
	todos.forEach((todo) => addTodo(todo));
}

form.addEventListener('submit', (e) => {
	e.preventDefault();
	addTodo();
});

function addTodo(todo) {
	let todoText = input.value;

	if (todo) {
		todoText = todo.text;
	}

	if (todoText) {
		const todoEl = document.createElement('li');

		if (todo && todo.completed) {
			todoEl.classList.add('completed');
		}

		//Use the text from the created element to be the text of the displayed element
		todoEl.innerText = todoText;

		todoEl.addEventListener('click', () => {
			todoEl.classList.toggle('completed');
			updateLS();
		});

		//Remove list item with right-click
		todoEl.addEventListener('contextmenu', (e) => {
			e.preventDefault();
			todoEl.remove();
			updateLS();
		});

		//Add the todo to the ui
		todosUL.appendChild(todoEl);

		//Clear the form
		input.value = '';

		updateLS();
	}
}

//Update local storage with todo list items
function updateLS() {
	todosEl = document.querySelectorAll('li');

	const todos = [];

	todosEl.forEach((todoEl) => {
		todos.push({
			text: todoEl.innerText,
			completed: todoEl.classList.contains('completed'),
		});
	});

	localStorage.setItem('todos', JSON.stringify(todos));
}
