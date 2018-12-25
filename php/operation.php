<?php session_start(); ?>
<!DOCTYPE html>
<html lang="ja">
<?php require './decision.php'; ?>
<head>
  <meta charset="UTF-8">
  <title>操作説明</title>
  <link rel="stylesheet" href="../css/operation.css">
</head>

<body>
  <?php if (isset($_SESSION["LOGINUSER"])): ?>
    <header>
      <h1>操作説明</h1>
    </header>
    <main id="main">
      <div class="operation">
        <img src="../images/operation_one.png" alt="クリック画像">
        <div class="text">
          <p>①知りたい惑星をクリック</p>
        </div>
      </div>
      <div>
        <a href="./ssi.php">いく</a>
      </div>
    </main>
    <script src="../js/jquery-3.3.1.min.js"></script>
    <script>
      history.pushState(null, null, null);
      $(window).on('popstate', function (event) {
        if (!event.originalEvent.state) {
          history.pushState(null, null, null);
          return;
        }
      });
    </script>
  <?php else: ?>
    <script>
      setTimeout(function () {
        location.href = './login.php';
      }, 0);
    </script>
  <?php endif; ?>
</body>

</html>
