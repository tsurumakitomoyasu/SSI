window.location.hash = "#noback";
window.onhashchange = function () {
  window.location.hash = "#noback";
};

setTimeout(function () {
  location.href = './login.php';
}, 5000);

function eventClick() {
  location.href = "./login.php";
};

let registok = new Vue({
  el: "#inWrap",
  data: {
    title: '登録完了しました',
    back: 'ログイン画面に戻る',
    time: '5秒後にユーザー登録に戻ります',
  }
});
