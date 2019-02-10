history.pushState(null, null, null);
$(window).on('popstate', function (event) {
  if (!event.originalEvent.state) {
    history.pushState(null, null, null);
    return;
  }
});

$(function () {
  $('.topheader, main, .btn').fadeMover({
    'inSpeed': 800
  });
});

// next
$(function () {
  $('.next').click(function () {
    if (!$('.page1').hasClass('pagenone')) {
      // 2ページ目
      $('.page1').addClass('pagenone');
      $('.page2').addClass('pagenext');
      $('.page2').removeClass('pagenone');
      $('.prev').removeClass('btnnone');
      $('.footer').addClass('infooter');
    } else if ($('.page2').hasClass('pagenext')) {
      // 3ページ目
      $('.page3').removeClass('pagenone');
      $('.page2').removeClass('pagenext');
      $('.page2').addClass('pageprev1');
      $('.page2').addClass('pageprev');
      $('.page2').addClass('pagenone');
      $('.page3').addClass('pageNend');
      $('.next').addClass('btnnone');
    }
  });
});

// prev
$(function () {
  $('.prev').click(function () {
    if (!$('.page2').hasClass('pageprev')) {
      // 2ページ目
      $('.page1').removeClass('pagenone');
      $('.page2').removeClass('pagenext');
      $('.page2').removeClass('pageprev1');
      $('.page3').removeClass('pageNend');
      $('.page3').removeClass('pagePend');
      $('.page4').removeClass('pageNend');
      $('.footer').removeClass('infooter');
      $('.page2').addClass('pagenone');
      $('.prev').addClass('btnnone');
    } else if ($('.page2').hasClass('pageprev1')) {
      // 3ページ目
      $('.page2').removeClass('pagenone');
      $('.page2').removeClass('pageprev');
      $('.next').removeClass('btnnone');
      $('.page2').addClass('pagenext');
      $('.page3').addClass('pagenone');
    }
  });
});

// keycode
window.addEventListener('keydown', Keydown);

function Keydown(e) {
  let keycode = e.keyCode;
  if (keycode == 37) {
    // 左
    if (!$('.page2').hasClass('pageprev')) {
      // 2ページ目
      $('.page1').removeClass('pagenone');
      $('.page2').removeClass('pagenext');
      $('.page2').removeClass('pageprev1');
      $('.page3').removeClass('pageNend');
      $('.page3').removeClass('pagePend');
      $('.page4').removeClass('pageNend');
      $('.footer').removeClass('infooter');
      $('.page2').addClass('pagenone');
      $('.prev').addClass('btnnone');
    } else if ($('.page2').hasClass('pageprev1')) {
      // 3ページ目
      $('.page2').removeClass('pagenone');
      $('.page2').removeClass('pageprev');
      $('.next').removeClass('btnnone');
      $('.page2').addClass('pagenext');
      $('.page3').addClass('pagenone');
    }
  } else if (keycode == 39) {
    // 右
    if (!$('.page1').hasClass('pagenone')) {
      // 2ページ目
      $('.page1').addClass('pagenone');
      $('.page2').addClass('pagenext');
      $('.footer').addClass('infooter');
      $('.page2').removeClass('pagenone');
      $('.prev').removeClass('btnnone');
    } else if ($('.page2').hasClass('pagenext')) {
      // 3ページ目
      $('.page3').removeClass('pagenone');
      $('.page2').removeClass('pagenext');
      $('.page2').addClass('pageprev1');
      $('.page2').addClass('pageprev');
      $('.page2').addClass('pagenone');
      $('.page3').addClass('pageNend');
      $('.next').addClass('btnnone');
    }
  }

  if (keycode == 13) {
    if (!$('.page4').hasClass('pagenone')) {
      location.href = "./ssi.php";
    }
  }
};

function eventClick() {
  location.href = "./ssi.php";
};
