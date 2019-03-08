<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>SSI/登録失敗</title>
  <link rel="stylesheet" href="../css/ress.min.css">
  <link rel="stylesheet" href="../css/registcompletion.css">
</head>

<body>
  <!-- background -->
  <div id="bgstar">
    <div v-for="item in items" v-html="item.bg"></div>
  </div>

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
  <script src="../js/min/registno.min.js"></script>
</body>
</html>
