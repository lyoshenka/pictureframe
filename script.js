$(document).ready(function(){
	
	$.supersized({
    //Functionality
    autoplay          :   1,    //Slideshow starts playing automatically
    random            :   1,    //Randomize slide order (Ignores start slide)
    slide_interval    :   10 * 1000, //Length between transitions
    transition_speed  :   2 * 1000,  //Speed of transition
    keyboard_nav      :   0,    //Keyboard navigation on/off
    fit_always        :   1,    
    
    //Flickr
    user            :   '43903481@N08', //Flickr user ID (http://idgettr.com/)
    image_size      :   'b',            //Flickr Image Size - t,s,m,z,b  (Details: http://www.flickr.com/services/api/misc.urls.html)
    
    /**
      FLICKR API KEY
      NEED TO GET YOUR OWN -- http://www.flickr.com/services/apps/create/
      **/
    api_key         : 'cc29907c391eb6bbb78c94a1a68548f0'   //Flickr API Key
  });

	var clockFn = function() {
		var now = new Date(),
		    hour = now.getHours(),
		    min = now.getMinutes(),
		    meridiem = 'am';

		if (hour > 12) {
			hour = hour - 12;
			meridiem = 'pm';
		}

//		if (hour < 10) {
//			hour = "0" + hour;
//		}

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
	center = function() {
		$('#clock, #weather').each(function() {
			el = $(this);
			el.css("left", Math.max(0, (($(window).width() - el.outerWidth()) / 2) + $(window).scrollLeft()) + "px");
		});
	}
	center();
	$(window).resize(center);

	//$('#weather').weatherfeed(['UKXX0085','EGXX0011','UKXX0061','CAXX0518','CHXX0049']);
	$.simpleWeather({
    location: geoplugin_city() + ', ' + geoplugin_region() + ', ' + geoplugin_countryCode(),
    unit: 'f',
    //error: function(error) { ... },
    success: function(weather) {
    	var div = $('#weather');
    	console.log(weather);
    	div
    		.find('.today').css('background', 'url(\'' + weather.image + '\') no-repeat scroll 0% 0% transparent')
	    		.find('.temp .number').html(weather.temp + '&deg;').end()
	    		.find('.temp .unit').html(weather.units.temp).end()
	    		.find('.temp .high').html('H' + weather.high + '&deg;').end()
	    		.find('.temp .low').html('L' + weather.low + '&deg;').end()
	    		.find('.description').html(weather.forecast).end()
	    	.end()
	    	.find('.tomorrow').css('background', 'url(\'' + weather.tomorrow.image + '\') no-repeat scroll 0% 0% transparent')
	    		.find('.temp .number').html(weather.tomorrow.day).end()
	    		.find('.temp .high').html('H' + weather.tomorrow.high + '&deg;').end()
	    		.find('.temp .low').html('L' + weather.tomorrow.low + '&deg;').end()
	    		.find('.description').html(weather.tomorrow.forecast).end()
	    	.end()
    		.find('.updated').html('Updated: ' + weather.updated).end()
    		;

    	return;

    	var html='<br/><br/><br/><br/><br/>';
      html = '<h2>'+weather.city+', '+weather.region+', '+weather.country+'</h2>';
      html += '<p><strong>Today\'s High</strong>: '+weather.high+'&deg; '+weather.units.temp+' - <strong>Today\'s Low</strong>: '+weather.low+'&deg; '+weather.units.temp+'</p>';
      html += '<p><strong>Current Temp</strong>: '+weather.temp+'&deg; '+weather.units.temp+' ('+weather.tempAlt+'&deg; C)</p>';
      html += '<p><strong>Thumbnail</strong>: <img src="'+weather.thumbnail+'"></p>';
      html += '<p><strong>Wind</strong>: '+weather.wind.direction+' '+weather.wind.speed+' '+weather.units.speed+' <strong>Wind Chill</strong>: '+weather.wind.chill+'</p>';
      html += '<p><strong>Currently</strong>: '+weather.currently+' - <strong>Forecast</strong>: '+weather.forecast+'</p>';
      html += '<p><img src="'+weather.image+'"></p>';
      html += '<p><strong>Humidity</strong>: '+weather.humidity+' <strong>Pressure</strong>: '+weather.pressure+' <strong>Rising</strong>: '+weather.rising+' <strong>Visibility</strong>: '+weather.visibility+'</p>';
      html += '<p><strong>Heat Index</strong>: '+weather.heatindex+'"></p>';
      html += '<p><strong>Sunrise</strong>: '+weather.sunrise+' - <strong>Sunset</strong>: '+weather.sunset+'</p>';
      html += '<p><strong>Tomorrow\'s Date</strong>: '+weather.tomorrow.day+' '+weather.tomorrow.date+'<br /><strong>Tomorrow\'s High/Low</strong>: '+weather.tomorrow.high+'/'+weather.tomorrow.low+'<br /><strong>Tomorrow\'s Forecast</strong>: '+weather.tomorrow.forecast+'<br /> <strong>Tomorrow\'s Image</strong>: '+weather.tomorrow.image+'</p>';
      html += '<p><strong>Last updated</strong>: '+weather.updated+'</p>';
      html += '<p><a href="'+weather.link+'">View forecast at Yahoo! Weather</a></p>';

      div.html(html);
    }
	});
});