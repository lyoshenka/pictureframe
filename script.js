$(document).ready(function() {

    var reloadImageInterval = 1000 * 60 * 60, // reload images every hour
        loadImages = function() {
        $.getJSON('images.json?'+Math.random(), function(images){
            console.log(images);
            if ($('#background').data('backstretch')) {
                $('#background').data('backstretch').initImages(images);
            }
            else {
                $('#background').backstretch(images, {
                    duration: 1000 * 60 * 3, // new image every 3 minutes
                    fade: 1000 * 5, // fade for 5 seconds between images
                    fit: true,
                    startRandom: true
                });
            }
        });
    };

    loadImages();
    setInterval(loadImages, reloadImageInterval);



    var clockFn = function() {
        var now = new Date(),
            hour = now.getHours(),
            min = now.getMinutes(),
            meridiem = 'am';

        if (hour > 12) {
            hour = hour - 12;
            meridiem = 'pm';
        }

//      if (hour < 10) {
//          hour = "0" + hour;
//      }

        if (min < 10) {
            min = "0" + min;
        }

        $('#clock')
            .find('.hour').html(hour).end()
            .find('.minute').html(min).end()
            .find('.meridiem').html(meridiem).end();
    };

    clockFn();
    setInterval(clockFn, 2000);



    // center horizontally
    // center = function() {
    //     $('#clock').each(function() {
    //         el = $(this);
    //         el.css("left", Math.max(0, (($(window).width() - el.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
    //     });
    // }
    // center();
    // $(window).resize(center);
});