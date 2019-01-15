history.pushState(null, null, null);
$(window).on('popstate', function (event) {
  if (!event.originalEvent.state) {
    history.pushState(null, null, null);
    return;
  }
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
    } else if ($('.page2').hasClass('pagenext')) {
      // 3ページ目
      $('.page3').removeClass('pagenone');
      $('.page2').removeClass('pagenext');
      $('.page2').addClass('pageprev1');
      $('.page2').addClass('pageprev');
      $('.page2').addClass('pagenone');
      $('.page3').addClass('pageNend');
    } else if ($('.page3').hasClass('pageNend')) {
      // 4ページ目
      $('.page2').removeClass('pageprev1');
      $('.page3').removeClass('pageNend');
      $('.page4').removeClass('pagenone');
      $('.page4').removeClass('pageNend');
      $('.page3').addClass('pagenone');
      $('.page3').addClass('pagePend');
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
      $('.page2').addClass('pagenone');
      $('.prev').addClass('btnnone');
    } else if ($('.page2').hasClass('pageprev1')) {
      // 3ページ目
      $('.page2').removeClass('pagenone');
      $('.page2').removeClass('pageprev');
      $('.page2').addClass('pagenext');
      $('.page3').addClass('pagenone');
    } else if ($('.page3').hasClass('pagePend')) {
      // 4ページ目
      $('.page2').addClass('pageprev1');
      $('.page2').addClass('pageprev');
      $('.page3').addClass('pageNend');
      $('.page4').addClass('pagenone');
      $('.page4').addClass('pageNend');
      $('.page3').removeClass('pagenone');
      $('.paeg3').removeClass('pagePend');
      $('.next').removeClass('btnnone');
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
      $('.page2').addClass('pagenone');
      $('.prev').addClass('btnnone');
    } else if ($('.page2').hasClass('pageprev1')) {
      // 3ページ目
      $('.page2').removeClass('pagenone');
      $('.page2').removeClass('pageprev');
      $('.page2').addClass('pagenext');
      $('.page3').addClass('pagenone');
    } else if ($('.page3').hasClass('pagePend')) {
      // 4ページ目
      $('.page2').addClass('pageprev1');
      $('.page2').addClass('pageprev');
      $('.page3').addClass('pageNend');
      $('.page4').addClass('pagenone');
      $('.page4').addClass('pageNend');
      $('.page3').removeClass('pagenone');
      $('.paeg3').removeClass('pagePend');
      $('.next').removeClass('btnnone');
    }
  } else if (keycode == 39) {
    // 右
    if (!$('.page1').hasClass('pagenone')) {
      // 2ページ目
      $('.page1').addClass('pagenone');
      $('.page2').addClass('pagenext');
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
    } else if ($('.page3').hasClass('pageNend')) {
      // 4ページ目
      $('.page2').removeClass('pageprev1');
      $('.page3').removeClass('pageNend');
      $('.page4').removeClass('pagenone');
      $('.page4').removeClass('pageNend');
      $('.page3').addClass('pagenone');
      $('.page3').addClass('pagePend');
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
