//ローディング
setTimeout(function () {
  let countElm = $('.count'),
    countSpeed = 15;

  countElm.each(function () {
    let self = $(this),
      countMax = self.attr('data-num'),
      thisCount = self.text(),
      countTimer;

    function timer() {
      countTimer = setInterval(function () {
        let countNext = thisCount++;
        self.text(countNext);

        if (countNext == countMax) {
          clearInterval(countTimer);
          $('.loading').addClass('loadingOut');
          $('.loadingimg').addClass('loadingOut');
        }
      }, countSpeed);
    }
    timer();
  });
}, 700);

//画像変更処理
$(function () {
  $('.infoBtn img').hover(function () {
    $(this).attr('src', $(this).attr('src').replace('_off', '_on'));
  }, function () {
    if (!$(this).hasClass('currentPage')) {
      $(this).attr('src', $(this).attr('src').replace('_on', '_off'));
    }
  });
});

//詳細表示
//ユーザー
$(function () {
  $('.userBtn').click(function () {
    if ($('.userinfo').hasClass('userOut')) {
      $('.userinfo').removeClass('userOut');
      $('.userinfo').addClass('userIn');
      $('#logout').removeClass('lognone');
      $('#logout').addClass('logblock');
    }
  });

  $('#userBack').click(function () {
    if (!$('.userinfo').hasClass('userOut')) {
      $('.userinfo').removeClass('userIn');
      $('.userinfo').addClass('userOut');
      $('#logout').removeClass('logblock');
      $('#logout').addClass('lognone');
    }
  });
});

$(function () {
  $('.speechBtn').click(function () {
    if ($(this).hasClass('speechout')) {
      recognition.stop();
      $(this).removeClass('speechout');
    } else {
      recognition.start();
      $(this).addClass('speechout');
    }
  });
});

history.pushState(null, null, null);
$(window).on('popstate', function (event) {
  if (!event.originalEvent.state) {
    history.pushState(null, null, null);
    return;
  }
});

window.addEventListener('keydown', Keydown);

function Keydown(event) {
  let keyCode = event.keyCode;

  if (keyCode == 68) {
    if ($('.speechBtn').hasClass('speechout')) {
      recognition.stop();
      $('.speechBtn').removeClass('speechout');
    } else {
      recognition.start();
      $('.speechBtn').addClass('speechout');
    }
  }

  if (keyCode == 65) {
    if ($('.userinfo').hasClass('userOut')) {
      $('.userinfo').removeClass('userOut');
      $('.userinfo').addClass('userIn');
      $('#logout').removeClass('lognone');
      $('#logout').addClass('logblock');
    } else {
      $('.userinfo').removeClass('userIn');
      $('.userinfo').addClass('userOut');
      $('#logout').removeClass('logblock');
      $('#logout').addClass('lognone');
    }
  }
};
let scene;
let camera;
let light;
let ambient;
let gridHelper;
let axisHelper;
let lightHelper;
let renderer;
let loader;
let width = window.innerWidth; //要修正
let height = window.innerHeight; //要修正
let controls;

//ピッキング処理用変数
let targetSun = [];
let targetMercury = [];
let targetVenus = [];
let targetEarth = [];
let targetMars = [];
let targetJupiter = [];
let targetSaturn = [];
let targetUranus = [];
let targetNeptune = [];
let targetMoon = [];

// テクスチャー
let textureSun;
let textureMercury;
let textureVenus;
let textureEarth;
let textureCrowd;
let textureMars;
let textureJupiter;
let textureSaturn;
let textureSaturnRing;
let textureUranus;
let textureUranusRing;
let textureNeptune;
let textureUniverse;
let textureMoon;

// オブジェクト
let sun;
let mercury;
let venus;
let earth;
let crowd;
let mars;
let jupiter;
let saturn;
let saturnRing;
let uranus;
let uranusRing;
let neptune;
let universe;
let moon;

// ポジション
let mercuryX = 80;
let mercuryZ = 80;
let venusX = 120;
let venusZ = 120;
let earthX = 170;
let earthZ = 170;
let marsX = 230;
let marsZ = 230;
let jupiterX = 280;
let jupiterZ = 280;
let saturnX = 350;
let saturnZ = 350;
let uranusX = 410;
let uranusZ = 410;
let neptuneX = 460;
let neptuneZ = 460;
let moonX = 25;
let moonZ = 25;

