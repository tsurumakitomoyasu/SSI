window.addEventListener('load', init);
let scene;
let camera;
let controls;
let material;
let geometry;
let marsMesh;
let renderer;
let light
let width = $('#stage').width();
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
  controls.dampingFactor = 0.6;

  light = new THREE.AmbientLight(0xFFFFFF, 2.0);
  scene.add(light);

  material = new THREE.MeshStandardMaterial({
    map: new THREE.TextureLoader().load('../images/mars.jpg')
  });

  geometry = new THREE.SphereGeometry(50, 20, 20);
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

$(function () {
  $('#back').click(function () {
    history.back();
  });
});

window.addEventListener('keydown', Keydown);

function Keydown(event) {
  let keycode = event.keyCode;

  if (keycode == 66) {
    history.back();
  }

  //ページ以降
  if (keycode == 39) {
    if (!$('.infotext1').hasClass('none')) {
      $('.infotext2').removeClass('none');
      $('.infotext1').addClass('none');
      $('.next').addClass('none');
      $('.prev').removeClass('none');
    }
  } else if (keycode == 37) {
    if ($('.infotext1').hasClass('none')) {
      $('.infotext1').removeClass('none');
      $('.infotext2').addClass('none');
      $('.prev').addClass('none');
      $('.next').removeClass('none');
    }
  }
};

$(function () {
  $('.prev').click(function () {
    $('.infotext1').removeClass('none');
    $('.infotext2').addClass('none');
    $('.prev').addClass('none');
    $('.next').removeClass('none');
  });
  $('.next').click(function () {
    $('.infotext2').removeClass('none');
    $('.infotext1').addClass('none');
    $('.next').addClass('none');
    $('.prev').removeClass('none');
  });
});