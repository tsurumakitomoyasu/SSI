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
}, 400);

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
