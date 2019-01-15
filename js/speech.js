SpeechRecognition = webkitSpeechRecognition || SpeechRecognition;
let recognition = new SpeechRecognition();

recognition.lang = 'ja-JP';

recognition.onresult = (e) => {
  /*if (e.results[0][0].transcript == '太陽') {
    location.href = '../html/sun.html';
  } else if (e.results[0][0].transcript == '彗星') {
    location.href = '../html/mercury.html';
  } else if (e.results[0][0].transcript == '金星') {
    location.href = '../html/venus.html';
  } else if (e.results[0][0].transcript == '地球') {
    location.href = '../html/earth.html';
  } else if (e.results[0][0].transcript == '火星') {
    location.href = '../html/mars.html';
  } else if (e.results[0][0].transcript == '木星') {
    location.href = '../html/jupiter.html';
  } else if (e.results[0][0].transcript == '土星') {
    location.href = '../html/saturn.html';
  } else if (e.results[0][0].transcript == '天王星') {
    location.href = '../html/uranus.html';
  } else if (e.results[0][0].transcript == '海王星') {
    location.href = '../html/neptune.html';
  } else if (e.results[0][0].transcript == '月') {
    location.href = '../html/moon.html';
  } else {
    recognition.stop();
  }*/
  if (e.results[0][0].transcript == '太陽') {
    alert('月');
  }
};
/*window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
let recognition = new webkitSpeechRecognition();
recognition.lang = 'ja-JP';

recognition.onresult = (event) => {
  if (event.results[0][0].transcript == "太陽") {
    location.href = '../html/sun.html';
    //alert(event.results[0][0].transcript);
  } else if (event.results[0][0].transcript == '彗星') {
    location.href = '../html/mercury.html';
  } else if (event.results[0][0].transcript == 'きんせい') {
    location.href = '../html/venus.html';
  } else if (event.results[0][0].transcript == '地球') {
    location.href = '../html/earth.html';
  } else if (event.results[0][0].transcript == '火星') {
    location.href = '../html/mars.html';
  } else if (event.results[0][0].transcript == '木星') {
    location.href = '../html/jupiter.html';
  } else if (event.results[0][0].transcript == '土星') {
    location.href = '../html/saturn.html';
  } else if (event.results[0][0].transcript == '天王星') {
    location.href = '../html/uranus.html';
  } else if (event.results[0][0].transcript == '海王星') {
    location.href = '../html/neptune.html';
  } else if (event.results[0][0].transcript == '月') {
    location.href = '../html/moon.html';
  } else {
    $(".speechBtn").removeClass("speechout");
    //recognition.stop();
    alert(Speechevent.results[0][0].transcript);
  }
};*/
