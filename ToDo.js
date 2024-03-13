const addBtn = document.querySelector("#add-btn");
const newTaskInput = document.querySelector("#wrapper input");
const TaskContainer = document.querySelector("#tasks");
const error = document.getElementById("error");
const countValue = document.querySelector("count-value");


let TaskCount = 0;

const displayCount = (TaskCount) => {
    countValue.innerText = TaskCount;
};