let mercuryTheta = 10;
let venusTheta = 160;
let earthTheta = 0;
let marsTheta = 100;
let jupiterTheta = 160;
let saturnTheta = 80;
let uranusTheta = 200;
let neptuneTheta = 270;
let moonTheta = 0;

// ステージ
scene = new THREE.Scene();
// テクスチャーリスト
let manifest = [{
    id: 'sun',
    src: '../images/sun.jpg'
  }, // 水星
  {
    id: 'mercury',
    src: '../images/mercury.jpg'
  }, // 水星
  {
    id: 'venus',
    src: '../images/venus.jpg'
  }, // 金星
  {
    id: 'earth',
    src: '../images/earth.jpg'
  }, // 地球
  {
    id: 'crowd',
    src: '../images/crowd.png'
  }, // 雲
  {
    id: 'mars',
    src: '../images/mars.jpg'
  }, // 火星
  {
    id: 'jupiter',
    src: '../images/jupiter.jpg'
  }, // 木星
  {
    id: 'saturn',
    src: '../images/saturn.jpg'
  }, // 土星
  {
    id: 'saturn-ring',
    src: '../images/saturn-ring.jpg'
  }, // 土星の輪
  {
    id: 'uranus',
    src: '../images/uranus.jpg'
  }, // 天王星
  {
    id: 'uranus-ring',
    src: '../images/uranus-ring.jpg'
  }, // 天王星の輪
  {
    id: 'neptune',
    src: '../images/neptune.jpg'
  }, // 海王星
  {
    id: 'universe',
    src: '../images/space.jpg'
  }, // 宇宙空間
  {
    id: 'moon',
    src: '../images/moon.jpg'
  } //月
];

// ロードキューを作成
let loadQueue = new createjs.LoadQueue();

// ロード完了を監視
loadQueue.on('complete', function () {
  // loadQueueから画像データ取得
  let sunImg = loadQueue.getResult('sun');
  let mercuryImg = loadQueue.getResult('mercury');
  let venusImg = loadQueue.getResult('venus');
  let earthImg = loadQueue.getResult('earth');
  let crowdImg = loadQueue.getResult('crowd');
  let marsImg = loadQueue.getResult('mars');
  let jupiterImg = loadQueue.getResult('jupiter');
  let saturnImg = loadQueue.getResult('saturn');
  let saturnRingImg = loadQueue.getResult('saturn-ring');
  let uranusImg = loadQueue.getResult('uranus');
  let uranusRingImg = loadQueue.getResult('uranus-ring');
  let neptuneImg = loadQueue.getResult('neptune');
  let universeImg = loadQueue.getResult('universe');
  let moonImg = loadQueue.getResult('moon');

  // three.jsテクスチャー変換
  textureSun = new THREE.Texture(sunImg);
  textureMercury = new THREE.Texture(mercuryImg);
  textureVenus = new THREE.Texture(venusImg);
  textureEarth = new THREE.Texture(earthImg);
  textureCrowd = new THREE.Texture(crowdImg);
  textureMars = new THREE.Texture(marsImg);
  textureJupiter = new THREE.Texture(jupiterImg);
  textureSaturn = new THREE.Texture(saturnImg);
  textureSaturnRing = new THREE.Texture(saturnRingImg);
  textureUranus = new THREE.Texture(uranusImg);
  textureUranusRing = new THREE.Texture(uranusRingImg);
  textureNeptune = new THREE.Texture(neptuneImg);
  textureUniverse = new THREE.Texture(universeImg);
  textureMoon = new THREE.Texture(moonImg);

  // 更新許可
  textureSun.needsUpdate = true;
  textureMercury.needsUpdate = true;
  textureVenus.needsUpdate = true;
  textureEarth.needsUpdate = true;
  textureCrowd.needsUpdate = true;
  textureMars.needsUpdate = true;
  textureJupiter.needsUpdate = true;
  textureSaturn.needsUpdate = true;
  textureSaturnRing.needsUpdate = true;
  textureUranus.needsUpdate = true;
  textureUranusRing.needsUpdate = true;
  textureNeptune.needsUpdate = true;
  textureUniverse.needsUpdate = true;
  textureMoon.needsUpdate = true;

  sun = planetFactory(textureSun, 50, 20, 20, 0, 0, 'isSun');
  mercury = planetFactory(textureMercury, 5, 20, 20, mercuryX, mercuryZ, 'isMercury');
  venus = planetFactory(textureVenus, 10, 20, 20, venusX, venusZ, 'isVenus');
  earth = planetFactory(textureEarth, 13, 20, 20, earthX, earthZ, 'isEarth');
  mars = planetFactory(textureMars, 7, 20, 20, marsX, marsZ, 'isMars');
  jupiter = planetFactory(textureJupiter, 30, 20, 20, jupiterX, jupiterZ, 'isJupiter');
  saturn = planetFactory(textureSaturn, 18, 20, 20, saturnX, saturnZ, 'isSaturn');
  uranus = planetFactory(textureUranus, 20, 20, 20, uranusX, uranusZ, 'isUranus');
  neptune = planetFactory(textureNeptune, 17, 20, 20, neptuneX, neptuneZ, 'isNeptune');
  universe = planetFactory(textureUniverse, 10000, 20, 20, 0, 0, 'isUniverse');
  moon = planetFactory(textureMoon, 5, 20, 20, 0, 0, 'isMoon');
  render();
});

