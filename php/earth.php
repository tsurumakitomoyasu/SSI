<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>地球/EARTH</title>
  <link rel="stylesheet" href="../css/earth.css">
</head>

<body>
  <!-- ページ遷移 -->
  <div id="planetloadWrap">
    <div class="loadingWrap">
      <div class="loadingtext">
        <p class="text text1">地</p>
      </div>
      <div class="loadingtext">
        <p class="text text3">球</p>
      </div>
    </div>
  </div>
  <div id="loadingbg1" class="loadingbg"></div>
  <div id="loadingbg2" class="loadingbg"></div>
  <div id="loadingbg3" class="loadingbg"></div>

  <!-- BACK -->
  <form action="./ssi.php" method="POST">
    <input type="submit" value="BACK" id="back" name="backcnt">
  </form>

  <!-- 描画 -->
  <canvas id="stage"></canvas>
  <!-- 説明 -->
  <div id="info">
    <header id="maintitle" v-html="maintitle"></header>
    <main class="main" id="planet">
      <!-- 1ページ目 -->
      <div class="infotext1" v-if="text">
        <div class="title" v-html="title1"></div>
        <p id="earthimg1"><img src="../images/earthinfo.gif" alt="地球情報"><?php echo $_SESSION["NAME"]; ?>{{ text1 }}</p>
        <div class="clear"></div>

        <div class="title" v-html="title2"></div>
        <div id="earthimg2" v-html="text2"></div>
      </div>
      <!-- 2ページ目 -->
      <div class="infotext2" v-else>
        <div class="title" v-html="title3"></div>
        <div id="earthimg3" v-html="text3"></div>
        <div class="clear"></div>
        <div id="earthimg4" v-html="text4"></div>
        <div class="clear"></div>
      </div>

      <!-- prev,nextボタン -->
      <div id="arrow">
        <button class="pnBtn prev" @click="prevBtn" v-if="btn">
          <img src="../images/arrowprev.png" alt="戻る">
        </button>
        <button class="pnBtn next" @click="nextBtn" v-else>
          <img src="../images/arrownext.png" alt="進む">
        </button>
      </div>
    </main>
  </div>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/vue.min.js"></script>
  <script src="../js/min/planet.min.js"></script>
  <script src="../js/min/earth.min.js"></script>
</body>

</html>
