setTimeout(function () {
  $(".loading").removeClass("loadingIn")
}, 3500);

setTimeout(function () {
  $(".loadingimg").removeClass("loadingIn")
}, 3500);


$(function () {
  //画像変更処理　
  $(".infoBtn img").hover(function () {
    $(this).attr("src", $(this).attr("src").replace("_off", "_on"))
  }, function () {
    if (!$(this).hasClass("currentPage")) {
      $(this).attr("src", $(this).attr("src").replace("_on", "_off"))
    }
  });
});

//詳細表示
//ユーザー
$(function () {
  $('.userBtn').click(function () {
    $('.userinfo').animate({
      width: 'show' //表示
    }, {
      duration: 500, //スピード
    });
  });

  $('#userBack').click(function () {
    $('.userinfo').animate({
      width: 'hide' //非表示表示
    }, {
      duration: 350, //スピード
    });
  });
});

$(function () {
  $('#questionBack').click(function () {
    $('.questioninfo').fadeOut(500);
  });

  $('.questionBtn').click(function () {
    $('.questioninfo').fadeIn(300);
  });
});
