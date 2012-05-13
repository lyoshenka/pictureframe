$(document).ready(function(){
$.supersized({
      
        //Functionality
        slideshow         :   1,    //Slideshow on/off
        autoplay          :   1,    //Slideshow starts playing automatically
        start_slide       :   1,    //Start slide (0 is random)
        random            :   1,    //Randomize slide order (Ignores start slide)
        slide_interval    :   10 * 1000, //Length between transitions
        transition        :   1,    //0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
        transition_speed  :   2 * 1000,  //Speed of transition
        new_window        :   1,    //Image links open in new window/tab
        pause_hover       :   0,    //Pause slideshow on hover
        keyboard_nav      :   0,    //Keyboard navigation on/off
        performance       :   1,    //0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
        image_protect     :   1,    //Disables image dragging and right click with Javascript
//        image_path        :   'img/', //Default image path
        
        fit_always          :   1,    
        
        //Flickr
        user            :   '43903481@N08', //Flickr user ID (http://idgettr.com/)
        image_size      :   'b',            //Flickr Image Size - t,s,m,z,b  (Details: http://www.flickr.com/services/api/misc.urls.html)
        
        /**
          FLICKR API KEY
          NEED TO GET YOUR OWN -- http://www.flickr.com/services/apps/create/
          **/
        api_key         : 'cc29907c391eb6bbb78c94a1a68548f0'   //Flickr API Key
          
      }); 
});
