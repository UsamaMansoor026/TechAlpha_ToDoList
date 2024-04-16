/* Accessing the HTML element that are required to complete this task */
const userInput = document.getElementById("tasks");
const addTaskBtn = document.getElementById("addTask");
const resultList = document.getElementById("resultTask");
const error = document.getElementById("error");

/* Adding click eventListner to the button that add the task to our resultTask container */
addTaskBtn.addEventListener("click", () => {
  /* 
    Check if input field is empty and user press the addTask button then it display error message to enter the task first.
    else it add the task
   */
  if (userInput.value === "") {
    error.innerHTML = "Please enter task First";
  } else {
    /* 
      Actually I created a ul list as a parent element and each li child element of that ul represent each individual task. I am creating li element named 'task' and then assigning the input field text to that li element and then appending that li element to the parent ul element.
    */
    let task = document.createElement("li");
    task.innerHTML = userInput.value;
    resultList.appendChild(task);

    /*
      Creating a span element inside the li tag that work as a delete button.
    */
    let deleteBtn = document.createElement("span");
    deleteBtn.innerHTML = "\u00d7";
    task.appendChild(deleteBtn);

    /* Setting the empty value to the error message and input field after adding task/ */
    error.innerHTML = "";
    userInput.value = "";

    /* Calling this function inside the addTask because I have to save the newly added task to the local storage */
    saveToLocalStorage();
  }
});

/* This function save the whole ul element to the local storage so that user toDo's remains safe. */
const saveToLocalStorage = () => {
  localStorage.setItem("tasks", resultList.innerHTML);
};

/* This function is used to retrieve the all tasks from the local storage */
const getLocalStorageNotes = () => {
  resultList.innerHTML = localStorage.getItem("tasks");
};

/*
  I added the click eventListener to the parent ul element and then checking if the user click on the li element then mark this li as completed or if it already completed and user clicked on that completed li then it marked as incomplete.
  Then I checking if the user click on the span tag which act as a deleteBtn then it remove that li element from the parent ul list.
  This way I find more easy to handle complete and delete functionality.
*/
resultList.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("completed");
    saveToLocalStorage();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveToLocalStorage();
  }
});

/* This function call displays all the already added tasks to the web page. */
getLocalStorageNotes();
