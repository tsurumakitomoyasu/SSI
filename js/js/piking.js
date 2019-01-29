//ピッキング処理
document.addEventListener('mousedown', clickPosition, false);

function clickPosition(event) {
  let x = event.clientX;
  let y = event.clientY;
  // マウスクリック位置を正規化
  let mouse = new THREE.Vector2();
  mouse.x = (x / window.innerWidth) * 2 - 1;
  mouse.y = -(y / window.innerHeight) * 2 + 1;
  let raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(mouse, camera);

  // オブジェクトの取得
  //メッシュ
  let interSu = raycaster.intersectObjects(targetSun);
  let interMe = raycaster.intersectObjects(targetMercury);
  let interVe = raycaster.intersectObjects(targetVenus);
  let interEa = raycaster.intersectObjects(targetEarth);
  let interMa = raycaster.intersectObjects(targetMars);
  let interJu = raycaster.intersectObjects(targetJupiter);
  let interSa = raycaster.intersectObjects(targetSaturn);
  let interUr = raycaster.intersectObjects(targetUranus);
  let interNe = raycaster.intersectObjects(targetNeptune);
  let interMo = raycaster.intersectObjects(targetMoon);

  //テキスト
  let interTSU = raycaster.intersectObjects(targetTextSun);
  let interTME = raycaster.intersectObjects(targetTextMercury);
  let interTV = raycaster.intersectObjects(targetTextVenus);
  let interTE = raycaster.intersectObjects(targetTextEarth);
  let interTMO = raycaster.intersectObjects(targetTextMoon);
  let interTMA = raycaster.intersectObjects(targetTextMars);
  let interTJ = raycaster.intersectObjects(targetTextJupiter);
  let interTSA = raycaster.intersectObjects(targetTextSaturn);
  let interTU = raycaster.intersectObjects(targetTextUranus);
  let interTN = raycaster.intersectObjects(targetTextNeptune);

  //マウス操作
  if (interSu.length > 0 || interTSU.length > 0) {
    //alert('太陽');
    location.href = '../html/sun.html';
  } else if (interMe.length > 0 || interTME.length > 0) {
    location.href = '../html/mercury.html';
  } else if (interVe.length > 0 || interTV.length > 0) {
    location.href = '../html/venus.html';
  } else if (interEa.length > 0 || interTE.length > 0) {
    location.href = '../html/earth.html';
  } else if (interMa.length > 0 || interTMA.length > 0) {
    location.href = '../html/mars.html';
  } else if (interJu.length > 0 || interTJ.length > 0) {
    location.href = '../html/jupiter.html';
  } else if (interSa.length > 0 || interTSA.length > 0) {
    location.href = '../html/saturn.html';
  } else if (interUr.length > 0 || interTU.length > 0) {
    location.href = '../html/uranus.html';
  } else if (interNe.length > 0 || interTN.length > 0) {
    location.href = '../html/neptune.html';
  } else if (interMo.length > 0 || interTMO.length > 0) {
    location.href = '../html/moon.html';
  }
};

window.addEventListener('keydown', pikingKeydown);

function pikingKeydown(event) {
  let keyCode = event.keyCode;

  //キーボード操作
  if (keyCode == 49 || keyCode == 97) {
    //alert('太陽');
    location.href = '../html/sun.html';
  } else if (keyCode == 50 || keyCode == 98) {
    location.href = '../html/mercury.html';
  } else if (keyCode == 51 || keyCode == 99) {
    location.href = '../html/venus.html';
  } else if (keyCode == 52 || keyCode == 100) {
    location.href = '../html/earth.html';
  } else if (keyCode == 53 || keyCode == 101) {
    location.href = '../html/moon.html';
  } else if (keyCode == 54 || keyCode == 102) {
    location.href = '../html/mars.html';
  } else if (keyCode == 55 || keyCode == 103) {
    location.href = '../html/jupiter.html';
  } else if (keyCode == 56 || keyCode == 104) {
    location.href = '../html/saturn.html';
  } else if (keyCode == 57 || keyCode == 105) {
    location.href = '../html/uranus.html';
  } else if (keyCode == 48 || keyCode == 96) {
    location.href = '../html/neptune.html';
  }
};

//web Speech API
let recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP";

recognition.addEventListener('result', function (e) {
  let speechtext = e.results[0][0].transcript;
  switch (speechtext) {
    case '太陽':
      location.href = '../html/sun.html';
      //alert(e.results[0][0].transcript);
      break;
    case '彗星':
      location.href = '../html/mercury.html';
      //alert(e.results[0][0].transcript);
      break;
    case 'きんせい':
      location.href = '../html/venus.html';
      //alert(e.results[0][0].transcript);
      break;
    case '地球':
      location.href = '../html/earth.html';
      //alert(e.results[0][0].transcript);
      break;
    case '月':
      location.href = '../html/moon.html';
      //alert(e.results[0][0].transcript);
      break;
    case '火星':
      location.href = '../html/mars.html';
      //alert(e.results[0][0].transcript);
      break;
    case '木星':
      location.href = '../html/jupiter.html';
      //alert(e.results[0][0].transcript);
      break;
    case '土星':
      location.href = '../html/saturn.html';
      //alert(e.results[0][0].transcript);
      break;
    case '天王星':
      location.href = '../html/uranus.html';
      //alert(e.results[0][0].transcript);
      break;
    case '海王星':
      location.href = '../html/neptune.html';
      //alert(e.results[0][0].transcript);
      break;
    default:
      //alert(e.results[0][0].transcript);
      $(".speechBtn").removeClass("speechout");
      recognition.stop();
      break;
  }
});
