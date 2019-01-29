setTimeout(function () {
  let countElm = $('.count'),
    countSpeed = 20;

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
        }
      }, countSpeed);
    }
    timer();
  });
}, 150);
