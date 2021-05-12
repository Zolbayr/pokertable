$(function () {
  nsZoomZoom();

  $(window).resize(function () {
    var w = window.innerWidth;
    if (w > 800 || w == 800) {
      nsZoomZoom();
    }
  });

  function nsZoomZoom() {
    var htmlWidth = $("html").innerWidth();
    var w = window.innerWidth;
    var bodyWidth = 1600;
    if (htmlWidth > bodyWidth) scale = 1;
    else {
      scale = htmlWidth / bodyWidth;
    }
    if (w > 800 || w == 800) {
      ratio = 16.36;
      position = (980 - w) / 16.3;
      $(".table-container").css("-ms-transform", "scale(" + scale + ")");
      $(".table-container").css("transform", "scale(" + scale + ")");
      $(".table-container").css("left", "-" + position + "%");
    } else {
      defaultscale = 0.6325;
      $(".table-container").css("-ms-transform", "scale(" + defaultscale + ")");
      $(".table-container").css("transform", "scale(" + defaultscale + ")");
      $(".table-container").css("left", "0");
    }
  }

  $(".toggle-chat").on("click", function (e) {
    $(".chat").toggleClass("open"); //you can list several class names
    $(this).children("span").toggleClass("mdi-chevron-left mdi-chevron-right");
    e.preventDefault();
  });

  var rangeSlider = function () {
    var slider = $(".range-slider"),
      range = $(".range-slider__range"),
      value = $(".range-slider__value");

    slider.each(function () {
      value.each(function () {
        var value = $(this).prev().attr("value");
        $(this).html(value);
      });

      range.on("input", function () {
        $(this).next(value).html(this.value);
      });
    });
  };

  rangeSlider();

  // game animation
  const sfx_bet = new Audio("sound/sfx_bet.wav");
  sfx_bet.volume = 0.1;
  const sfx_bet_collect = new Audio("sound/sfx_bet_collect.wav");
  sfx_bet_collect.volume = 0.2;

  console.log("ready!");
  const chiplist = {
    chip: [
      {
        class: "chip-5k",
        value: 5000,
      },
      {
        class: "chip-10k",
        value: 10000,
      },
      {
        class: "chip-20k",
        value: 20000,
      },
      {
        class: "chip-50k",
        value: 50000,
      },
      {
        class: "chip-100k",
        value: 100000,
      },
      {
        class: "chip-500k",
        value: 500000,
      },
      {
        class: "chip-1m",
        value: 1000000,
      },
      {
        class: "chip-5m",
        value: 5000000,
      },
    ],
  };

  console.log(chiplist);

  //test button

  $("#active-player").click(function () {
    $(".player-1").toggleClass("active");
    $(".player-1 .player-status_holder").toggleClass("glow");
    const progress = $(".player-1");
    startPlayerTimer(20, progress);
  });

  function startPlayerTimer(timetotal, $element) {
    var element = $element.find(".progress_status");
    var width = 100;
    var timer = timetotal * 60;
    var identity = setInterval(scene, 100);
    var persec = width / 10 / timetotal;

    function scene() {
      if (width == 0) {
        clearInterval(identity);
        $(".player-1").removeClass("active");
        $(".player-1 .player-status_holder").removeClass("glow");
        $(".player-1").addClass("inactive");
      } else {
        width = width - persec;
        element.css({
          width: +width + "%",
        });
      }
    }
  }
  $("#shuffle").click(function () {
    const total = $(".active-player").length;
    startShuffleAnimation(total);
    setTimeout(function () {
      startShuffleAnimation(total);
    }, total * 100);
    $(this).attr("disabled", true);
  });

  $("#bet").click(function () {
    var player = $("#player").val();
    console.log(player);
    showBet(player);
  });

  $("#betmove").click(function () {
    moveBet();
  });

  $("#reveal").click(function () {
    revealTableCard();
    $(this).attr("disabled", true);
  });

  $("#revealnext").click(function () {
    revealTableCardNext();
  });

  function moveBet() {
    $(".bet-holder").each(function () {
      options = chiplist.chip;
      var $container = $(".bet-spot");
      $(this).parentToAnimate($(".bet-spot"));
      $(this).remove();
      setTimeout(function () {
        $container.html(
          "<div class='chip-column'><div class='pokerchip chip-5m' style='z-index:0; bottom:0px'></div><div class='pokerchip chip-5m' style='z-index:1; bottom:4px'></div><div style='z-index:2; bottom:8px' class='pokerchip chip-5m'></div></div><div class='chip-column'><div class='pokerchip chip-500k'></div></div><div class='chip-column'><div class='pokerchip chip-100k'></div></div><div class='bet-indicator'><span>15,600,000</span></div>"
        );
        var width = $(".bet-spot").width() / 2;
        console.log(width);
        $(".bet-spot").css("margin-left", "-" + width + "px");
        sfx_bet_collect.play();
      }, 500);
    });
  }

  function revealTableCard() {
    (function (count) {
      if (count < 3) {
        // call the function.
        revealTableCardNext();
        var caller = arguments.callee;
        window.setTimeout(function () {
          caller(count + 1);
        }, 500);
      }
    })(0);
  }

  function revealTableCardNext() {
    const sfx_card_dealt = new Audio("sound/sfx_card_dealt.mp3");
    sfx_card_dealt.volume = 0.1;
    const nextcard = ["card-_0001_C-Q", "card-_0001_C-Q"];
    const cardback =
      "<div class='table-card'><div class='card card-back card-_0053_BACK'></div>";
    $(cardback).appendTo(".shuffle-spot");
    var i = 0;
    $(".shuffle-spot .table-card").each(function (i) {
      console.log(i);
      $(this).parentToAnimate($(".table-cards"), 100);
      $("<div class='card card-front " + nextcard[i] + "'></div>").appendTo(
        $(this)
      );
      self = $(this);
      window.setTimeout(function () {
        self.addClass("is-flipped");
        sfx_card_dealt.play();
      }, 400);
      i++;
    });
  }

  function showBet(player) {
    sfx_bet.play();
    const playerClass = "." + player;
    console.log(playerClass);
    $(playerClass + " .chip-column").append(function () {
      options = chiplist.chip;
      var $container = $('<div class="chip-column" />');
      $.each(options, function (i) {
        var offset = i * 4;
        $container.append(
          $(
            "<div style='z-index:" +
              i +
              "; bottom:" +
              offset +
              "px' class='pokerchip  " +
              options[i].class +
              "'></div>"
          ).append()
        );
      });
      var msgTotal = options.reduce(function (prev, cur) {
        return prev + cur.value;
      }, 0);
      var currency = msgTotal.toLocaleString();
      $(playerClass + " .bet-indicator").html("<span>" + currency + "</span>");
      return $container.html();
    });
  }

  function startShuffleAnimation(totalPlayer) {
    const mycard = ["card-_0000_C-K", "card-_0001_C-Q"];
    const total = totalPlayer;
    const activeplayers = [];

    $(".active-player").each(function () {
      var el = $(this);
      console.log();
      activeplayers[activeplayers.length] = {
        id: el.data("id"),
      };
    });
    console.log(activeplayers);
    let index = 0;

    function shuffleCard() {
      if (index < total) {
        const sfx_card_dealt = new Audio("sound/sfx_card_dealt.mp3");
        sfx_card_dealt.volume = 0.1;
        // sfx_card_dealt.playbackRate = 1.1;
        setTimeout(function () {
          sfx_card_dealt.play();
          const myPlayer = activeplayers[index].id;
          const shuffleItem =
            "<div class='player-card_item shuffle-card-" +
            myPlayer +
            "'><div class='card card-_0053_BACK'></div></div>";
          console.log(myPlayer);
          $(shuffleItem).appendTo(".shuffle-spot");
          $(".shuffle-spot .shuffle-card-" + myPlayer).parentToAnimate(
            $(".active-player.player-" + myPlayer + " .player-card"),
            100
          );
          if ($(".active-player.player-" + myPlayer).hasClass("player-self")) {
            if ($(".active-player.player-" + myPlayer + " .card").length == 1) {
              $(
                ".active-player.player-" + myPlayer + " .player-card .card"
              ).removeClass("card-_0053_BACK");
              $(
                ".active-player.player-" + myPlayer + " .player-card .card"
              ).addClass(mycard[0]);
            } else if (
              $(".active-player.player-" + myPlayer + " .card").length == 2
            ) {
              $(".active-player.player-" + myPlayer + " .player-card .card")
                .last()
                .removeClass("card-_0053_BACK");
              $(".active-player.player-" + myPlayer + " .player-card .card")
                .last()
                .addClass(mycard[1]);
            }
          }
          console.log("moving");
          ++index;
          shuffleCard();
        }, 100);
      }
    }
    shuffleCard();
  }

  var openmodal = document.querySelectorAll(".modal-open");
  for (var i = 0; i < openmodal.length; i++) {
    openmodal[i].addEventListener("click", function (event) {
      event.preventDefault();
      toggleModal();
    });
  }

  const overlay = document.querySelector(".modal-overlay");
  overlay.addEventListener("click", toggleModal);

  var closemodal = document.querySelectorAll(".modal-close");
  for (var i = 0; i < closemodal.length; i++) {
    closemodal[i].addEventListener("click", toggleModal);
  }

  document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
      isEscape = evt.key === "Escape" || evt.key === "Esc";
    } else {
      isEscape = evt.keyCode === 27;
    }
    if (isEscape && document.body.classList.contains("modal-active")) {
      toggleModal();
    }
  };

  function toggleModal() {
    const body = document.querySelector("body");
    const modal = document.querySelector(".modal");
    modal.classList.toggle("opacity-0");
    modal.classList.toggle("pointer-events-none");
    body.classList.toggle("modal-active");
  }
});
