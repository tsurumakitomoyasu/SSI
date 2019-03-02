<?php
  session_start();
  require("./registlib.php");
  if (!empty($_POST["user"])) {
    $user = $_POST["user"];
    //パスワード取得
    if (!empty($_POST["passwd"])) {
      $passwd = $_POST["passwd"];
      if (!empty($_POST["username"])) {
        $name = $_POST["username"];
        $ans = regist($user, $passwd, $name);
        if ($ans == OK) {
          include("./registok.php");
          unset($_SESSION["msgAns"]);
        } else {
          include("./registno.php");
          $_SESSION["msgAns"] = 'false';
        }
      }
    }
  }
?>
