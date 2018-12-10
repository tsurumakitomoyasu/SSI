//各惑星イメージ読み込み用
let sunimageText;
let mercuryimageText;
let venusimageText;
let earthimageText;
let marsimageText;
let jupiterimageText;
let saturnimageText;
let uranusimageText;
let neptuneimageText;
let moonimageText;

//各惑星テキスト
let sunText;
let mercuryText;
let venusText;
let earthText;
let marsText;
let jupiterText;
let saturnText;
let uranusText;
let neptuneText;
let moonText;

//太陽
sunimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/suntext.png'),
});
sunText = new THREE.Sprite(sunimageText);
sunText.position.y = 64;
sunText.scale.set(50, 35, 50);

//水星
mercuryimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/mercurytext.png'),
});
mercuryText = new THREE.Sprite(mercuryimageText);
mercuryText.position.y = 15;
mercuryText.scale.set(40, 27, 40);

//金星
venusimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/venustext.png'),
});
venusText = new THREE.Sprite(venusimageText);
venusText.position.y = 20;
venusText.scale.set(40, 27, 40);

//地球
earthimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/earthtext.png'),
});
earthText = new THREE.Sprite(earthimageText);
earthText.position.y = 25;
earthText.scale.set(40, 27, 40);

//月
moonimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/moontext.png'),
});
moonText = new THREE.Sprite(moonimageText);
moonText.position.y = 16;
moonText.scale.set(17, 17, 17);

//火星
marsimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/marstext.png'),
});
marsText = new THREE.Sprite(marsimageText);
marsText.position.y = 19;
marsText.scale.set(40, 27, 40);

//木星
jupiterimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/jupitertext.png'),
});
jupiterText = new THREE.Sprite(jupiterimageText);
jupiterText.position.y = 43;
jupiterText.scale.set(40, 27, 40);

//土星
saturnimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/saturntext.png'),
});
saturnText = new THREE.Sprite(saturnimageText);
saturnText.position.y = 25;
saturnText.scale.set(40, 27, 40);

//天王星
uranusimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/uranustext.png'),
});
uranusText = new THREE.Sprite(uranusimageText);
uranusText.position.y = 30;
uranusText.scale.set(70, 27, 40);

//海王星
neptuneimageText = new THREE.SpriteMaterial({
  map: new THREE.TextureLoader().load('../images/neptunetext.png'),
});
neptuneText = new THREE.Sprite(neptuneimageText);
neptuneText.position.y = 30;
neptuneText.scale.set(70, 27, 40);
