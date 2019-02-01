//ローディング
setTimeout(function () {
  let countElm = $('.count'),
    countSpeed = 10;

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

$(function () {
  setTimeout(function () {
    $('#stage').addClass('moveani');
  }, 1500);
});

$(function () {
  $('.stopBtn').click(function () {
    if ($('#stage').hasClass('move')) {
      $('#stage').removeClass('move');
      $('#stage').removeClass('moveani');
    } else if (!$('#stage').hasClass('stop')) {
      if (!$('#stage').hasClass('move')) {
        $('#stage').addClass('stop');
      }
    } else if ($('#stage').hasClass('stop')) {
      $('#stage').removeClass('stop');
      $('#stage').addClass('move');
      setTimeout(function () {
        $('#stage').addClass('moveani');
      }, 50);
    }
  });
});

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
let sunX;
let sunZ;
let mercuryX;
let mercuryZ;
let venusX;
let venusZ;
let earthX;
let earthZ;
let marsX;
let marsZ;
let jupiterX;
let jupiterZ;
let saturnX;
let saturnZ;
let uranusX;
let uranusZ;
let neptuneX;
let neptuneZ;
let moonX;
let moonZ;

let mercuryTheta;
let venusTheta;
let earthTheta;
let marsTheta;
let jupiterTheta;
let saturnTheta;
let uranusTheta;
let neptuneTheta;
let moonTheta;

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

  sun = planetFactory(textureSun, 50, 20, 20, sunX, sunZ, 'isSun');
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
  if ($('#stage').hasClass('move')) {
    if (!$('#stage').hasClass('moveani')) {
      mercuryTheta = 10;
      venusTheta = 500;
      earthTheta = 0;
      marsTheta = 100;
      jupiterTheta = 160;
      saturnTheta = 80;
      uranusTheta = 200;
      neptuneTheta = 330;
      moonTheta = 0;
    }
  }
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
  if ($('#stage').hasClass('move')) {
    mercuryTheta -= 0.78;
    venusTheta -= 0.65;
    earthTheta -= 0.59;
    marsTheta -= 0.54;
    jupiterTheta -= 0.43;
    saturnTheta -= 0.4;
    uranusTheta -= 0.37;
    neptuneTheta -= 0.35;
    moonTheta -= 1;
  } else if ($('#stage').hasClass('stop')) {
    mercuryTheta = 0;
    venusTheta = 0;
    earthTheta = 0;
    marsTheta = 0;
    jupiterTheta = 0;
    saturnTheta = 0;
    uranusTheta = 0;
    neptuneTheta = 0;
    moonTheta = 0;
  }
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
  if ($('#stage').hasClass('move')) {
    sunX = 0;
    sunZ = 0;
    mercuryX = 80;
    mercuryZ = 80;
    venusX = 120;
    venusZ = 120;
    earthX = 170;
    earthZ = 170;
    marsX = 230;
    marsZ = 230;
    jupiterX = 280;
    jupiterZ = 280;
    saturnX = 350;
    saturnZ = 350;
    uranusX = 410;
    uranusZ = 410;
    neptuneX = 460;
    neptuneZ = 460;
    moonX = 25;
    moonZ = 25;
  } else if ($('#stage').hasClass('stop')) {
    sunX = -230;
    sunZ = -230;
    mercuryX = -150;
    mercuryZ = -150;
    venusX = -110;
    venusZ = -110;
    earthX = -60;
    earthZ = -60;
    marsX = 0;
    marsZ = 0;
    jupiterX = 50;
    jupiterZ = 50;
    saturnX = 120;
    saturnZ = 120;
    uranusX = 180;
    uranusZ = 180;
    neptuneX = 230;
    neptuneZ = 230;
    moonX = 25;
    moonZ = 25;
  }

  if ($('#stage').hasClass('move')) {
    light.position.set(0, 0, 0);
  } else if ($('#stage').hasClass('stop')) {
    light.position.set(sunX, 0, 0);
  }

  sun.position.x = Math.cos(THREE.Math.degToRad(mercuryTheta)) * sunX;
  sun.position.z = Math.sin(THREE.Math.degToRad(mercuryTheta)) * sunZ;
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
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/sun.html';
    }, 600);
  } else if (interMe.length > 0 || interTME.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/mercury.html';
    }, 600);
  } else if (interVe.length > 0 || interTV.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/venus.html';
    }, 600);
  } else if (interEa.length > 0 || interTE.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../php/earth.php';
    }, 600);
  } else if (interMa.length > 0 || interTMA.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/mars.html';
    }, 600);
  } else if (interJu.length > 0 || interTJ.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/jupiter.html';
    }, 600);
  } else if (interSa.length > 0 || interTSA.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/saturn.html';
    }, 600);
  } else if (interUr.length > 0 || interTU.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/uranus.html';
    }, 600);
  } else if (interNe.length > 0 || interTN.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/neptune.html';
    }, 600);
  } else if (interMo.length > 0 || interTMO.length > 0) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/moon.html';
    }, 600);
  }
};

