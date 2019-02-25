<?php
  session_start();

  //operation.php
  $user = "";//ユーザID
  $passwd = "";//パスワード
  $con = mysqli_connect("mariadb","root","password");//DBサーバー接続
  if (mysqli_connect_errno($con)) {
    $Msg = "<h2>データーの接続に失敗しました。</h2>";
  } else {
    mysqli_set_charset($con, "utf8");
    if (mysqli_select_db($con, "ssi")) {
      if (isset($_POST["login"])) {
        $user = $_POST["user"];
        if (!empty($_POST["passwd"])) {
          $passwd = $_POST["passwd"];
          $sql = "select count(*) from ssi where UserID ='".$user."' and PassWD = '".$passwd."';";//ログインチェックSQL
          $result = mysqli_query($con, $sql);

          //ログインチェック
          $cnt = mysqli_fetch_array($result);
          if ($cnt["count(*)"] == 1) {
            //ログイン成功時
            $sqlName = "select * from ssi where UserID = '".$user."' and PassWD = '".$passwd."';";
            $resultName = mysqli_query($con, $sqlName);
            $row = mysqli_fetch_array($resultName);
            $name = $row["UserNAME"];
            $_SESSION["NAME"] = $name;
            $_SESSION["LOGINUSER"] = $user;
            unset($_SESSION["ERROR"]);
            include("./ssi.php");
          } else {
            //ログイン失敗
            $Msg = "<p id=\"error\">ユーザID又はパスワードが間違ってます</p>";
            include("./login.php");
          }
        }
      }
    }
  }
?>
