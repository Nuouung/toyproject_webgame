const newGame = document.getElementById("newGame");
const loadGame = document.getElementById("loadGame");

function clickNewGame() {
  if (
    confirm(
      "게임을 새로 시작하면 이전의 진행사항이 전부 초기화됩니다. 정말로 게임을 새로 시작하시겠어요?"
    )
  ) {
    // YES
    location.replace("./selectCharacter.html");
    localStorage.removeItem("inventory");
    localStorage.removeItem("playerChar");
  } else {
    // NO
  }
}

newGame.addEventListener("click", clickNewGame);
