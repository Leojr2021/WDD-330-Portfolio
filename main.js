const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html",
  },
  {
    label: "Week2 notes",
    url: "week2/notes/notes.html",
  },
  {
    label: "Week3 notes",
    url: "week3/index.html",
  },
  {
    label: "Week4 notes",
    url: "week4/index.html",
  },
  {
    label: "Week5 notes",
    url: "week5/index.html",
  },
  {
    label: "Week6 ToDo App",
    url: "week6/index.html",
  },
  {
    label: "Week7 notes",
    url: "week7/index.html",
  },
  {
    label: "Week8 notes",
    url: "week8/index.html",
  },
  {
    label: "Week9 notes",
    url: "week9/index.html",
  },
  {
    label: "Week10 notes",
    url: "week10/index.html",
  },
];


// const lista = document.querySelector("ol");
// const li = document.createElement("li");

// li.innerHTML = `<a href="${element.url}">${element.label}</a>`;



links.forEach((element) => {
//   for (const key in element) {
//     console.log(`${key} / ${element[key]}`);
//   }
// lista.appendChild(li)
document.querySelector("ol").innerHTML += `<li><a href="${element.url}">${element.label}</a></li>`;
});


//  document.querySelector("ol").innerHTML = `<li><a href="${element.url}">${element.label}</a></li>`;
// console.log(el);
