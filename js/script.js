(function($) {
	
	'use strict';
	
	var ShowApp = {
		
		// Initialization the functions
		init: function() {
			ShowApp.Preloader();
			ShowApp.AffixMenu();
			ShowApp.MobileMenu();
			ShowApp.ScrollSpy();
			ShowApp.SmoothScroll();
			ShowApp.FitVids();
			ShowApp.PlaceHolder();
			ShowApp.Carousel();
			ShowApp.Lightbox();
			ShowApp.Subscribe();
			ShowApp.Customizer();
		},
		
		// Page loading process
		Preloader: function() {
			$(window).load(function() {
				$('#preloader .spinner').delay(100).fadeOut(300, function() {
					$('#header, .row-section').animate({
						opacity: 1
					}, 300);
					$(this).parent().delay(300).fadeOut(500, function() {
						ShowApp.Animated();
					});
				});
			});
		},
		
		// Navigation menu affix
		AffixMenu: function() {
			var navMenu	= '<nav id="navigation_affix">';
			navMenu		+= $('#navigation').html();
			navMenu		+= '</nav>';
			
			$('#header').before(navMenu);
			
			$('#navigation').waypoint(function() {
				$('#navigation_affix').removeClass('show');
			}, {
				offset: -89
			});
			
			$('#navigation').waypoint(function() {
				$('#navigation_affix').addClass('show');
			}, {
				offset: -90
			});
		},
		
		// Add mobile navigation
		MobileMenu: function() {
			var navMenu	= '<nav class="nav-menu-mobile">';
			navMenu		+= '<div class="nav-menu-links">';
			navMenu		+= '<ul>';
			navMenu		+= $('#navigation .nav').html();
			navMenu		+= '</ul>';
			navMenu		+= '</div>';
			navMenu		+= '<div class="nav-menu-button">';
			navMenu		+= '<button class="nav-menu-toggle"><i class="fa fa-navicon"></i></button>';
			navMenu		+= '</div>';
			navMenu		+= '</nav>';
			
			$('#header').prepend(navMenu);
			
			$('.nav-menu-toggle').on('click', function() {
				$(this).parent('.nav-menu-button').prev('.nav-menu-links').slideToggle(300);
			});
		},
		
		// Navigation menu scrollspy to anchor section
		ScrollSpy: function() {
			$('body').scrollspy({
				target: '#navigation_affix',
				offset: parseInt($('#navigation_affix').height(), 0)
			});
		},
		
		// Smooth scrolling to anchor section
		SmoothScroll: function() {
			$('a.smooth-scroll').on('click', function(event) {
				var $anchor		= $(this);
				var offsetTop	= '';
				var elemHeight	= parseInt($('#navigation_affix').height() - 1, 0);
				
				if (window.Response.band(768)) {
					offsetTop = parseInt($($anchor.attr('href')).offset().top - elemHeight, 0);
				} else {
					offsetTop = parseInt($($anchor.attr('href')).offset().top, 0);
				}
				
				$('html, body').stop().animate({
					scrollTop: offsetTop
				}, 1500,'easeInOutExpo');
				
				event.preventDefault();
			});
		},
		
		// Responsive video size
		FitVids: function() {
			$('body').fitVids();
		},
		
		// Placeholder compatibility for IE8
		PlaceHolder: function() {
			$('input, textarea').placeholder();
		},
		
		// Slider with Slick carousel
		Carousel: function() {
			// Gallery slider
			$('.carousel-slider.gallery-slider').each(function() {
				$(this).slick({
					dots: true,
					slidesToShow: 4,
					slidesToScroll: 1,
					draggable: false,
					responsive: [
						{
							breakpoint: 768,
							settings: {
								slidesToShow: 2,
								draggable: true
							}
						},
						{
							breakpoint: 480,
							settings: {
								slidesToShow: 1,
								draggable: true
							}
						}
					]
				});
			});
			
			// General slider
			$('.carousel-slider.general-slider').each(function() {
				$(this).slick({
					dots: true,
					adaptiveHeight: true,
					draggable: false,
					responsive: [{
						breakpoint: 768,
						settings: { draggable: true }
					}]
				});
			});
		},
		
		// Preview images popup gallery with Fancybox
		Lightbox: function() {
			$('.fancybox').fancybox({
				loop: false
			});
		},
		
		// Email subscribe process with AJAX
		Subscribe: function() {
			// Checking subcribe form when focus event
			$('.affa-form-subscribe input[type="text"], .affa-form-subscribe input[type="email"]').live('focus keypress', function() {
				var $email = $(this);
				
				if ($email.hasClass('error')) {
					$email.val('').removeClass('error');
				}
				if ($email.hasClass('success')) {
					$email.val('').removeClass('success');
				}
			});
			
			// Subscribe form when submit to database
			$('.affa-form-subscribe').submit(function() {
				var $email		  = $(this).find('input[name="email"]');
				var $submit		  = $(this).find('input[name="submit"]');
				var email_pattern = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
				
				if (email_pattern.test($email.val()) === false) {
					$email.val('Please enter a valid email address!').addClass('error');
				} else {
					var submitData = $(this).serialize();
					$email.attr('disabled','disabled');
					$submit.attr('disabled','disabled');
					$.ajax({ // Subcribe process with AJAX
						type: 'POST',
						url: 'process-subscribe.php',
						data: submitData + '&action=add',
						dataType: 'html',
						success: function(msg) {
							if (parseInt(msg, 0) !== 0) {
								var msg_split = msg.split('|');
								
								if (msg_split[0] === 'success') {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('success');
								} else {
									$submit.removeAttr('disabled');
									$email.removeAttr('disabled').val(msg_split[1]).addClass('error');
								}
							}
						}
					});
				}
				
				return false;
			});
		},
		
		// Embed animation effects to HTML elements with CSS3
		Animated: function() {
			$('.animation, .animation-visible').each(function() {
				var $element = $(this);
				$element.waypoint(function() {
					var delay = 0;
					if ($element.attr('data-delay')) delay = parseInt($element.attr('data-delay'), 0);
					if (!$element.hasClass('animated')) {
						setTimeout(function() {
							$element.addClass('animated ' + $element.attr('data-animation'));
						}, delay);
					}
					delay = 0;
				}, {
					offset: '70%'
				});
			});
		},
		
		// Customizer to change the template layouts
		Customizer: function() {
			$('#customize .popup-open').click(function() {
				var $parent = $(this).parents('#customize');
				if ($parent.hasClass('in')) {
					$parent.removeClass('in');
				} else {
					$parent.addClass('in');
				}
			});
			
			$('#customize .customize-list-color a').click(function(e) {
				var $color = $(this).attr('class');
				$('head').append('<link rel="stylesheet" type="text/css" href="css/colors/' + $color + '/color.css">');
				e.preventDefault();
			});
		}
		
	};
	
	// Run the main function
	$(function() {
		ShowApp.init();
	});
	
})(window.jQuery);
