<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="ja">

<?php
  //ユーザID
  $user = "";
  //パスワード
  $passwd = "";

  //DBサーバー接続
  $con = mysqli_connect("mariadb","root","password");

  if (mysqli_connect_errno($con)) {
    $Msg = "<h2>データーの接続に失敗しました。</h2>";
  } else {
    mysqli_set_charset($con, "utf8");

    if (mysqli_select_db($con, "ssi")) {
      if (isset($_POST["login"])) {
        $user = $_POST["user"];
        if (!empty($_POST["passwd"])) {
          $passwd = $_POST["passwd"];
          //ログインチェックSQL
          $sql = "select count(*) from ssi where UserID ='".$user."'and PassWD = '".$passwd."';";
          $result = mysqli_query($con, $sql);

          //ログインチェック
          $cnt = mysqli_fetch_array($result);
          if ($cnt["count(*)"] == 1) {
            //ログイン成功時
            $_SESSION["LOGINUSER"] = $user;
            unset($_SESSION["ERROR"]);
          } else {
            //ログイン失敗
            $script = "<script>setTimeout(function () { location.href = './login.php'; }, 0);</script>";
            $_SESSION["ERROR"] = "error";
          }
        }
      }
    }
  }
?>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>SSI</title>
  <link rel="stylesheet" href="../css/ress.min.css">
  <link rel="stylesheet" href="../css/ssi.css">
</head>

<body>
  <?php if (isset($_SESSION["LOGINUSER"])): ?>
    <div class="loading loadingOut loadingIn">
      <div class="loadingimg loadingOut loadingIn">
        <img src="../images/loadingimage.png" alt="ローリング画像">
        <div id="cnt">
          <p><span class="count fontType" data-num="100">0</span>％</p>
        </div>
      </div>
    </div>

    <canvas id="stage"></canvas>

    <div id="question">
      <button class="infoBtn questionBtn"><img src="../images/question_off.png" alt="操作方法"></button>
    </div>

    <div class="infoWrap questioninfo">
      <button id="questionBack">戻る</button>
    </div>

    <div id="userWrap">
      <button class="infoBtn userBtn"><img src="../images/user_off.png" alt="ユーザー情報"></button>
    </div>

    <div class="infoWrap userinfo">
      <button id="userBack">戻る</button>
      <div id="logout">
        <form action="../php/login.php" method="post">
          <input type="submit" name="logout" value="ログアウト">
        </form>
      </div>
      <div id="userID">
        <p><?php echo $_SESSION["LOGINUSER"] ?>さん</p>
      </div>
    </div>

    <script src="../js/jquery-3.3.1.min.js"></script>
    <script src="../js/count.js"></script>
    <script src="../js/three.min.js"></script>
    <script src="../js/orbitcontrols.js"></script>
    <script src="../js/preloadjs-min.js"></script>
    <script src="../js/font.js"></script>
    <script src="../js/ssi.js"></script>
    <script src="../js/piking.js"></script>
    <script src="../js/btn.js"></script>
    <script src="../js/common.js"></script>
  <?php endif; ?>
  <?php echo $script; ?>
</body>

</html>
