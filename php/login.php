<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">
<?php require './decision.php'; ?>
<head>
  <meta charset="UTF-8">
  <title>SSI/ログインページ</title>
  <link rel="stylesheet" href="../css/loginregist.css">
</head>

<body>
  <!-- background -->
  <div class="stars"></div>
  <div class="twinkling"></div>
  <div class="clouds"></div>
  <header>
    <h1><img src="../images/rogo.png" alt="SSI"></h1>
  </header>
  <main>
    <?php echo $Msg; ?>
    <form action="./operation.php" method="POST">
      <table>
        <tr>
          <td>
            <input type="text" name="user" id="user" placeholder="ユーザID" autocomplete="off" required>
          </td>
        </tr>
        <tr>
          <td class="passMa">
            <input type="password" name="passwd" id="passwd"placeholder="パスワード" autocomplete="off" required required minlength="4">
          </td>
        </tr>
        <tr>
          <td>
            <input type="submit" name="login" value="ログイン" id="login">
          </td>
        </tr>
        <tr>
          <td id="or">-----------または-----------</td>
        </tr>
      </table>
    </form>
    <form action="./regist.php" method="POST">
      <input type="submit" name="clear" value="ユーザー登録" id="singup">
    </form>
  </main>
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
    $(function(){
      $('main').fadeMover();
    });
  </script>
</body>

</html>
