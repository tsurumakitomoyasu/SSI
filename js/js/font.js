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
