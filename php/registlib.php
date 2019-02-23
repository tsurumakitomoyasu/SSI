<?php
  //registcompletion.php
  $con = mysqli_connect("mariadb","root","password");
  if (mysqli_connect_errno($con)) {
    $Msg = "<h2>データーの接続に失敗しました。</h2>";
  }
  else {
    mysqli_set_charset($con,"utf8");
    if (mysqli_select_db($con,"ssi")) {
      if (isset($_POST["regist"])) {
        //ユーザID取得
        if (!empty($_POST["user"])) {
          $user = $_POST["user"];
          //パスワード取得
          if (!empty($_POST["passwd"])) {
            $passwd = $_POST["passwd"];
            if (!empty($_POST["username"])) {
              $name = $_POST["username"];
              //タイムゾーン設定
              //date_default_timezone_set("Asia/Tokyo");
              //登録日取得
              $nowDate = Date("Y/m/d H:i:s");
              //SQL生成(挿入)
              $sql = "insert into ssi values ('".$user."','".$passwd."','".$name."','".$nowDate."');";
              $result = mysqli_query($con,$sql);
              unset($_SESSION["KEYERROR"]);
              if (!$result) {
                //挿入SQLが失敗
                //$Msg = "<h2>SQLの実行に失敗しました。:".$sql."</h2>";
                include("./registno.php");
              } else {
                include("./registok.php");
              }
            }
          }
        }
      }
    }
  }
?>
