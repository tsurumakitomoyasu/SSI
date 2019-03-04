<?php
  session_start();
  $msgAns = true;
  if (!empty($_SESSION["msgAns"])) {
    $msgAns = $_SESSION["msgAns"];
  }
?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>SSI/ログインページ</title>
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
  <link rel="stylesheet" href="../css/loginregist.css">
</head>

<body>
  <!-- background -->
  <div id="bgstar">
    <div v-for="item in items" v-html="item.bg"></div>
  </div>
  <header id="head">
    <h1>
      <div style="cursor: default;" v-if="titleChange" v-html="titleImg"></div>
      <div style="cursor: pointer;" @click="headerChange" v-html="titleImg" v-else></div>
    </h1>
  </header>
  <main id="main">
    <div v-if="loginChange">
      <!-- エラーメッセージ -->
      <div v-show="error">
        <?php echo $Msg; ?>
        <div class="<?php echo $error; ?>">
          <div v-html="spase"></div>
        </div>
      </div>
      <form action="./loginfile.php" method="POST">
        <table>
          <tr v-for="login in loginItems" v-html="login.input"></tr>
        </table>
      </form>
    </div>
    <div v-else>
      <div v-html="spase"></div>
      <form action="./registfile.php" method="POST">
        <table>
          <tr v-for="regist in registItems" v-html="regist.input"></tr>
        </table>
      </form>
    </div>
    <!-- アカウント作成 -->
    <button id="signup" @click="change" v-show="changeBtn">
      {{ createBtn }}
    </button>
  </main>
  <script src="../js/vue.min.js"></script>
  <script>
    let msgAns = <?php echo $msgAns; ?>
  </script>
  <script src="../js/min/loginregist.min.js"></script>
</body>

</html>
