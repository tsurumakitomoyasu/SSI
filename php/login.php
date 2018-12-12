<?php
 session_start();
?>
<!DOCTYPE html>
<html lang="ja">
  <?php
  if ($_POST["logout"]) {
    session_destroy();
  }//ログアウト終了
  if (isset($_SESSION["ERROR"])) {
    $Msg = "<p id=\"error\">ユーザID又はパスワードが間違ってます</p>";
  }
  ?>
<head>
  <meta charset="UTF-8">
  <title>ログイン</title>
  <link rel="stylesheet" href="../css/ress.min.css">
  <link rel="stylesheet" href="../css/loginregist.css">
</head>

<body>
  <header>
    <h1><img src="../images/rogo.png" alt="SSI"></h1>
  </header>
  <?php echo $Msg; ?>
  <form action="./ssi.php" method="POST">
    <table>
      <tr>
        <td>
          <input type="text" name="user" id="user" placeholder="ユーザID" autocomplete="off" required>
        </td>
      </tr>
      <tr>
        <td>
          <input type="password" name="passwd" id="passwd" placeholder="パスワード" autocomplete="off" required></td>
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
</body>

</html>
