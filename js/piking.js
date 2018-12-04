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
  let interMe = raycaster.intersectObjects(targetMercury);
  let interVe = raycaster.intersectObjects(targetVenus);
  let interEa = raycaster.intersectObjects(targetEarth);
  let interMa = raycaster.intersectObjects(targetMars);
  let interJu = raycaster.intersectObjects(targetJupiter);
  let interSa = raycaster.intersectObjects(targetSaturn);
  let interUr = raycaster.intersectObjects(targetUranus);
  let interNe = raycaster.intersectObjects(targetNeptune);

  //条件処理
  if (interMe.length > 0) {
    //alert('水星');
    location.href = "https://syncer.jp/";
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
  }
};
