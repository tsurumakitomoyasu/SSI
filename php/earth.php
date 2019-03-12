<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">

<head>
  <meta charset="UTF-8">
  <title>地球/EARTH</title>
  <link rel="stylesheet" href="../css/earth.css"><link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.7.2/css/all.css" integrity="sha384-fnmOCqbTlWIlj8LyTjo7mOUStjsKC4pOpQbqyi7RrhN7udi9RwhKkMHpvLbHG9Sr" crossorigin="anonymous">
</head>

<body>
  <!-- ページ遷移 -->
  <div id="planetloadWrap">
    <div class="loadingWrap">
      <div class="loadingtext" v-for="planet in earth" v-html="planet.text"></div>
    </div>
  </div>
  <div id="loadingBGWrap">
    <div v-for="loadingbg in bgs" v-html="loadingbg.bg"></div>
  </div>

  <!-- BACK -->
  <div id="backBtn" v-html="back"></div>

  <!-- VR -->
  <div id="vr">
    <button v-bind:class="vr" v-on:mouseover="mouseover" v-on:mouseleave="mouseleave" v-on:click="vrIn" v-html="vr_i"></button>
  </div>

  <!-- QRcode -->
  <div id="qr" :class="qrdisplay">
    <div id="msc" :class="qrAni" @click="qrClick">
      <div id="code" :class="qrImg">
        <img v-bind:src="'../images/qr/' + planet + '.png'" :alt="planetQR">
      </div>
    </div>
  </div>

  <!-- 描画 -->
  <canvas id="stage"></canvas>

  <!-- 説明 -->
  <div id="info">
    <header id="maintitle" v-html="maintitle"></header>
    <main class="main" id="planet">
      <!-- 1ページ目 -->
      <div class="infotext1" v-if="text">
        <div v-html="page1"></div>
      </div>

      <!-- 2ページ目 -->
      <div class="infotext2" v-else>
        <div v-html="page2"></div>
      </div>

      <!-- prev,nextボタン -->
      <div id="arrow">
        <button class="pnBtn prev" @click="prevBtn" v-if="btn" v-html="pBtn"></button>
        <button class="pnBtn next" @click="nextBtn" v-else v-html="nBtn"></button>
      </div>
    </main>
  </div>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/vue.min.js"></script>
  <script src="../js/min/planet.min.js"></script>
  <script>
    let userName = '<?php echo $_SESSION["NAME"]; ?>';
  </script>
  <script src="../js/min/earth.min.js"></script>
  <script>
    document.getElementById('name').innerHTML = userName;
  </script>
</body>

</html>
