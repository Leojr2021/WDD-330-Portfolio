const links = [
  {
    label: "Week1 notes",
    url: "week1/index.html",
  },
  {
    label: "Week2 notes",
    url: "week2/index.html",
  },
  {
    label: "Week3 notes",
    url: "week3/index.html",
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
