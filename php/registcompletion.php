<?php require './decision.php'; ?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>登録完了しました</title>
  <link rel="stylesheet" href="../css/ress.min.css">
  <link rel="stylesheet" href="../css/registcompletion.css">
</head>

<body>
  <main>
    <h1>登録完了しました</h1>
    <p id="loginBtn"><a href="../php/login.php">ログイン画面に戻る</a></p>
    <p id="time">5秒後にログイン画面に戻ります</p>
    <?php echo $Msg; ?>
  </main>
  <script>
    setTimeout(function () {
      location.href = '../php/login.php';
    }, 5000);
  </script>
</body>

</html>
