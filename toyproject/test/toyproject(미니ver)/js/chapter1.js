const magicHair = document.getElementById("magicHair");
const feather = document.getElementById("feather");
const whenClickFeather = document.getElementById("clickFeather");
const beforeBtnBody = document.getElementById("beforeBtn");

// [전투 관련 상수]
const monsterStatus = document.getElementById("monsterStatus");
// 분장사근육몬
const cat = JSON.parse(localStorage.getItem("monster"))[0];
const attack = document.getElementById("buttonAttack");
const showdamage = document.getElementById("showDamage");
const showDamagePlayer = document.getElementById("showDamagePlayer");

// 방어 관련
const defense = document.getElementById("buttonDefense");
const showDefenseSucceed = document.getElementById("doesDefenseSucceed");

//플레이어
const player1 = JSON.parse(localStorage.getItem("playerChar"));
const weapon = JSON.parse(localStorage.getItem("weapon"));
// [전투 관련 상수 끝]

// [전투 주사위 판정 함수]
function measureDamage(xD, Dx) {
  return xD * Math.floor(Dx * Math.random() + 1);
}

// [버튼 누르는 기능]
function clickfeatherBtn() {
  whenClickFeather.classList.remove("hidden");
  let getInventory = JSON.parse(localStorage.getItem("itemList"))[1];
  localStorage.setItem("weapon", JSON.stringify(getInventory));
  beforeBtnBody.classList.add("hidden");
}

feather.addEventListener("click", clickfeatherBtn);

// [전투 기능]
monsterStatus.innerText = `
  이름 : ${cat.name}
  체력 : ${cat.HP}
`;

playerStatus.innerText = `
  이름 : ${player1.name}
  체력 : ${player1.HP}
`;

function playerAttack(critical = 1, plusDamage = 0) {
  let damageP = Math.floor(3 * Math.random() + 1);
  const FINALDAMAGEP = damageP * critical + plusDamage;
  console.log("손공격 : ", damageP * critical);
  console.log("플러스데미지 : ", plusDamage);
  console.log("총 공격 : ", FINALDAMAGEP);
  cat.currentHP = cat.currentHP - FINALDAMAGEP;
  showdamage.innerText = FINALDAMAGEP;

  monsterStatus.innerText = `
      이름 : ${cat.name}
      체력 : ${cat.currentHP}
      `;
}

function monsterAttack(defenseDiscount = 1) {
  let damageM = measureDamage(1, 3);
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

function weaponDamage(xD, Dx) {
  return xD * Math.floor(Dx * Math.random() + 1);
}

function pressAttackKey() {
  // 1. 플레이어의 공격 (무기 yes or no 체크)
  if (localStorage.getItem("weapon") == null) {
    playerAttack();
  } else {
    // 무기 데미지 정보를 로드한다.
    let xD = weapon.attack1;
    let Dx = weapon.attack2;
    // weaponDamage함수를 호출해 데미지값을 리턴받는다.
    let plusDamage = weaponDamage(xD, Dx);
    // playerAttack함수 두번째 인자로 리턴받은 값을 넣는다.
    playerAttack(1, plusDamage);
  }

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
// [전투 기능 끝]
