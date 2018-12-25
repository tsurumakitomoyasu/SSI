<?php
  session_start();

  //login.php
  if ($_POST["logout"]) {
    session_destroy();
  }//ログアウト終了
  if (isset($_SESSION["ERROR"])) {
    $Msg = "<p id=\"error\">ユーザID又はパスワードが間違ってます</p>";
  }

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
            $_SESSION["LOGINTIME"] = Date("H:i");
            $_SESSION["NAME"] = $name;
            $_SESSION["LOGINUSER"] = $user;
            unset($_SESSION["ERROR"]);
          } else {
            //ログイン失敗
            $_SESSION["ERROR"] = "error";
          }
        }
      }
    }
  }

  //registcompletion.php
  $con = mysqli_connect("mariadb","root","password");
  if (mysqli_connect_errno($con)) {
    $Msg = "<h2>データーの接続に失敗しました。</h2>";
  } else {
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
                $sql = "insert into ssi values('".$user."','".$passwd."','".$name."','".$nowDate."');";
                $result = mysqli_query($con,$sql);
                if (!$result) {
                  //挿入SQLが失敗
                  $Msg = "<h2>SQLの実行に失敗しました。:".$sql."</h2>";
                }
              }
            }
          }
        }
      }
    }
?>