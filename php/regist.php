<?php session_start(); ?>
<!DOCTYPE html>

<html lang="ja">
<?php if (($_POST["clear"])) { session_destroy(); } ?>
<head>
  <meta charset="UTF-8">
  <title>SSI/ユーザー登録</title>
  <link rel="stylesheet" href="../css/loginregist.css">
  <link rel="stylesheet" href="../css/regist.css">
</head>

<body>
  <!-- background -->
  <div class="stars"></div>
  <div class="twinkling"></div>
  <div class="clouds"></div>
  <header>
    <h1 onclick="eventClick();"><img src="../images/rogo.png" alt="SSI"></h1>
  </header>
  <main>
    <form action="./registcompletion.php" method="POST">
      <table>
        <tr>
          <td>
            <input type="text" name="user" id="user" placeholder="ユーザID" autocomplete="off" required>
          </td>
        </tr>
        <tr>
          <td><input type="password" name="passwd" id="passwd" placeholder="パスワード(4文字以上)" autocomplete="off" required minlength="4"></td>
        </tr>
        <tr>
          <td><input type="text" name="username" id="name" placeholder="ユーザーネーム(5文字以下)" autocomplete="off" required pattern=".{1,5}"></td>
        </tr>
        <tr>
          <td><input type="submit" name="regist" value="登録" id="regist"></td>
        </tr>
      </table>
    </form>
  </main>
  <?php if($_SESSION["KEYERROR"]): ?>
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/jquery.fademover.min.js"></script>
    <script>
      history.pushState(null, null, null);
      $(window).on('popstate', function (event) {
        if (!event.originalEvent.state) {
          history.pushState(null, null, null);
          return;
        }
      });
      function eventClick() {
        location.href = "./login.php";
      };
      $(function(){
        $('main').fadeMover();
      });
    </script>
  <?php else: ?>
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/jquery.fademover.min.js"></script>
    <script>
      function eventClick() {
        location.href = "./login.php";
      };
      $(function(){
        $('main').fadeMover({'inSpeed': 1800});
      });
    </script>
  <?php endif; ?>
</body>

</html>
