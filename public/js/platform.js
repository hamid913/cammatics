$(document).ready(function () {
    var win = $(window);
    var rotateSwitch = 736;
    var mobileSwitch = 415;
    var stagePadSwitch = 0;
    var autoplaySwitch = true;
    var smartSpeedNum = 2000;
    var animateSwitchIn = 'fadeIn';
    var animateSwitchOut = 'fadeOut';


    win.on('load', function () {
        if ((win.width() < rotateSwitch)) {
            stagePadSwitch = 100;
            autoplaySwitch = false;
            smartSpeedNum = 200;
            animateSwitchIn = false;
            animateSwitchOut = false;
            $(".desktop-rotator .owl-dot.active span").css(
                'width', "100%");

            $(".desktop-rotator").on('translate.owl.carousel', function (e) {
                $(".owl-dot.active span").css("width", 0);
                $(".owl-dot.active span").css(
                    'width', "100%");
            });
            $(".desktop-rotator").on("drag.owl.carousel", function (e) {
                document.documentElement.style.overflow = "hidden";
            });
            $(".desktop-rotator").on("dragged.owl.carousel", function (e) {
                document.documentElement.style.overflow = "auto";
            });
            if ((win.width() < mobileSwitch)) {
                stagePadSwitch = 22;
            }

        } else {
            $(".desktop-rotator").on('translate.owl.carousel', function (e) {
                $(".owl-dot.active span").css("width", 0);
                $(".owl-dot.active span").animate({
                    width: "100%"
                }, 4000);
            });
        }
        $(".desktop-rotator").owlCarousel({
            items: 1,
            nav: false,
            dots: true,
            dotsData: true,
            loop: true,
            mouseDrag: false,
            autoplay: autoplaySwitch,
            autoplayTimeout: 4000,
            smartSpeed: smartSpeedNum,
            stagePadding: stagePadSwitch,
            animateIn: animateSwitchIn,
            animateOut: animateSwitchOut
        });
        $(".desktop-rotator .owl-dot.active span").animate({
            width: "100%"
        }, 4000);



    });
    win.on("load resize", function () {
        var headerHeight = $(".header-copy").height();
        if ((win.width() > rotateSwitch)) {
            $(".owl-dots").css("top", headerHeight);
        } else {
            $(".owl-dots").css("top", 0);
        }
    });
});