const showMoreBtn = document.getElementById("charInfoBtn");
const charInfo = document.getElementById("charInfo");
const showMoreCard = document.getElementById("showMoreCard");
const backButton = document.getElementById("backButton");
const selectCharBtn = document.getElementById("selectCharacterBtn");

const charArray = JSON.parse(localStorage.getItem("character"));

function clickShowMoreBtn() {
  showMoreCard.classList.remove("hidden");
  charInfo.classList.add("hidden");
}

function clickBackButton() {
  charInfo.classList.remove("hidden");
  showMoreCard.classList.add("hidden");
}

function clickSelCharBtn() {
  localStorage.setItem("playerChar", JSON.stringify(charArray[0]));
  location.replace("./chapter1.html");
}

showMoreBtn.addEventListener("click", clickShowMoreBtn);
backButton.addEventListener("click", clickBackButton);
selectCharBtn.addEventListener("click", clickSelCharBtn);
