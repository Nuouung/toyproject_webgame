// attack은 데미지. 2는 1D2를 의미한다.
// 데미지 산출 식 (x는 주사위면체의 값 ex. 6면체라면 x = 6)
// Math.floor(x*Math.random() + 1)
// (중요) 몬스터는 따로 파일로 만들어서 변수에 모든 몬스터 정보를 기입할 것
// ex) Monster[0] = 고양이 / Monster[1] = 코뿔소
const monster = [
  { name: "분장사근육맨", HP: 50, currentHP: 50, attack: "1D2 + 1D3" },
  { name: "코뿔소", HP: 120, currentHP: 120, attack: 10 },
];

localStorage.setItem("monster", JSON.stringify(monster));

// 문자열 "monster"를 배열로 호출하는 함수
// JSON.parse(localStorage.getItem("monster"));
