<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">
<?php
  if (($_POST["clear"])) {
    session_destroy();
  }
?>
<head>
  <meta charset="UTF-8">
  <title>ユーザー登録</title>
  <link rel="stylesheet" href="../css/loginregist.css">
  <link rel="stylesheet" href="../css/regist.css">
</head>

<body>
  <header>
    <h1><a href="./login.php"><img src="../images/rogo.png" alt="SSI"></a></h1>
  </header>
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
        <td><input type="text" name="username" id="name" placeholder="ユーザーネーム(日本語可)" autocomplete="off" required></td>
      </tr>
      <tr>
        <td><input type="submit" name="regist" value="登録" id="regist">
        </td>
      </tr>
    </table>
  </form>
</body>

</html>
