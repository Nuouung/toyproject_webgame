const monsterStatus = document.getElementById("monsterStatus");
const cat = JSON.parse(localStorage.getItem("monster"))[0];
const attack = document.getElementById("buttonAttack");
const showdamage = document.getElementById("showDamage");
const showDamagePlayer = document.getElementById("showDamagePlayer");

// 방어 관련
const defense = document.getElementById("buttonDefense");
const showDefenseSucceed = document.getElementById("doesDefenseSucceed");

// 임시로 플레이어의 HP를 로컬스토리지에 저장하겠음!! (기능 테스트를 위해)
const player = [{ name: "김개똥", HP: 20, currentHP: 20, attack: 3 }];
const player1 = JSON.parse(localStorage.getItem("player"))[0];

localStorage.setItem("player", JSON.stringify(player));

monsterStatus.innerText = `
  이름 : ${cat.name}
  체력 : ${cat.HP}
`;

playerStatus.innerText = `
  이름 : ${player1.name}
  체력 : ${player1.HP}
`;

function playerAttack(critical = 1) {
  let damageP = Math.floor(3 * Math.random() + 1);
  const FINALDAMAGEP = damageP * critical;
  console.log(FINALDAMAGEP);
  cat.currentHP = cat.currentHP - FINALDAMAGEP;
  showdamage.innerText = FINALDAMAGEP;

  monsterStatus.innerText = `
      이름 : ${cat.name}
      체력 : ${cat.currentHP}
      `;
}

function monsterAttack(defenseDiscount = 1) {
  let damageM = Math.floor(cat.attack * Math.random() + 1);
  const FINALDAMAGEM = parseInt(damageM / defenseDiscount);
  player1.currentHP = player1.currentHP - FINALDAMAGEM;
  showDamagePlayer.innerText = FINALDAMAGEM;

  playerStatus.innerText = `
  이름 : ${player1.name}
  체력 : ${player1.currentHP}
  `;

  // 3. 캐릭터의 사망 여부 체크 (setTimeout 함수 때문에 부득이하게 이리로 옮김)
  if (player1.currentHP <= 0) {
    showDamagePlayer.innerText = "당신은 죽었습니다.";
  }
}

function pressAttackKey() {
  // 1. 플레이어의 공격 (무기 yes or no 체크)
  if (localStorage.getItem("mugi") == null) {
    playerAttack();
  } // 무기 있으면 else

  // 2. 몬스터의 사망 여부 체크
  if (cat.currentHP <= 0) {
    showdamage.innerText = "캣이 죽었다!!!";
    cat.currentHP = cat.HP;
    // 전투 종료 로직 (보상체제 등등)
  } else {
    setTimeout(monsterAttack, 400);
  }

  // 3. 캐릭터의 사망 여부 체크 (monsterAttack 함수 내에 있음)
}

attack.addEventListener("click", pressAttackKey);
// 공격 관련 코드 끝

// 새로운 코드 시작 (방어)
// 상세한 것은 크툴루의부름 룰북을 보고 판정 등을 상세히 할 것. 로직 구현만 해놓겠음.
// 회피값 20으로 가정.
// 대성공(1~4) - 데미지 0 + 나도 공격한다. (2배 크리티컬)
// 성공(5~10) - 데미지 1/5 (소수점은 버린다)
// 실패(11~20) - 원래의 데미지

function pressDefenseKey() {
  let probable1to20 = Math.floor(Math.random() * 20 + 1); // 1 ~ 20
  console.log(probable1to20);

  // 1. 방어 판정
  if (probable1to20 < 5) {
    // 대성공
    showDefenseSucceed.innerText = "방어 대성공! 회피 후 공격을 실시합니다.";
    playerAttack(2);
  } else if (probable1to20 < 11 && probable1to20 > 4) {
    // 성공
    monsterAttack(5);
    showDefenseSucceed.innerText = "방어 성공";
  } else {
    // 실패
    monsterAttack();
    showDefenseSucceed.innerText = "방어 실패";
  }

  // 2. 몬스터의 사망 여부 체크
  if (cat.currentHP <= 0) {
    showdamage.innerText = "캣이 죽었다!!!";
    cat.currentHP = cat.HP;
    // 전투 종료 로직 (보상체제 등등)
  }
}

defense.addEventListener("click", pressDefenseKey);
//방어 관련 코드 끝

//새로운 코드 시작(도망)
//새로운 코드 시작(스킬)
