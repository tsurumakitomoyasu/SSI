<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">
<?php require './decision.php'; ?>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SSI</title>
  <link rel="stylesheet" href="../css/ssi.css">
</head>

<body>
  <!-- ローディング処理 -->
  <div class="loading loadingIn">
    <div class="loadingimg loadingIn">
      <img src="../images/loadingimage.png" alt="ローリング画像">
      <div id="cnt">
        <p><span class="count fontType" data-num="100">0</span>％</p>
      </div>
    </div>
  </div>

  <!-- キャンバス処理 -->
  <canvas id="stage" class="move"></canvas>

  <div id="userWrap">
    <button class="infoBtn userBtn"><img src="../images/user_off.png" alt="ユーザー情報"></button>
  </div>

  <div class="infoWrap userinfo userOut">
    <button id="userBack"><img src="../images/back_on.png" alt="戻るボタン"></button>
    <div id="user">
      <p><?php echo $_SESSION["NAME"]; ?><br><span>さん</span></p>
    </div>
    <div id="logintime">
      <p>-ログイン日時-<br><span><?php echo $_SESSION["LOGINDATE"]; ?><br><?php echo $_SESSION["LOGINTIME"]?></span></p>
    </div>
    <div id="logout" class="lognone">
      <form action="./login.php" method="post">
        <input type="submit" name="logout" value="Landing">
      </form>
    </div>
  </div>

  <div id="stopWrap">
    <button class="infoBtn stopBtn"><img src="../images/stop_off.png" alt="画面切り替え"></button>
  </div>

  <div id="speechWrap">
    <button class="infoBtn speechBtn"><img src="../images/speech_off.png" alt="音声操作"></button>
  </div>

  <div class="inbg"></div>

  <script src="../js/jquery-3.3.1.min.js"></script>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/preloadjs-min.js"></script>
  <script src="../js/all.min.js"></script>
</body>

</html>