// テクスチャーロード
loadQueue.loadManifest(manifest);

// 点光源
light = new THREE.PointLight(0xffffff, 3, 0);
light.position.set(0, 0, 0);
scene.add(light);

// 環境光
ambient = new THREE.AmbientLight(0x222222);
scene.add(ambient);

// カメラ
camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000000);
camera.position.set(400, 200, 300);

// カメラ操作
controls = new THREE.OrbitControls(camera);
controls.minDistance = 350; //カメラ最小値
controls.maxDistance = 700; //カメラ最大値
controls.enableDamping = true;
controls.enableKeys = false;
controls.enablePan = false;
controls.dampingFactor = .1;

// レンダラー
renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#stage')
});
renderer.setSize(width, height);

function planetFactory(texture, radius, widthSegments, heightSegments, x, z, planetName) {
  let sphere,
    sphereMercury,
    sphereVenus,
    sphereEarth,
    sphereMars,
    sphereJupiter,
    sphereSaturn,
    sphereUranus,
    sphereNeptune,
    ring;

  //太陽
  if (planetName === 'isSun') {
    //グループ化
    sphere = new THREE.Group();

    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshBasicMaterial({ // 材質
        map: texture,
        side: THREE.DoubleSide // 裏からも
      })
    );

    sphere.add(sunText);
    targetSun.push(sphere);

    sphere.position.set(x, 0, z);
  } else if (planetName === 'isMercury') {
    //グループ化
    sphere = new THREE.Group();
    sphereMercury = new THREE.Group();

    sphereMercury = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    sphere.add(sphereMercury);
    sphereMercury.add(mercuryText);
    targetMercury.push(sphereMercury);

    sphere.position.set(x, 0, z);
  } else if (planetName === 'isVenus') {
    //グループ化
    sphere = new THREE.Group();
    sphereVenus = new THREE.Group();

    sphereVenus = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    sphere.add(sphereVenus);
    sphereVenus.add(venusText);
    targetVenus.push(sphereVenus);

    sphere.position.set(x, 0, z);
  } else if (planetName === 'isEarth') {
    //グループ化
    sphere = new THREE.Group();
    sphereEarth = new THREE.Group();

    sphereEarth = new THREE.Mesh(
      new THREE.SphereGeometry(13, 20, 20), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    crowd = new THREE.Mesh(
      new THREE.SphereGeometry(14, 20, 20), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: textureCrowd,
        transparent: true,
        side: THREE.DoubleSide // 裏からも
      })
    );

    sphereEarth.add(earthText);
    sphere.add(sphereEarth);
    sphere.add(crowd);
    targetEarth.push(sphereEarth);

    /*sphere.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 500 - 250
    );*/
    sphere.position.set(x, 0, z);
  } else if (planetName === 'isMoon') {
    //グループ化
    sphere = new THREE.Group();

    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    sphere.add(moonText);
    targetMoon.push(sphere);

    /*sphere.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 500 - 250
    );*/
    sphere.position.set(x, 0, z);
  } else if (planetName === 'isMars') {
    //グループ化
    sphere = new THREE.Group();
    sphereMars = new THREE.Group();

    sphereMars = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    sphereMars.add(marsText);
    sphere.add(sphereMars);
    targetMars.push(sphereMars);

    sphere.position.set(x, 0, z);
  } else if (planetName === 'isJupiter') {
    //グループ化
    sphere = new THREE.Group();
    sphereJupiter = new THREE.Group();

    sphereJupiter = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    sphereJupiter.add(jupiterText);
    sphere.add(sphereJupiter);
    targetJupiter.push(sphereJupiter);

    sphere.position.set(x, 0, z);
  } else if (planetName === 'isSaturn') {
    //グループ化
    sphere = new THREE.Group();
    sphereSaturn = new THREE.Group();

    sphereSaturn = new THREE.Mesh(
      new THREE.SphereGeometry(13, 20, 20), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    // 輪を作る
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(22, 5, 2, 1000), // 芯円半径、断面円半径、断面円分割、芯円分割
      new THREE.MeshPhongMaterial({ // 材質
        map: texture,
        opacity: 0.7,
        transparent: true
      })
    );
    ring.rotation.x = 1.5

    sphereSaturn.add(saturnText);
    sphere.add(sphereSaturn);
    sphere.add(ring);

    targetSaturn.push(sphereSaturn);

    /*sphere.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 500 - 250
    );*/
    sphere.position.set(x, 0, z);
  } else if (planetName === 'isUranus') {
    //グループ化
    sphere = new THREE.Group();
    sphereUranus = new THREE.Group();

    sphereUranus = new THREE.Mesh(
      new THREE.SphereGeometry(13, 20, 20), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    // 輪を作る
    ring = new THREE.Mesh(
      new THREE.TorusGeometry(18, 5, 2, 1000), // 芯円半径、断面円半径、断面円分割、芯円分割
      new THREE.MeshPhongMaterial({ // 材質
        map: texture,
        opacity: 0.7,
        transparent: true
      })
    );
    ring.rotation.x = 1.5

    sphereUranus.add(uranusText);
    sphere.add(sphereUranus);
    sphere.add(ring);

    targetUranus.push(sphereUranus);

    /*sphere.position.set(
      Math.random() * 500 - 250,
      Math.random() * 500 - 250,
      Math.random() * 500 - 250
    );*/
    sphere.position.set(x, 0, z);
  } else if (planetName === 'isNeptune') {
    //グループ化
    sphere = new THREE.Group();
    sphereNeptune = new THREE.Group();

    sphereNeptune = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture
      })
    );

    sphereNeptune.add(neptuneText);
    sphere.add(sphereNeptune);
    targetNeptune.push(sphereNeptune);

    sphere.position.set(x, 0, z);
  } else if (planetName === 'isUniverse') {
    sphere = new THREE.Mesh(
      new THREE.SphereGeometry(radius, widthSegments, heightSegments), // 形状
      new THREE.MeshLambertMaterial({ // 材質
        map: texture,
        side: THREE.DoubleSide // 裏からも
      })
    );
    sphere.position.set(x, 0, z);
  }
  scene.add(sphere);
  return sphere;
};

