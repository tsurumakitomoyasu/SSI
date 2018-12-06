window.addEventListener("keydown", handleKeydown);

function handleKeydown(event) {
  // キーコード(どのキーが押されたか)を取得
  let keyCode = event.keyCode;

  // 条件文で制御する
  if (keyCode == 83) {
    // 右
    alert("クリック");
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
    alert("クリック");
    clickCount = 0;
  }
});
