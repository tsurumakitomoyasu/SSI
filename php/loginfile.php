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
        $_SESSION["CNT"] = 1;
        unset($_SESSION["msgAns"]);
        include("./login.php");
      }
    }
  }
?>
