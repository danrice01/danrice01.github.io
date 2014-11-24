//Project Isotope
var $container = $('#isotope-wrap');
// init
$container.isotope({
    itemSelector: '.project-wrap',
    layoutMode: 'masonry'
});

$container.isotope('on', 'layoutComplete', function() {
    $(window).trigger("scroll");
});

$('#project-filters').on('click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $container.isotope({ filter: filterValue });
});

//Set container width of projects

function projectContainerSize() {
    var contentWidth = $('#projects .container').width();
    var itemWidth = $('.project-wrap').outerWidth(true);

    var containerItemSize = Math.floor(contentWidth/itemWidth);
    var resizeContainerWidth = containerItemSize * itemWidth;
    console.log(resizeContainerWidth);
    console.log(itemWidth);

    $('#isotope-wrap').width(resizeContainerWidth);

    if(containerItemSize > 1) {
        $('#isotope-wrap').css({
          marginLeft: (contentWidth - resizeContainerWidth)/2
        });
    }
}

//Size on load
projectContainerSize();

//Size on window resize
$(window).resize(function() {
  projectContainerSize();
});

//Lazy load images
$("img.lazy").lazyload({
    effect: "fadeIn"
});

//Scroll header change 
$('.intro h2:last-of-type').waypoint(function(direction) {
  if(direction == "down") {
    $('.main-nav').addClass('filled');
  } else {
    $('.main-nav').removeClass('filled');
  }
});

// jQuery for page scrolling feature
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

//Change active link on scroll
$(document).ready(function () {
    $(document).on("scroll", onScroll);
    
    //smoothscroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $(document).off("scroll");
        
        $('a').each(function () {
            $(this).removeClass('active');
        })
        $(this).addClass('active');
      
        var target = this.hash,
            menu = target;
        $target = $(target);
        $('html, body').stop().animate({
            'scrollTop': $target.offset().top+2
        }, 500, 'swing', function () {
            window.location.hash = target;
            $(document).on("scroll", onScroll);
        });
    });
});

function onScroll(event){
    var scrollPos = $(document).scrollTop();
    $('.nav a').each(function () {
        var currLink = $(this);
        var refElement = $(currLink.attr("href"));
        if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav li a').removeClass("active");
            currLink.addClass("active");
        }
        else{
            currLink.removeClass("active");
        }
    });
}