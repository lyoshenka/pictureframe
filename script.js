$(document).ready(function(){
  $.supersized({
	
    // Functionality
		slideshow         : 1,			// Slideshow on/off
		autoplay				  :	1,			// Slideshow starts playing automatically
		start_slide       : 0,			// Start slide (0 is random)
		stop_loop				  :	0,			// Pauses slideshow on last slide
		random					  : 1,			// Randomize slide order (Ignores start slide)
		slide_interval    : 10 * 1000,		// Length between transitions (ms)
		transition        : 1, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
		transition_speed	:	2 * 1000,		// Speed of transition
		new_window				:	1,			// Image links open in new window/tab
		pause_hover       : 0,			// Pause slideshow on hover
		keyboard_nav      : 1,			// Keyboard navigation on/off
		performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
		image_protect			:	1,			// Disables image dragging and right click with Javascript
															   
		// Size & Position						   
		min_width		        : 0,			// Min width allowed (in pixels)
		min_height		      : 0,			// Min height allowed (in pixels)
		vertical_center     : 1,			// Vertically center background
		horizontal_center   : 1,			// Horizontally center background
		fit_always				  :	1,			// Image will never exceed browser width or height (Ignores min. dimensions)
		fit_portrait        : 0,			// Portrait images will not exceed browser height
		fit_landscape			  : 0,			// Landscape images will not exceed browser width
														   
		// Components							
		slide_links				    :	false,	// Individual links for each slide (Options: false, 'num', 'name', 'blank')
		thumb_links				    :	0,			// Individual thumb links for each slide
		thumbnail_navigation  : 0,			// Thumbnail navigation
		slides : [			// Slideshow Images
		  {image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-1.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-2.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/kazvan-3.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-1.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-2.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/wojno-3.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-1.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-2.jpg'},
			{image : 'http://buildinternet.s3.amazonaws.com/projects/supersized/3.2/slides/shaden-3.jpg'}
	  ],
											
		// Theme Options			   
		progress_bar : 0,			// Timer for each slide							
		mouse_scrub : 0
				
	});
});