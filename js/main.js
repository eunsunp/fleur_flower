(function($) {
 
	var SliceSlider = {
	  /**
	   * Settings Object
	   */
	  settings: {
		delta:              0,
		currentSlideIndex:  0,
		scrollThreshold:    40,
		slides:             $('.slide'),
		numSlides:          $('.slide').length,
		navPrev:            $('.js-prev'),
		navNext:            $('.js-next'),
	  },
	  
	  /**
	   * Init
	   */
	  init: function() {
		s = this.settings;
		this.bindEvents();
	  },
	  
	  /**
	   * Bind our click, scroll, key events
	   */
	  bindEvents: function(){
		
		// Scrollwheel & trackpad
		s.slides.on({
		  'DOMMouseScroll mousewheel' : SliceSlider.handleScroll
		});
		// On click prev
		s.navPrev.on({
		  'click' : SliceSlider.prevSlide
		});
		// On click next
		s.navNext.on({
		  'click' : SliceSlider.nextSlide
		});
		// On Arrow keys
		$(document).keyup(function(e) {
		  // Left or back arrows
		  if ((e.which === 37) ||  (e.which === 38)){
			SliceSlider.prevSlide();
		  }
		  // Down or right
		  if ((e.which === 39) ||  (e.which === 40)) {
			SliceSlider.nextSlide();
		  }
		});
	  },
	  
	  /** 
	   * Interept scroll direction
	   */
	  handleScroll: function(e){
  
		// Scrolling up
		if (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0) { 
  
		  s.delta--;
	   
		  if ( Math.abs(s.delta) >= s.scrollThreshold) {
			SliceSlider.prevSlide();
		  }
		}
   
		// Scrolling Down
		else {
   
		  s.delta++;
   
		  if (s.delta >= s.scrollThreshold) {
			SliceSlider.nextSlide();
		  }
		}
   
		// Prevent page from scrolling
		return false;
	  },
  
	  /**
	   * Show Slide
	   */
	  showSlide: function(){ 
		// reset
		s.delta = 0;
		// Bail if we're already sliding
		if ($('body').hasClass('is-sliding')){
		  return;
		}
		// Loop through our slides
		s.slides.each(function(i, slide) {
  
		  // Toggle the is-active class to show slide
		  $(slide).toggleClass('is-active', (i === s.currentSlideIndex)); 
		  $(slide).toggleClass('is-prev', (i === s.currentSlideIndex - 1)); 
		  $(slide).toggleClass('is-next', (i === s.currentSlideIndex + 1)); 
		  
		  // Add and remove is-sliding class
		  $('body').addClass('is-sliding');
  
		  setTimeout(function(){
			  $('body').removeClass('is-sliding');
		  }, 1000);
		});
	  },
  
	  /**
	   * Previous Slide
	   */
	  prevSlide: function(){
		
		// If on first slide, loop to last
		if (s.currentSlideIndex <= 0) {
		  s.currentSlideIndex = s.numSlides;
		}
		s.currentSlideIndex--;
		
		SliceSlider.showSlide();
	  },
  
	  /**
	   * Next Slide
	   */
	  nextSlide: function(){
		
		s.currentSlideIndex++;
	 
		// If on last slide, loop to first
		if (s.currentSlideIndex >= s.numSlides) { 
		  s.currentSlideIndex = 0;
		}
   
		SliceSlider.showSlide();
	  },
	};
	SliceSlider.init();
  })(jQuery);

  /* slide end */

