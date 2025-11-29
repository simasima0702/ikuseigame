import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// memory.json 読み込み
let memory = {};
try {
  memory = JSON.parse(fs.readFileSync('./memory.json', 'utf8'));
} catch {
  memory = {};
}

// 待機メッセージ表示関数
function showPrompt() {
  const count = Object.keys(memory).length;
  if (count === 0) {
    console.log("AI: まだ人間の言葉わからないニャ…");
  } else {
    console.log(`AI: 話しかけてニャ！（覚えてる言葉 ${count} 個）`);
  }
  rl.prompt();
}

// 初回表示
showPrompt();

rl.setPrompt('あなた: ');

rl.on('line', (line) => {
  const input = line.trim();

  // 会話終了
  if (input === "さようなら") {
    console.log("AI: バイバイ！また遊ぼうニャ！");
    rl.close();
    return;
  }

  // 言葉を覚えさせる
  if (input.startsWith("覚えて")) {
    const parts = input.replace("覚えて", "").trim().split("->");
    if (parts.length !== 2) {
      console.log("AI: 『覚えて キーワード -> 返事1,返事2』の形で教えてニャ！");
      showPrompt();
      return;
    }

    const key = parts[0].trim();
    const replies = parts[1].split(',').map(s => s.trim());
    memory[key] = replies;

    fs.writeFileSync('./memory.json', JSON.stringify(memory, null, 2));
    console.log(`AI: 『${key}』を覚えたニャ！`);
    showPrompt();
    return;
  }

  // キーワード部分一致
  let replied = false;
  for (const key in memory) {
    if (input.includes(key)) {
      const responses = memory[key];
      const reply = responses[Math.floor(Math.random() * responses.length)];
      console.log("AI:", reply);
      replied = true;
      break;
    }
  }

  if (!replied) console.log("AI: まだ覚えてないニャ…『覚えて』で教えてニャ！");
  showPrompt();
});
