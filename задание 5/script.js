document.addEventListener('DOMContentLoaded', () => {
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = []; 

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');
            }

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Удалить';
            deleteButton.addEventListener('click', () => deleteTask(index));

            const completeButton = document.createElement('button');
            completeButton.textContent = task.completed ? 'Не выполнено' : 'Выполнено';
            completeButton.addEventListener('click', () => toggleComplete(index));

            li.appendChild(completeButton);
            li.appendChild(deleteButton);
            taskList.appendChild(li);
        });
    }

    function addTask() {
        const taskText = newTaskInput.value.trim();
        if (taskText) {
            tasks.push({ text: taskText, completed: false });
            newTaskInput.value = '';
            renderTasks();
        }
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        renderTasks();
    }

    function toggleComplete(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    }

    addTaskButton.addEventListener('click', addTask);

    renderTasks(); 
});