;(function () {
	
	'use strict';

	var mobileMenuOutsideClick = function() {

		$(document).click(function (e) {
	    var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
	    if (!container.is(e.target) && container.has(e.target).length === 0) {

	    	if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
	    
	    	
	    }
		});

	};


	var offcanvasMenu = function() {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function(){
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');				
		}).mouseleave(function(){

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');				
		});


		$(window).resize(function(){

			if ( $('body').hasClass('offcanvas') ) {

    			$('body').removeClass('offcanvas');
    			$('.js-fh5co-nav-toggle').removeClass('active');
				
	    	}
		});
	};


	var burgerMenu = function() {

		$('body').on('click', '.js-fh5co-nav-toggle', function(event){
			var $this = $(this);


			if ( $('body').hasClass('overflow offcanvas') ) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function() {
		var i = 0;
		$('.animate-box').waypoint( function( direction ) {

			if( direction === 'down' && !$(this.element).hasClass('animated-fast') ) {
				
				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function(){

					$('body .animate-box.item-animate').each(function(k){
						var el = $(this);
						setTimeout( function () {
							var effect = el.data('animate-effect');
							if ( effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if ( effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if ( effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						},  k * 200, 'easeInOutExpo' );
					});
					
				}, 100);
				
			}

		} , { offset: '85%' } );
	};


	var dropdown = function() {

		$('.has-dropdown').mouseenter(function(){

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function(){
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var tabs = function() {

		// Auto adjust height
		$('.fh5co-tab-content-wrap').css('height', 0);
		var autoHeight = function() {

			setTimeout(function(){

				var tabContentWrap = $('.fh5co-tab-content-wrap'),
					tabHeight = $('.fh5co-tab-nav').outerHeight(),
					formActiveHeight = $('.tab-content.active').outerHeight(),
					totalHeight = parseInt(tabHeight + formActiveHeight + 90);

					tabContentWrap.css('height', totalHeight );

				$(window).resize(function(){
					var tabContentWrap = $('.fh5co-tab-content-wrap'),
						tabHeight = $('.fh5co-tab-nav').outerHeight(),
						formActiveHeight = $('.tab-content.active').outerHeight(),
						totalHeight = parseInt(tabHeight + formActiveHeight + 90);

						tabContentWrap.css('height', totalHeight );
				});

			}, 100);
			
		};

		autoHeight();


		// Click tab menu
		$('.fh5co-tab-nav a').on('click', function(event){
			
			var $this = $(this),
				tab = $this.data('tab');

			$('.tab-content')
				.addClass('animated-fast fadeOutDown');

			$('.fh5co-tab-nav li').removeClass('active');
			
			$this
				.closest('li')
					.addClass('active')

			$this
				.closest('.fh5co-tabs')
					.find('.tab-content[data-tab-content="'+tab+'"]')
					.removeClass('animated-fast fadeOutDown')
					.addClass('animated-fast active fadeIn');


			autoHeight();
			event.preventDefault();

		}); 
	};

	var goToTop = function() {

		$('.js-gotop').on('click', function(event){
			
			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');
			
			return false;
		});

		$(window).scroll(function(){

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});
	
	};


	// Loading page
	var loaderPage = function() {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function() {
		$('.js-counter').countTo({
			 formatter: function (value, options) {
	      return value.toFixed(options.decimals);
	    },
		});
	};

	var counterWayPoint = function() {
		if ($('#fh5co-counter').length > 0 ) {
			$('#fh5co-counter').waypoint( function( direction ) {
										
				if( direction === 'down' && !$(this.element).hasClass('animated') ) {
					setTimeout( counter , 400);					
					$(this.element).addClass('animated');
				}
			} , { offset: '90%' } );
		}
	};

	var sliderMain = function() {
		
	  	$('#fh5co-hero .flexslider').flexslider({
			animation: "fade",
			slideshowSpeed: 5000,
			directionNav: true,
			start: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			},
			before: function(){
				setTimeout(function(){
					$('.slider-text').removeClass('animated fadeInUp');
					$('.flex-active-slide').find('.slider-text').addClass('animated fadeInUp');
				}, 500);
			}

	  	});

	  	$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	$(window).resize(function(){
	  		$('#fh5co-hero .flexslider .slides > li').css('height', $(window).height());	
	  	});

	};

	var testimonialCarousel = function(){
		
		var owl = $('.owl-carousel-fullwidth');
		owl.owlCarousel({
			items: 1,
			loop: true,
			margin: 0,
			nav: false,
			dots: true,
			smartSpeed: 800,
			autoHeight: true
		});

	};

	
	$(function(){
		mobileMenuOutsideClick();
		offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		tabs();
		goToTop();
		loaderPage();
		counterWayPoint();
		sliderMain();
		testimonialCarousel();
	});


}());