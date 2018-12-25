<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SSI</title>
  <link rel="stylesheet" href="../css/ssi.css">
</head>

<body>
  <div class="loading loadingIn">
    <div class="loadingimg loadingIn">
      <img src="../images/loadingimage.png" alt="ローリング画像">
      <div id="cnt">
        <p><span class="count fontType" data-num="100">0</span>％</p>
      </div>
    </div>
  </div>

  <canvas id="stage"></canvas>

  <div id="userWrap">
    <button class="infoBtn userBtn"><img src="../images/user_off.png" alt="ユーザー情報"></button>
  </div>

  <div class="infoWrap userinfo userOut">
    <button id="userBack"><img src="../images/back_on.png" alt="戻るボタン"></button>
    <div id="logout" class="lognone">
      <form action="../php/login.php" method="post">
        <input type="submit" name="logout" value="ログアウト">
      </form>
    </div>
    <div id="user">
      <p><?php echo $_SESSION["NAME"]; ?><br><span>さん</span></p>
    </div>
    <div id="logintime">
      <p>--ログイン時間--<br><span><?php echo $_SESSION["LOGINTIME"]?></span></p>
    </div>
  </div>

  <div id="stopWrap">
    <button class="infoBtn stopBtn"><img src="../images/stop_off.png" alt="画面切り替え"></button>
  </div>

  <div id="speechWrap">
    <button class="infoBtn speechBtn"><img src="../images/speech_off.png" alt="音声操作"></button>
  </div>

  <script src="../js/jquery-3.3.1.min.js"></script>
  <script src="../js/common.js"></script>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/preloadjs-min.js"></script>
  <script src="../js/ssi.js"></script>
  <script src="../js/font.js"></script>
  <script src="../js/piking.js"></script>
  <script src="../js/btn.js"></script>
</body>

</html>