//web Speech API
let recognition = new webkitSpeechRecognition();
recognition.lang = "ja-JP";

recognition.addEventListener('result', function (e) {
  let speechtext = e.results[0][0].transcript;
  switch (speechtext) {
    case '太陽':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/sun.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '彗星':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/mercury.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case 'きんせい':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/venus.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '地球':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../php/earth.php';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '月':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/moon.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '火星':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/mars.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '木星':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/jupiter.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '土星':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/saturn.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '天王星':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/uranus.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    case '海王星':
      $('.inbg').addClass('inbgani');
      setTimeout(function () {
        location.href = '../html/neptune.html';
      }, 600);
      //alert(e.results[0][0].transcript);
      break;
    default:
      //alert(e.results[0][0].transcript);
      $(".speechBtn").removeClass("speechout");
      recognition.stop();
      break;
  }
});

window.addEventListener('keydown', Keydown);

function Keydown(event) {
  let keyCode = event.keyCode;

  // 惑星分岐
  if (keyCode == 49 || keyCode == 97) {
    //alert('太陽');
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/sun.html';
    }, 600);
  } else if (keyCode == 50 || keyCode == 98) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/mercury.html';
    }, 600);
  } else if (keyCode == 51 || keyCode == 99) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/venus.html';
    }, 600);
  } else if (keyCode == 52 || keyCode == 100) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../php/earth.php';
    }, 600);
  } else if (keyCode == 53 || keyCode == 101) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/moon.html';
    }, 600);
  } else if (keyCode == 54 || keyCode == 102) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/mars.html';
    }, 600);
  } else if (keyCode == 55 || keyCode == 103) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/jupiter.html';
    }, 600);
  } else if (keyCode == 56 || keyCode == 104) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/saturn.html';
    }, 600);
  } else if (keyCode == 57 || keyCode == 105) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/uranus.html';
    }, 600);
  } else if (keyCode == 48 || keyCode == 96) {
    $('.inbg').addClass('inbgani');
    setTimeout(function () {
      location.href = '../html/neptune.html';
    }, 600);
  }

  // Web Speech API分岐
  if (keyCode == 68) {
    if ($('.speechBtn').hasClass('speechout')) {
      recognition.stop();
      $('.speechBtn').removeClass('speechout');
    } else {
      recognition.start();
      $('.speechBtn').addClass('speechout');
    }
  }

  // ユーザー分岐
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

  // ストップ分岐
  if (keyCode == 83) {
    if ($('#stage').hasClass('move')) {
      $('#stage').removeClass('move');
      $('#stage').removeClass('moveani');
    } else if (!$('#stage').hasClass('stop')) {
      if (!$('#stage').hasClass('move')) {
        $('#stage').addClass('stop');
      }
    } else if ($('#stage').hasClass('stop')) {
      $('#stage').removeClass('stop');
      $('#stage').addClass('move');
      setTimeout(function () {
        $('#stage').addClass('moveani');
      }, 50);
    }
  }
};
