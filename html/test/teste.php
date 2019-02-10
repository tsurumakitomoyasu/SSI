<!DOCTYPE html>
<html lang="ja">
  <?php
    $hour = $_POST["hour"];
    $minute = $_POST["time"];
    $nowhout = date("H");
    $nowminute = date("i");
    //for ($shout = $nowhout; $shout = $hour; $shout++) {
      //$havah++;
    //}
    //for ($sminute = $nowminute; $sminute = $minute; $sminute++) {
      //$havam++;
    //}

    // 時
    for ($i=$nowhout; $i < 24; $i++) {
      $havah++;
    }
    for ($i=0; $i < $hour; $i++) {
      $havah++;
    }
    if ($havah > 24) {
      $havah-=24;
    }

    // 分
    if ($nowminute < 30) {
      $nowminute = 0;
    }

    for ($i=$nowminute; $i < 60; $i++) {
      $havam++;
    }
    for ($i=0; $i < $minute; $i++) {
      $havam++;
    }
    if ($havam > 60) {
      $havam-=60;
    }
  ?>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
</head>
      <?php echo $havah; ?>
</body>
</html>
