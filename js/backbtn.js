window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  // キーコード(どのキーが押されたか)を取得
  let keycode = event.keyCode;

  //キーコードS
  if (keycode == 83) {
    location.href = '../php/ssi.php';
  }
};

$(function () {
  $('.stopBtn').click(function () {
    location.href = '../php/ssi.php';
  });
});

recognition.onresult = (e) => {
  if (e.results[0][0].transcript == 'チェンジ') {
    location.href = '../php/ssi.php';
  }
};
