<?php
  require("./loginlib.php");
  if (!empty($_POST["user"])) {
    $user = $_POST["user"];
    if (!empty($_POST["passwd"])) {
      $passwd = $_POST["passwd"];
      $ans = login($user, $passwd);
      if ($ans == OK) {
        //ログイン成功時
        unset($_SESSION["CNT"]);
        include("./ssi.php");
      } else {
        $Msg = "<p id=\"error\">ユーザID又はパスワードが間違ってます</p>";
        $error = 'none';
        $_SESSION["CNT"] = 'eror';
        unset($_SESSION["msgAns"]);
        include("./login.php");
      }
    }
  }
?>
