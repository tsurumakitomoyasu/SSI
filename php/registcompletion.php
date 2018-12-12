<!DOCTYPE html>
<html lang="ja">
  <?php
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
              //タイムゾーン設定
              //date_default_timezone_set("Asia/Tokyo");
              //登録日取得
              $nowDate = Date("Y/m/d H:i:s");
              //SQL生成(挿入)
              $sql = "insert into ssi values('".$user."','".$passwd."','".$nowDate."');";
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
  ?>

<head>
  <meta charset="UTF-8">
  <title>登録完了しました</title>
  <style>
    body {
      background: #000;
    }

    main {
      width: 20vw;
      margin: 0 auto;
    }

    h1,
    p {
      color: #fff;
      text-align: center;
    }

    h1 {
      font-size: 2.5vw;
      margin-top: 40vh;
    }

    #loginBtn a {
      display: block;
      width: 20vw;
      padding: .3vw;
      padding-top: .8vw;
      padding-bottom: .8vw;
      border-radius: .2vw;
      font-weight: bold;
      font-size: 1.3vw;
      text-decoration: none;
      text-align: center;
      color: #fff;
      border: solid .1vw #0ff;
      transition: all 700ms;
    }

    #loginBtn a:hover {
      background: #0ff;
      color: #000;
    }

    #time {
      font-size: 1vw;
    }
  </style>
</head>

<body>
  <main>
    <h1>登録完了しました</h1>
    <p id="loginBtn"><a href="../php/login.html">ログイン画面に戻る</a></p>
    <p id="time">5秒後にログイン画面に戻ります</p>
    <?php echo $Msg; ?>
  </main>
  <script src="../js/jquery-3.3.1.min.js"></script>
  <script>
    setTimeout(function () {
      location.href = '../php/login.php';
    }, 5000);
  </script>
</body>

</html>
