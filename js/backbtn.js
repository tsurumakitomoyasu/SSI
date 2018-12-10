window.addEventListener("keydown", handleKeydown);

function handleKeydown(event) {
  // キーコード(どのキーが押されたか)を取得
  let keyCode = event.keyCode;

  //キーコードS
  if (keyCode == 83) {
    location.href = './ssi.html';
  }
};

let clickCount;

document.getElementById("stage").addEventListener("mousedown", function (e) {
  // シングルクリックの場合
  if (!clickCount) {
    ++clickCount;
    //シングルクリック
    setTimeout(function () {
      clickCount = 0;
    }, 350);
    // ダブルクリック
  } else {
    location.href = './ssi.html';
    clickCount = 0;
  }
});