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
  <div id="inWrap">
    <header>
      <h1>
        {{ title }}
      </h1>
    </header>
    <main>
      <?php echo $Msg; ?>
      <p id="loginBtn" onclick="eventClick();">
        {{ back }}
      </p>
      <p id="time">
        {{ time }}
      </p>
    </main>
  </div>
  <script src="../js/vue.min.js"></script>
  <script src="../js/min/registok.min.js"></script>
</body>

</html>
