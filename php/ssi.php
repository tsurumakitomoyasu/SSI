<?php
  require './decision.php';

  $backcnt = 0;
  if ($_SESSION["BACKCNT"]) {
    $backcnt = $_SESSION["BACKCNT"];
  }
  if ($_POST["backcnt"] && $backcnt != 1) {
    $backcnt++;
  }
  $_SESSION["BACKCNT"] = $backcnt;
?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SSI</title>
  <link rel="stylesheet" href="../css/ssi.css">
</head>

<body>
  <?php if (isset($_SESSION["LOGINUSER"])): ?>
    <!-- ローディング処理 -->
    <div class="loading loadingIn">
      <div class="loadingimg loadingIn">
        <img src="../images/loadingimage.png" alt="ローリング画像">
        <div id="cnt">
          <p><span class="count fontType" data-num="100">0</span>％</p>
        </div>
      </div>
    </div>

    <div class="operationWrap operationin">
      <!-- bg -->
      <div class="stars"></div>
      <div class="twinkling"></div>
      <div class="clouds"></div>

      <!-- operationmain -->
      <button id="opeBack"><img src="../images/ope_back.png" alt="戻るボタン"></button>
      <div class="opetitle">
        <h1>操作説明</h1>
      </div>
      <div class="operationposi">
        <div class="page1">
          <div class="operation">
            <img src="../images/operation_one.png" alt="クリック画像">
            <div class="text">
              <p>①知りたい惑星を選択</p>
            </div>
          </div>
          <p class="arrow">&rarr;</p>
          <div class="operation">
            <img src="../images/operation_twe.png" alt="勉強例">
            <div class="text">
              <p>②勉強！</p>
            </div>
          </div>
          <div class="clear"></div>
        </div>

        <!-- 2ページ目 -->
        <div class="page2 pagenone">
          <div class="list">
            <ul>
              <li><img src="../images/user_off.png" alt="ユーザーボタン">：ログイン時間、ログアウトなどが出来る。Aキーでも可能。</li>
              <li><img src="../images/stop_off.png" alt="ストップボタン">：惑星が動いている状態、止めている状態に切り替え可能。Sキー可能。</li>
            </ul>
          </div>
        </div>

        <!-- 3ページ目 -->
        <div class="page3 pagenone">
          <div class="list">
            <ul>
              <li><img src="../images/speech_off.png" alt="音声認識ボタン">：音声入力可能。Dキーでも可能。<br><span id="sampleimg"><img src="../images/speechsample.png" alt="サンプル画像"></span>タブの<span id="sampletext">赤丸</span>が目印。</li>
              <li><img src="../images/operation_off.png" alt="操作説明ボタン">：操作説明表示。</li>
            </ul>
          </div>
        </div>
      </div>

      <!-- prev -->
      <button class="btn prev btnnone">&lsaquo;</button>
      <!-- next -->
      <button class="btn next">&rsaquo;</button>
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

    <div class="operationBtn"><button class="infoBtn opeBtn"><img src="../images/operation_off.png" alt="操作説明"></button></div>

    <div class="inbg"></div>

    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/three.min.js"></script>
    <script src="../js/orbitcontrols.js"></script>
    <script src="../js/preloadjs-min.js"></script>
    <script>
      let backcnt = <?php echo $backcnt; ?>;
    </script>
    <script src="../js/all.min.js"></script>
  <?php else: ?>
    <script>
      setTimeout(function () {
        location.href = './login.php';
      }, 0);
    </script>
  <?php endif; ?>
</body>

</html>
