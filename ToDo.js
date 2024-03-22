const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const tasksContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector(".count-value");


let taskCount = 0;
let isEditing = false;
let currentEditTask = null;

const displayCount = (taskCount) => {
    // On modifie ici pour ajuster le mot "tâche" en fonction du nombre
    countValue.innerText = taskCount + (taskCount > 1 ? " tasks" : " task");
};

const updateTaskCount = (delta) => {
    taskCount = Math.max(0, taskCount + delta);
    displayCount(taskCount);
};

const addOrEditTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display = "none";
    
    if (!taskName) {
        setTimeout(() => {
            error.style.display = "block";
        }, 200);
        return;
    }

    if (isEditing && currentEditTask) {
        currentEditTask.querySelector(".taskname").innerText = taskName;
        newTaskInput.value = "";
        isEditing = false;
        currentEditTask = null;
    } else {
        const task = `<div class="task">
            <input type="checkbox" class="task-check">
            <span class="taskname">${taskName}</span>
            <button class="edit">
            <i class="fa-solid fa-pen-to-square"></i>
            </button>
            <button class="delete">
            <i class="fa-solid fa-trash"></i>
            </button>
            </div>`;

        tasksContainer.insertAdjacentHTML('beforeend', task);
        const currentTask = tasksContainer.lastElementChild;
        setupTaskActions(currentTask);
        updateTaskCount(1);
    }
    newTaskInput.value = "";
};

const setupTaskActions = (taskElement) => {
    const deleteButton = taskElement.querySelector(".delete");
    const editButton = taskElement.querySelector(".edit");
    const checkbox = taskElement.querySelector(".task-check"); // Sélection de la case à cocher

    deleteButton.onclick = () => {
        taskElement.remove();
        if (!taskElement.classList.contains("completed")) {
            updateTaskCount(-1); // On met à jour le compteur seulement si la tâche n'était pas marquée comme accomplie
        }
    };

    editButton.onclick = () => {
        newTaskInput.value = taskElement.querySelector(".taskname").innerText;
        isEditing = true;
        currentEditTask = taskElement;
    };

    checkbox.onchange = () => { // Écouteur d'événements pour la case à cocher
        if (checkbox.checked) {
            taskElement.classList.add("completed"); // Ajoute la classe si la tâche est cochée
            updateTaskCount(-1); // Décrémente le compteur car une tâche vient d'être accomplie
        } else {
            taskElement.classList.remove("completed"); // Retire la classe si la tâche est décochée
            updateTaskCount(1); // Incrémente le compteur car la tâche est à nouveau active
        }
    };
};



addBtn.addEventListener("click", addOrEditTask);

window.onload = () => {
    taskCount = 0;
    displayCount(taskCount);
    newTaskInput.value = "";
};
