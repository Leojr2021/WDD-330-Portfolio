var enterButton = document.getElementById("enter");
var input = document.getElementById("userInput");
var ul = document.querySelector("ul");
var item = document.getElementsByTagName("li");
var taskList = [];

loadpage();

function inputLength() {
  return input.value.length;
}

function listLength() {
  return item.length;
}

function loadpage() {
  document.addEventListener("DOMContentLoaded", () => {
    render();
  });

  ul.addEventListener("click", handleClick);
}

function render(array) {
  ul.innerHTML = "";
  // const listArray = JSON.parse(localStorage.getItem("toDoList"));
  // console.log(listArray);

  array?.forEach((e) => {
    let li = document.createElement("li");
    li.innerHTML = `${e.content} <span taskId="${e.id}">X</span>`;
    ul.appendChild(li);
    e.completed && li.classList.add("done");
  });
}

function handleClick(e) {
  if (e.target.tagName == "SPAN") {
    const deleteId = parseInt(e.target.getAttribute("taskid"));
    console.log(deleteId);
    const listArrayDelete = JSON.parse(localStorage.getItem("toDoList"));
    let filterArray = listArrayDelete.filter((e) => e.id !== deleteId);

    taskList = filterArray;
    sincronizationStorage(filterArray);

    render(filterArray);
  } else {
    console.log(e.target);

    const completeId = parseInt(
      e.target.getElementsByTagName("SPAN")[0].getAttribute("taskid")
    );
    console.log(completeId);

    taskList.forEach((e) => e.id === completeId && (e.completed = true));
    sincronizationStorage(taskList);
    render(taskList);
  }
}

function createListElement() {
  let toDo = { id: Date.now(), content: input.value, completed: false };

  localStorage.setItem("todo", JSON.stringify(toDo));
  taskList.push(toDo);
  localStorage.setItem("toDoList", JSON.stringify(taskList));

  render(taskList);

  input.value = ""; //Reset text input field
}

function sincronizationStorage(array) {
  localStorage.setItem("toDoList", JSON.stringify(array));
}

function addListAfterClick() {
  if (inputLength() > 0) {
    //makes sure that an empty input field doesn't create a li
    createListElement();
  }
}

function addListAfterKeypress(event) {
  if (inputLength() > 0 && event.which === 13) {
    //this now looks to see if you hit "enter"/"return"
    //the 13 is the enter key's keycode, this could also be display by event.keyCode === 13
    createListElement();
  }
}

enterButton.addEventListener("click", addListAfterClick);

input.addEventListener("keypress", addListAfterKeypress);

function handleComplete() {
  const listArrayfilter = JSON.parse(localStorage.getItem("toDoList"));
  let completeElements = listArrayfilter.filter((e) => e.completed === true);
  console.log(completeElements);

  render(completeElements);
}

function handlePending() {
  const listArrayfilter = JSON.parse(localStorage.getItem("toDoList"));
  let completeElements = listArrayfilter.filter((e) => e.completed === false);
  console.log(completeElements);

  render(completeElements);
}
function handleAll() {
  const listArrayfilter = JSON.parse(localStorage.getItem("toDoList"));

  render(listArrayfilter);
}
