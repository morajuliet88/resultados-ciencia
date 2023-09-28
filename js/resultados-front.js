// Interaudi Theme JavaScript

(function($) {

    "use strict"; // Start of use strict
    $('[data-toggle="popover"]').popover();
    $('[data-toggle="tooltip"]').tooltip();
    //$('#hacerencuestaModal').modal('show');

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 50)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });

    // Highlight the top nav as scrolling occurs
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });



    // Scroll to top

    $('.scrollup').click(function() {
        $('html, body').animate({
            scrollTop: 0
        }, 1800);
        return false;
    });

    $(window).scroll(function() {
        var altura = $(document).height();
        if($(window).scrollTop() == 0) {
            $('.scrollup').hide();
        }else{
            $('.scrollup').show();
        }
    });

    //************** Materialize*************//
    updateTextFields();
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';


    //Agregar y quitar activo cuando obtiene el foco y cuando lo pierde
    $(input_selector).focus(function () {
        $(this).siblings('label, i').addClass('active');
    });
    $(input_selector).blur(function () {
        var $inputElement = $(this);
        if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
            $inputElement.siblings('label, i').removeClass('active');
        }

        if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
            $inputElement.siblings('i').removeClass('active');
        }
        validate_field($inputElement);
    });

    //Al dar click sobre la etiqueta se active el input
    $('label').click(function() {
        $(this).siblings('input').focus();
    });$('label').click(function() {
        $(this).siblings('textarea').focus();
    });

    // Textarea Auto Resize
    var text_area_selector = '.materialize-textarea';

    $(text_area_selector).each(function () {
        var $textarea = $(this);
    });

    //Accordion flechas

    $('.panel-default:first-child').find('.panel-heading').addClass('opened');
    $('.panel-heading').click(function (e) {
        $('.panel-default').find('.panel-heading').removeClass('opened');
        $(this).addClass('opened');
        if ($(this).next('.panel-collapse').hasClass('in')){
            $(this).removeClass('opened');
        }else{
            $(this).addClass('opened');
        }
    });

   $(window).scroll(function(){

            var $win = $(window);
            if ($win.scrollTop() > 200) {
                $('.js-top').addClass('active');
            } else {
                $('.js-top').removeClass('active');
            }

            if ( $win.scrollTop() > 100 ) {
                $('#mainNav').addClass('scrolled');
            } else {
                $('#mainNav').removeClass('scrolled');
            }

        });
    
    // Instantiate the Bootstrap carousel
    $('.multi-item-carousel').carousel({
      interval: false
    });

    // for every slide in carousel, copy the next slide's item in the slide.
    // Do the same for the next, next item.
    $('.multi-item-carousel .item').each(function(){
      var next = $(this).next();
      if (!next.length) {
        next = $(this).siblings(':first');
      }
      next.children(':first-child').clone().appendTo($(this));      
      
      if (next.next().length>0) {
        next.next().children(':first-child').clone().appendTo($(this));
        if (next.next().next().length>0) {
            next.next().next().children(':first-child').clone().appendTo($(this));
          } else {
            $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
          }
      } else {
        $(this).siblings(':first').children(':first-child').clone().appendTo($(this));
      }

    });


})(jQuery); // End of use strict

// Function para actualizar labels y text fields
function updateTextFields() {
    var input_selector = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
    $(input_selector).each(function(index, element) {
        if ($(element).val().length > 0 || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
            $(this).siblings('label').addClass('active');
        }
        else {
            $(this).siblings('label, i').removeClass('active');
        }
    });
};

//Function para validar input

validate_field = function(object) {
    var hasLength = object.attr('length') !== undefined;
    var lenAttr = parseInt(object.attr('length'));
    var len = object.val().length;

    if (object.val().length === 0 && object[0].validity.badInput === false) {
        if (object.hasClass('validate')) {
            object.removeClass('valid');
            object.removeClass('invalid');
        }
    }
    else {
        if (object.hasClass('validate')) {
            // Check for character counter attributes
            if ((object.is(':valid') && hasLength && (len <= lenAttr)) || (object.is(':valid') && !hasLength)) {
                object.removeClass('invalid');
                object.addClass('valid');
            }
            else {
                object.removeClass('valid');
                object.addClass('invalid');
            }
        }
    }
};


