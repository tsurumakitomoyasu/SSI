let loadingbg = document.getElementsByClassName('loadingbg');
setTimeout(function () {
  document.getElementById('loadingbg1').classList.add('loadingani1');
  document.getElementById('loadingbg2').classList.add('loadingani2');
  document.getElementById('loadingbg3').classList.add('loadingani3');
}, 700);
setTimeout(function () {
  document.getElementById('planetloadWrap').classList.add('none');
}, 1400);
setTimeout(function () {
  for (let i = 0; i < 3; i++) {
    loadingbg[i].classList.add('none');
  }
}, 2200);

window.addEventListener('load', init);
let scene;
let camera;
let controls;
let mars = new planet('../images/mars.jpg', 50, 20, 20);
let material;
let geometry;
let marsMesh;
let renderer;
let light
let width = document.getElementById('stage').clientWidth;
let height = innerHeight;

function init() {
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#stage'),
  });
  renderer.setSize(width, height);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(45, width / height);
  camera.position.set(0, 0, 200);
  controls = new THREE.OrbitControls(camera);
  controls.minDistance = 200;
  controls.maxDistance = 200;
  controls.enableDamping = true;
  controls.enableKeys = false;
  controls.enablePan = false;
  controls.dampingFactor = 0.6;

  light = new THREE.AmbientLight(0xFFFFFF, 2.0);
  scene.add(light);

  material = mars.Material;

  geometry = mars.Geometry;
  marsMesh = new THREE.Mesh(geometry, material);
  scene.add(marsMesh);

  tick();

  function tick() {
    marsMesh.rotation.y += 0.005;
    controls.update();
    renderer.render(scene, camera);
    requestAnimationFrame(tick);
  }
};

let maintitle = new Vue({
  el: '#maintitle',
  data: {
    maintitle: '<h1>火星/MARS</h1>'
  }
});

planetVue.title1 = '<h2>火星の特徴</h2>';
planetVue.title2 = '<h2>地球に似た火星</h2>';
planetVue.title3 = '<h2>火星探査機「のぞみ」</h2>';

planetVue.text1 = '<p><img src="../images/marsinfo.gif" alt="火星情報">火星の地表の岩石の中には酸化鉄がふくまれている。火星にはわずかに酸素があって、その酸素が地表を酸化させている。その影響で火星は赤く見える。<br>火星にはオリンポス山、アスクレウス山、パボニス山、アルシア山といった火山や、マリナー谷がある。火山活動がおきたときに、地下の氷がとけて洪水のように流れだし、川のあとのように残っていたり、雨の流れたような痕もある。そして、地球の北極や南極と同じように、極冠とよばれる氷もあり、火星に四季があることがわかっている。</p>';
planetVue.text2 = '<p>火星は、地球とにている部分が多い惑星である。四季の変化もあり、1日の長さも、24時間37分22秒と、ほぼ同じ。地球とちがうところは、太陽のまわりを1周するのに約687日もかかるため、四季の長さは地球の2倍に。そして、星は地球の約半分の大きさで、重力は1/3しかありません。</p>';
planetVue.text3 = '<p><img src="../images/terraforming.jpg" alt="テラフォーミング計画">昔は火星にも、ぶ厚い大気や海があったと考えられていますが、重力が弱かったために、大気は宇宙空間へきえ、海もなくなってしまった。<br>火星の大気は、二酸化炭素95.3％、窒素2.7％、酸素0.15％、その他1.85％。そんな火星を地球のような環境にして、人類が移住できるようなテラフォーミング計画もある。</p>';
planetVue.text4 = '<p><img src="../images/nozomi.jpg" alt="のぞみ">1998年に日本が打ち上げた火星探査機「のぞみ」は、日本初の星探査機で、火星の上層大気と太陽風との相互作用を研究することや火星の磁場を観測することなどが目的であった。火星への途上でトラブルが発生し、軌道をかえて予定より遅れて火星までは到達したものの、火星を周回する軌道に投入することはできなかった。</p>';
