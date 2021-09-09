const item = [
  { name: "가발", sexy: 50 },
  { name: "깃털", attack1: 3, attack2: 4 },
];

localStorage.setItem("itemList", JSON.stringify(item));

// 문자열 "monster"를 배열로 호출하는 함수
// JSON.parse(localStorage.getItem("monster"));
