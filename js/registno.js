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

let registno = new Vue({
  el: "#inWrap",
  data: {
    title: '既に使用されているユーザーIDです',
    back: 'ユーザ登録に戻る',
    time: '5秒後にユーザー登録に戻ります',
  }
});