function render() {
  requestAnimationFrame(render);
  //自転
  sun.rotation.y += 0.003;
  mercury.rotation.y += 0.005;
  venus.rotation.y -= 0.005;
  earth.rotation.y += 0.005;
  crowd.rotation.y += 0.008;
  mars.rotation.y += 0.002;
  jupiter.rotation.y += 0.003;
  saturn.rotation.y += 0.004;
  uranus.rotation.y += 0.005;
  neptune.rotation.y += 0.007;
  moon.rotation.y += 0.007;

  //惑星のスピード
  mercuryTheta -= 0.78;
  venusTheta -= 0.65;
  earthTheta -= 0.59;
  marsTheta -= 0.54;
  jupiterTheta -= 0.43;
  saturnTheta -= 0.4;
  uranusTheta -= 0.37;
  neptuneTheta -= 0.35;
  moonTheta -= 1;

  //回転固定
  /*mercuryTheta = 0.78;
  venusTheta = 0.65;
  earthTheta = 0.59;
  marsTheta = 0.54;
  jupiterTheta = 0.43;
  saturnTheta = 0.4;
  uranusTheta = 0.37;
  neptuneTheta = 0.35;
  moonTheta = 0.35;*/

  mercury.position.x = Math.cos(THREE.Math.degToRad(mercuryTheta)) * mercuryX;
  mercury.position.z = Math.sin(THREE.Math.degToRad(mercuryTheta)) * mercuryZ;
  venus.position.x = Math.cos(THREE.Math.degToRad(venusTheta)) * venusX;
  venus.position.z = Math.sin(THREE.Math.degToRad(venusTheta)) * venusZ;
  earth.position.x = Math.cos(THREE.Math.degToRad(earthTheta)) * earthX;
  earth.position.z = Math.sin(THREE.Math.degToRad(earthTheta)) * earthZ;
  mars.position.x = Math.cos(THREE.Math.degToRad(marsTheta)) * marsX;
  mars.position.z = Math.sin(THREE.Math.degToRad(marsTheta)) * marsZ;
  jupiter.position.x = Math.cos(THREE.Math.degToRad(jupiterTheta)) * jupiterX;
  jupiter.position.z = Math.sin(THREE.Math.degToRad(jupiterTheta)) * jupiterZ;
  saturn.position.x = Math.cos(THREE.Math.degToRad(saturnTheta)) * saturnX;
  saturn.position.z = Math.sin(THREE.Math.degToRad(saturnTheta)) * saturnZ;
  uranus.position.x = Math.cos(THREE.Math.degToRad(uranusTheta)) * uranusX;
  uranus.position.z = Math.sin(THREE.Math.degToRad(uranusTheta)) * uranusZ;
  neptune.position.x = Math.cos(THREE.Math.degToRad(neptuneTheta)) * neptuneX;
  neptune.position.z = Math.sin(THREE.Math.degToRad(neptuneTheta)) * neptuneZ;
  moon.position.x = Math.cos(THREE.Math.degToRad(moonTheta)) * moonX + earth.position.x;
  moon.position.z = Math.sin(THREE.Math.degToRad(moonTheta)) * moonZ + earth.position.z;

  controls.update();
  renderer.render(scene, camera);
};
let sunimageText;
let mercuryimageText;
let venusimageText;
let earthimageText;
let moonimageText;
let marsimageText;
let jupiterimageText;
let saturnimageText;
let uranusimageText;
let neptuneimageText;

