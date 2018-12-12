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
          } else {
            //ログイン失敗
          }
        } else {
          //パスワード未入力
        }
      } else {
        //ユーザーID未入力
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
  <script src="../js/jquery-3.3.1.min.js"></script>
  <script src="../js/three.min.js"></script>
  <script src="../js/orbitcontrols.js"></script>
  <script src="../js/preloadjs-min.js"></script>
</head>

<body>
  <?php
    if (isset($_SESSION["LOGINUSER"])) {
      $text = "<div class=\"loading loadingOut loadingIn\"><div class=\"loadingimg loadingOut loadingIn\"><img src=\"../images/loadingimage.png\" alt=\"ローリング画像\"></div></div><canvas id=\"stage\"></canvas><div id=\"question\"><button id=\"questionBtn\"><img src=\"../images/question_off.png\" alt=\"操作方法\"></button></div>";
      echo $text;
    }
  ?>
  <script src="../js/font.js"></script>
  <script src="../js/ssi.js"></script>
  <script src="../js/piking.js"></script>
  <script src="../js/btn.js"></script>
  <script src="../js/imagechange.js"></script>
  <script src="../js/loading.js"></script>
</body>

</html>