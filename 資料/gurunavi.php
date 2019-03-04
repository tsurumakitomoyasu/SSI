<?php
/*****************************************************************************************
 　ぐるなびWebサービスのレストラン検索APIで緯度経度検索を実行しパースするプログラム
 　注意：緯度、経度、範囲の値は固定で入れています。
 　　　　アクセスキーはユーザ登録時に発行されたキーを指定してください。
*****************************************************************************************/

//エンドポイントのURIとフォーマットパラメータを変数に入れる
$uri   = "http://api.gnavi.co.jp/RestSearchAPI/20150630/";
//APIアクセスキーを変数に入れる
$acckey= "046ae04e3e1e28055ce7efd7aa7dfb2d";
//返却値のフォーマットを変数に入れる
$format= "json";
//緯度・経度、範囲を変数に入れる
//緯度経度は日本測地系で日比谷シャンテのもの。範囲はrange=1で300m以内を指定している。
//$lat   = $_POST["lat"];
//$lon   = $_POST["lng"];
//$range = 3;
$name = "マクドナルド";
$hit_per_page=100;
//URL組み立て
//$url  = sprintf("%s%s%s%s%s%s%s%s%s%s%s", $uri, "?format=", $format, "&keyid=", $acckey, "&latitude=", $lat,"&longitude=",$lon,"&range=",$range);
//$url  = sprintf("%s%s%s%s%s%s%s%s%s%s%s%s%s%s%s", $uri, "?format=", $format, "&keyid=", $acckey, "&name=",$name,"&latitude=", $lat,"&longitude=",$lon,"&range=",$range,"&hit_per_page=",$hit_per_page);
$url  = sprintf("%s%s%s%s%s%s%s%s%s", $uri, "?format=", $format, "&keyid=", $acckey, "&name=",$name,"&hit_per_page=",$hit_per_page);

//$url  = sprintf("%s%s%s%s%s%s%s%s%s%s%s%s%s", $uri, "?format=", $format, "&keyid=", $acckey,"&latitude=", $lat,"&longitude=",$lon,"&range=",$range,"&hit_per_page=",$hit_per_page);

//print $url;
//API実行
$json = file_get_contents($url);
//取得した結果をオブジェクト化
$obj  = json_decode($json);

$total=0;
$tb="";
//結果をパース
//トータルヒット件数、店舗番号、店舗名、最寄の路線、最寄の駅、最寄駅から店までの時間、店舗の小業態を出力
foreach((array)$obj as $key => $val)
{
   if(strcmp($key, "total_hit_count" ) == 0 )
	 {
		 	$total=$val;
	 }

		if(strcmp($key, "rest") == 0 && $total != 0 )
		{
			$tb="<table>";
			$tb=$tb."<tr><th>店舗名</th><th>路線</th><th>駅名</th><th>駅から店までの時間</th></tr>";

				foreach((array)$val as $restArray)
				{
						$tb=$tb."<tr>";

						 //echo $restArray->{'id'}."\t";
						 if($restArray->{'name'}!=null)
             {
               $tb=$tb."<td>".$restArray->{'name'}."</td>";
             }
						 if($restArray->{'access'}->{'line'}!=null)
             {

               $tb=$tb."<td>".(string)$restArray->{'access'}->{'line'}."</td>";
             }

						 if($restArray->{'access'}->{'station'}!=null)
             {
               $tb=$tb."<td>".(string)$restArray->{'access'}->{'station'}."</td>";
             }
						 if($restArray->{'access'}->{'walk'}!=null)
             {
               $tb=$tb."<td>".(string)$restArray->{'access'}->{'walk'}."分</td>";
             }
						 $tb=$tb."<tr>";

				}
				$tb=$tb."</table>";
		}
  }


?>
<!DOCTYPE html>
<html lang="ja">
<head>
  <title>Test Map</title>
  <meta charset="UTF-8">
  <meta name="viewport" content="initial-scale=1.0, user-scalable=no">
  <meta charset="utf-8">
  <style>
    html, body {
      height: 100%;
      margin: 0;
      padding: 0;
    }
		table,th,td{
			border:solid 1px navy;
		}
    #map {
      height: 80%;
      width: 80%;
    }
  </style>
</head>
<body>
  <!--
  <div id="map"></div>
  <script>
    function initMap() {

      // マップの初期化
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: {lat: 35.50992, lng: 139.56065}
      });

      // クリックイベントを追加
      map.addListener('click', function(e) {
        getClickLatLng(e.latLng, map);
      });
    }

    function getClickLatLng(lat_lng, map) {

      // 座標を表示
      //document.getElementById('lat').textContent = lat_lng.lat();
      //document.getElementById('lng').textContent = lat_lng.lng();

			//座標をgurunavi.phpに転送
			var form = document.createElement('form');
			var request1 = document.createElement('input');
			var request2 = document.createElement('input');

			form.method = 'POST';
			form.action = 'http://localhost/ph11/20190223_API/gurunavi.php';

			request1.type = 'hidden'; //入力フォームが表示されないように
			request1.name = 'lat';
			request1.value = lat_lng.lat();

			request2.type = 'hidden'; //入力フォームが表示されないように
			request2.name = 'lng';
			request2.value = lat_lng.lng();

			form.appendChild(request1);
			form.appendChild(request2);

			document.body.appendChild(form);

			form.submit();

			//
      // マーカーを設置
			/*
      var marker = new google.maps.Marker({
        position: lat_lng,
        map: map
      });
			*/

      // 座標の中心をずらす
      // http://syncer.jp/google-maps-javascript-api-matome/map/method/panTo/
      //map.panTo(lat_lng);
    }
  </script>
  <script src="https://maps.googleapis.com/maps/api/js?signed_in=true&callback=initMap" async defer></script>
  -->
	<h1>検索結果</h1>
	<h2>検索件数:<?php print $total ?>件数</h2>
	<?php print $tb; ?>

</body>
</html>
