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

  //条件処理
  if (interSu.length > 0) {
    alert('太陽');
  } else if (interMe.length > 0) {
    alert('水星');
  } else if (interVe.length > 0) {
    alert('金星');
  } else if (interEa.length > 0) {
    alert('地球');
  } else if (interMa.length > 0) {
    alert('火星');
  } else if (interJu.length > 0) {
    alert('木星');
  } else if (interSa.length > 0) {
    alert('土星');
  } else if (interUr.length > 0) {
    alert('天王星');
  } else if (interNe.length > 0) {
    alert('海王星');
  } else if (interMo.length > 0) {
    alert('月');
  }
};

window.addEventListener("keydown", Keydown);

function Keydown(event) {
  let keyCode = event.keyCode;

  // 条件文で制御する
  if (keyCode == 49 || keyCode == 97) {
    alert('太陽')
  } else if (keyCode == 50 || keyCode == 98) {
    alert('水星');
  } else if (keyCode == 51 || keyCode == 99) {
    alert('金星');
  } else if (keyCode == 52 || keyCode == 100) {
    alert('地球');
  } else if (keyCode == 53 || keyCode == 101) {
    alert('月');
  } else if (keyCode == 54 || keyCode == 102) {
    alert('火星');
  } else if (keyCode == 55 || keyCode == 103) {
    alert('木星');
  } else if (keyCode == 56 || keyCode == 104) {
    alert('土星');
  } else if (keyCode == 57 || keyCode == 105) {
    alert('天王星');
  } else if (keyCode == 48 || keyCode == 96) {
    alert('海王星');
  }
};
