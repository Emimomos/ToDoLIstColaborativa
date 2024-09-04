
const groups = {};  // Para almacenar los grupos y sus miembros

document.getElementById('create-group').addEventListener('click', function() {
    const groupName = document.getElementById('group-name').value;
    if (groupName === '') {
        alert('Please enter a group name');
        return;
    }

    if (groups[groupName]) {
        alert('Group already exists');
        return;
    }

    groups[groupName] = { members: [], tasks: [] };
    const groupSelect = document.getElementById('groups');
    const newOption = document.createElement('option');
    newOption.textContent = groupName;
    newOption.value = groupName;
    groupSelect.appendChild(newOption);

    document.getElementById('group-name').value = '';
    document.getElementById('invite-section').style.display = 'block';
});

document.getElementById('invite-user').addEventListener('click', function() {
    const selectedGroup = document.getElementById('groups').value;
    const inviteUsername = document.getElementById('invite-username').value;

    if (selectedGroup && inviteUsername) {
        groups[selectedGroup].members.push(inviteUsername);
        alert(`User ${inviteUsername} invited to group ${selectedGroup}`);
        document.getElementById('invite-username').value = '';
    } else {
        alert('Please select a group and enter a username');
    }
});

document.getElementById('groups').addEventListener('change', function() {
    const selectedGroup = this.value;
    const taskSection = document.getElementById('task-section');
    const taskList = document.getElementById('task-list');

    if (selectedGroup) {
        taskSection.style.display = 'block';
        taskList.innerHTML = '';

        groups[selectedGroup].tasks.forEach(task => {
            const newTask = document.createElement('li');
            newTask.textContent = task.text;

            if (task.completed) {
                newTask.classList.add('completed');
            }

            newTask.addEventListener('click', function() {
                newTask.classList.toggle('completed');
                task.completed = !task.completed;
            });

            taskList.appendChild(newTask);
        });
    } else {
        taskSection.style.display = 'none';
    }
});

document.getElementById('add-task').addEventListener('click', function() {
    const selectedGroup = document.getElementById('groups').value;
    const taskText = document.getElementById('new-task').value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = { text: taskText, completed: false };
    groups[selectedGroup].tasks.push(newTask);

    const taskList = document.getElementById('task-list');
    const newTaskElement = document.createElement('li');
    newTaskElement.textContent = taskText;

    newTaskElement.addEventListener('click', function() {
        newTaskElement.classList.toggle('completed');
        newTask.completed = !newTask.completed;
    });

    taskList.appendChild(newTaskElement);
    document.getElementById('new-task').value = '';
});
