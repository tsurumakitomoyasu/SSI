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
let theta = 0;

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
  venus.rotation.y += 0.0010;
  earth.rotation.y += 0.0005;
  crowd.rotation.y += 0.0010;
  mars.rotation.y += 0.002;
  jupiter.rotation.y += 0.003;
  saturn.rotation.y += 0.004;
  uranus.rotation.y += 0.005;
  neptune.rotation.y += 0.007;
  moon.rotation.y += 0.007;

  //惑星のスピード
  //月は修正した方がいいかも
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
