// Display Date

function displayDate(){
    let date = new Date();
    date= date.toString().split(" ")
    document.querySelector('#date').innerHTML = date[1] + " " + date[2] + " " + date[3];
}


// end display date
const addBtn = document.querySelector('#add-btn');
const newTaskInput = document.querySelector('#wrapper input');
const taskContainer = document.querySelector('#tasks');
const error = document.getElementById('error');
const countValue = document.querySelector('.count-value');

let taskCount =0;

const displayCount = (taskCount) => {
    countValue.innerText =taskCount;
};
const addTask = () => {
    const taskName = newTaskInput.value.trim();
    error.style.display="none";
    if(!taskName){
        setTimeout(() => {
            error.style.display="block";
        },200);
        return;

    }
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
    
    taskContainer.insertAdjacentHTML("beforeend",task);
    const deleteButtons = document.querySelectorAll('.delete');
    deleteButtons.forEach(button => {
        button.onclick = () => {
            button.parentNode.remove();
            taskCount -= 1;
            displayCount(taskCount);
        };
    });
    const editbuttons = document.querySelectorAll('.edit');
    editbuttons.forEach((editBtn) => {
        editBtn.onclick = (e) => {
            let targetElement = e.target;
            if(!(e.target.className =="edit")) {
                targetElement = e.target.parentElement;
            }
            newTaskInput.value = targetElement.previousElementSibling?.innerText;
            newTaskInput.focus();
            targetElement.parentNode.remove();
            taskCount -=1;
            displayCount(taskCount);
        };
    });
    const taskCheck = document.querySelectorAll('.task-check');
    taskCheck.forEach((checkBox) => {
        checkBox.onchange = () => {
            checkBox.nextElementSibling.classList.toggle("completed");
            if (checkBox.checked) {
                taskCount -= 1;
            } else {
                taskCount += 1;
            }
            displayCount(taskCount);
            };
        });
        taskCount += 1;
        displayCount(taskCount);
        newTaskInput.value ="";
        newTaskInput.focus();
};


addBtn.addEventListener('click',addTask);

window.onload = () => {
    taskCount = 0 ;
    displayCount(taskCount);
    newTaskInput.value ="";
    displayDate();
};