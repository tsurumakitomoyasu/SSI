<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">
<?php require './decision.php'; ?>
<head>
  <meta charset="UTF-8">
  <title>SSI/操作説明</title>
  <link rel="stylesheet" href="../css/operation.css">
</head>

<body>
  <!-- background -->
  <div class="stars"></div>
  <div class="twinkling"></div>
  <div class="clouds"></div>
  <?php if (isset($_SESSION["LOGINUSER"])): ?>
    <header>
      <h1>操作説明</h1>
    </header>
    <main id="main">
      <!-- 1ページ -->
      <div class="page1">
        <div class="operation">
          <img src="../images/operation_one.png" alt="クリック画像">
          <div class="text">
            <p>①知りたい惑星をクリック</p>
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
            <li><img src="../images/speech_off.png" alt="音声認識ボタン">：音声入力可能。Dキーでも可能。</li>
          </ul>
          <div id="sample">
            <p><img src="../images/speechsample.png" alt="サンプル画像"><br>タブの<span>赤丸</span>が音声入力中の目印</p>
          </div>
        </div>
      </div>

      <!-- 4ページ目 -->
      <div class="page4 pagenone">
        <div class="bgcolor color1"></div>
        <div class="bgcolor color2" onclick="eventClick();"></div>
        <p onclick="eventClick();">スタート</p>
      </div>
    </main>

    <!-- prev -->
    <button class="btn prev btnnone">&lsaquo;</button>
    <!-- next -->
    <button class="btn next">&rsaquo;</button>
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/jquery.fademover.min.js"></script>
    <script src="../js/operation.js"></script>
  <?php else: ?>
    <script>
      setTimeout(function () {
        location.href = './login.php';
      }, 0);
    </script>
  <?php endif; ?>
</body>

</html>
