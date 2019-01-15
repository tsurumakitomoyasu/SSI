<?php require './decision.php'; ?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>SSI/登録完了</title>
  <link rel="stylesheet" href="../css/ress.min.css">
  <link rel="stylesheet" href="../css/registcompletion.css">
</head>

<body>
  <!-- background -->
  <div class="stars"></div>
  <div class="twinkling"></div>
  <div class="clouds"></div>
  <header>
    <h1>登録完了しました</h1>
  </header>
  <main>
    <?php echo $Msg; ?>
    <p id="loginBtn" onclick="eventClick();">ログイン画面に戻る</p>
    <p id="time">5秒後にログイン画面に戻ります</p>
    <?php echo $Msg; ?>
  </main>
  <script>
    setTimeout(function () {
      location.href = './login.php';
    }, 5000);

    function eventClick() {
      location.href = "./login.php";
    };
  </script>
</body>

</html>
