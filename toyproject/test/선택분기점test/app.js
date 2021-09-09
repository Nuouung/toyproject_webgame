const choiceButtonA = document.getElementById("choiceA");
const choiceButtonB = document.getElementById("choiceB");

function clickA() {
  const resultA = document.getElementById("clickedResultA");
  resultA.classList.remove("hidden");
  choiceButtonA.classList.add("hidden");
  choiceButtonB.classList.add("hidden");
}

function clickB() {
  const resultB = document.getElementById("clickedResultB");
  resultB.classList.remove("hidden");
  choiceButtonA.classList.add("hidden");
  choiceButtonB.classList.add("hidden");
}

choiceButtonA.addEventListener("click", clickA);
choiceButtonB.addEventListener("click", clickB);