let sunText;
let mercuryText;
let venusText;
let earthText;
let moonText;
let marsText;
let jupiterText;
let saturnText;
let uranusText;
let neptuneText;

let targetTextSun = [];
let targetTextMercury = [];
let targetTextVenus = [];
let targetTextEarth = [];
let targetTextMoon = [];
let targetTextMars = [];
let targetTextJupiter = [];
let targetTextSaturn = [];
let targetTextUranus = [];
let targetTextNeptune = [];

sunimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/suntext.png')
});
sunText = new THREE.Sprite(sunimageText);
sunText.position.y = 64;
sunText.scale.set(50, 35, 50);
targetTextSun.push(sunText);

mercuryimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/mercurytext.png')
});
mercuryText = new THREE.Sprite(mercuryimageText);
mercuryText.position.y = 15;
mercuryText.scale.set(40, 27, 40);
targetTextMercury.push(mercuryText);

venusimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/venustext.png')
});
venusText = new THREE.Sprite(venusimageText);
venusText.position.y = 20;
venusText.scale.set(40, 27, 40);
targetTextVenus.push(venusText);

earthimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/earthtext.png')
});
earthText = new THREE.Sprite(earthimageText);
earthText.position.y = 25;
earthText.scale.set(40, 27, 40);
targetTextEarth.push(earthText);

moonimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/moontext.png')
});
moonText = new THREE.Sprite(moonimageText);
moonText.position.y = 16;
moonText.scale.set(17, 17, 17);
targetTextMoon.push(moonText);

marsimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/marstext.png')
});
marsText = new THREE.Sprite(marsimageText);
marsText.position.y = 19;
marsText.scale.set(40, 27, 40);
targetTextMars.push(marsText);

jupiterimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/jupitertext.png')
});
jupiterText = new THREE.Sprite(jupiterimageText);
jupiterText.position.y = 43;
jupiterText.scale.set(40, 27, 40);
targetTextJupiter.push(jupiterText);

saturnimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/saturntext.png')
});
saturnText = new THREE.Sprite(saturnimageText);
saturnText.position.y = 25;
saturnText.scale.set(40, 27, 40);
targetTextSaturn.push(saturnText);

uranusimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/uranustext.png')
});
uranusText = new THREE.Sprite(uranusimageText);
uranusText.position.y = 25;
uranusText.scale.set(50, 20, 40);
targetTextUranus.push(uranusText);

neptuneimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/neptunetext.png')
});
neptuneText = new THREE.Sprite(neptuneimageText);
neptuneText.position.y = 25;
neptuneText.scale.set(50, 20, 40);
targetTextNeptune.push(neptuneText);
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
window.addEventListener('keydown', handleKeydown);

function handleKeydown(event) {
  // キーコード(どのキーが押されたか)を取得
  let keycode = event.keyCode;

  //キーコードS
  if (keycode == 83) {
    location.href = './ssistop.php';
  }
};

$(function () {
  $('.stopBtn').click(function () {
    location.href = './ssistop.php';
  });
});
