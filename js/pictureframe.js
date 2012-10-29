$(document).ready(function(){

    PF = {
        urlCache: {},         // Cache Dropbox urls here
        urls: [],             // holding place for image URLs while we load them
        db:   null,           // Dropbox client
        reloadInterval: null,
        clockInterval: null,
        options: {
            duration: 5,
            fade: 1,
            randomOrder: true,
            showClock: false,
            showFullscreenButton: false
        }
    };



    /////////////////////////////////////////////////////////////////////
    // OPTIONS
    /////////////////////////////////////////////////////////////////////

    PF.options = $.extend(PF.options, $.jStorage.get('options', {}));

    function saveLoad(saveOrLoad) {
        $.each(PF.options, function(option, value) {
            input = $('#optionsModal form').find('[name="'+option+'"]');
            if (option[0] == '_' || !input) {
                return;
            }
            if (input.attr('type') == 'checkbox') {
                if (saveOrLoad == 'load') {
                    input.attr('checked', value);
                }
                else {
                    PF.options[option] = input.attr('checked') == 'checked';
                }
            }
            else {
                if (saveOrLoad == 'load') {
                    input.val(value);
                }
                else {
                    PF.options[option] = input.val();
                }
            }
        });
    }

    saveLoad('load');

    $('#optionsSave').click(function() {
        saveLoad('save');
        $.jStorage.set('options', PF.options);
        $('#optionsModal').modal('hide');
        configOptionalThings();
    });

    function configOptionalThings() {
        clock();
        fullscreenButton();
    }


    /////////////////////////////////////////////////////////////////////
    // CLOCK
    /////////////////////////////////////////////////////////////////////
    function clock() {
        var el = $('#clock');

        if (!PF.options.showClock) {
            el.hide();
            if (PF.clockInterval) {
                clearInterval(PF.clockInterval);
                PF.clockInterval = null;
            }
            return;
        }
        else if (PF.clockInterval) {
            return; // safeguard against initializing clock twice
        }

        var setClock = function() {
            var now = new Date(),
                hour = now.getHours(),
                min = now.getMinutes(),
                meridiem = 'am';

            if (hour > 12) {
                hour = hour - 12;
                meridiem = 'pm';
            }

            if (min < 10) {
                min = "0" + min;
            }

            el.find('.hour').html(hour).end()
              .find('.minute').html(min).end()
              .find('.meridiem').html(meridiem).end();
        };

        setClock();
        PF.clockInterval = setInterval(setClock, 2000);
        el.show();
    }



    /////////////////////////////////////////////////////////////////////
    // FULLSCREEN BUTTON
    /////////////////////////////////////////////////////////////////////

    function fullscreenButton() {
        if (!screenfull.enabled) {
            $('form .js-fullscreen-option').hide();
            return;
        }

        var el = $('#fullscreen');

        if (PF.options.showFullscreenButton) {
            el.click(function() { screenfull.request(); })
              .show();
        }
        else {
            el.off('click')
              .hide();
        }
    }


    /////////////////////////////////////////////////////////////////////
    // DROPBOX & IMAGES
    /////////////////////////////////////////////////////////////////////

    function getUrlFromCache(filename) {
        if (_.has(PF.urlCache, filename)) {
            var now = new Date(),
                expires = new Date(PF.urlCache[filename].expiresAt);
            if (expires > now) {
                return PF.urlCache[filename].url;
            }
        }
        return null;
    }

    function cacheUrlObject(filename, urlObject) {
        PF.urlCache[filename] = urlObject;
    }

    function showError(error) {
        console.log(error);
    }

    function reloadImages() {
        console.log('loading urls');
        PF.urls = [];

        var _pushUrl = function(url, numFilesExpected) {
            PF.urls.push(url);
            $('body').find('#state-images .loading .bar').css('width', 10 + (PF.urls.length / numFilesExpected * 90) + '%');
            if (PF.urls.length >= numFilesExpected) {
                $('body').trigger('urlsLoaded');
            }
        };

        PF.db.readdir("/", function(error, entries) {
            if (error) {
                return showError(error);
            }

            entries = _.filter(entries, function(entry){
                return entry.match(/\.(png|gif|jpe?g)$/i);
            });

            var numFiles = entries.length;
            if (numFiles === 0) {
                $('#state-images').hide();
                $('#state-no-images').show();
                if (PF.reloadInterval) {
                    clearInterval(PF.reloadInterval);
                    PF.reloadInterval = null;
                }
                return;
            }

            $.each(entries, function(index, filename){
                var url = getUrlFromCache(filename);
                if (url) {
                    console.log('Got url from cache: ' + url);
                    _pushUrl(url, numFiles);
                }
                else {
                    PF.db.makeUrl('/'+filename, {download: true}, function(error, urlObject){
                        if (error) {
                            return showError(error);
                        }

                        console.log(urlObject.url + ' ' + urlObject.expiresAt);
                        cacheUrlObject(filename, urlObject);
                        _pushUrl(urlObject.url, numFiles);
                    });
                }
            });
        });
    }


    $('body').on('urlsLoaded', function() {
        $('#state-images').find('.modal').hide();

        configOptionalThings();

        if ($('body').data('backstretch')) {
            $('body').data('backstretch').initImages(PF.urls);
        }
        else {
            $.backstretch(PF.urls, {
                fit: true,
                duration: PF.options.duration * 1000,
                fade: PF.options.fade * 1000,
                startRandom: PF.options.randomOrder
            });
        }
    });


    PF.db = new Dropbox.Client({
        key: "FmEUJmiDReA=|yHkvScmfBhwwpm1JEUyjgpf5dIbFtWFYaDRmGJ80Hg==", sandbox: true
    });
    PF.db.authDriver(new Dropbox.Drivers.Redirect({rememberUser: true}));
    PF.db.authenticate(function(error, client) {
      if (error) {
        return showError(error);
      }
      PF.db = client;
      reloadImages();
      PF.reloadInterval = setInterval(reloadImages, 1000*60*60); // reload every hour
    });
});