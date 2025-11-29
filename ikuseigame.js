const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// モンスターの初期ステータス
let monster = {
  name: "ピカチュウ",
  hp: 50,
  energy: 30,
  exp: 0
};

function showStatus() {
  console.log(`\n${monster.name} のステータス`);
  console.log(`HP: ${monster.hp}, 元気: ${monster.energy}, 経験値: ${monster.exp}`);
}

function chooseAction() {
  console.log("\n1. 餌をあげる\n2. 遊ぶ\n3. 散歩する\n4. 終了");
  rl.question("選択: ", (answer) => {
    switch(answer) {
      case "1":
        feed();
        break;
      case "2":
        play();
        break;
      case "3":
        walk();
        break;
      case "4":
        console.log("ゲームを終了します！");
        rl.close();
        return;
      default:
        console.log("無効な選択です。");
    }
    showStatus();
    chooseAction();
  });
}

// 行動の関数
function feed() {
  const hpGain = Math.floor(Math.random() * 10) + 5;
  monster.hp += hpGain;
  console.log(`${monster.name} に餌をあげた！HP +${hpGain}`);
}

function play() {
  const energyGain = Math.floor(Math.random() * 8) + 3;
  const expGain = Math.floor(Math.random() * 5) + 1;
  monster.energy += energyGain;
  monster.exp += expGain;
  console.log(`${monster.name} と遊んだ！元気 +${energyGain}, 経験値 +${expGain}`);
}

function walk() {
  const energyGain = Math.floor(Math.random() * 5) + 2;
  monster.energy += energyGain;
  console.log(`${monster.name} と散歩した！元気 +${energyGain}`);
}

// ゲームスタート
console.log("ピカチュウ育成ゲームへようこそ！");
showStatus();
chooseAction();
