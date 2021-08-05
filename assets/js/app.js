$(document).ready(function(){
  const slider = $('.v-slider');
  const slideLength = $('.slide').length - 1;
  slider.slick({
      vertical:true,
      verticalSwiping:true,
      arrows: false,
      infinite: false,
      slidesToScroll: 1,
      accessibility:true,
      autoplay: true,
      autoplaySpeed: 2000,
      responsive:[
        {
          breakpoint: 769,
          settings: {
            vertical:false,
            verticalSwiping:false,
          }          
        }
      ]
  });
  
  slider.on('wheel', (function(e) {
    if($(window).width() > 1200) {
      e.preventDefault();
      if (e.originalEvent.deltaY > 0) {
        $(this).slick('slickNext');
      } else {
        $(this).slick('slickPrev');
      }
    }
  }));
  
slider.on("afterChange", function (){
    let activeSlide = $('.slick-active').attr('data-slick-index'),
    index = parseInt(activeSlide),
    pointerIndex = $(`.slider-pointer[data-index=${index}]`),
    prevIndex = $(`.slider-pointer[data-index=${index-1}]`);

    pointerIndex.addClass("highlighted")
    prevIndex.addClass("progress-complete")
    $(".slider-pointer").removeClass("active")
    pointerIndex.addClass("active")
    scrollLeftInMob(index)
    $(`.slider-pointer[data-index=${index+1}]`).removeClass("highlighted")
    $(`.slider-pointer[data-index=${index}]`).removeClass("progress-complete")

    if( slideLength === slider.slick('slickCurrentSlide') ){
      slider.slick('slickPause')
    };

  })

  
  
  function scrollLeftInMob(index){
    let container = document.querySelector('.pointers-wrapper'),
        containerRect = container.getBoundingClientRect(),
        el = document.querySelector('.slider-pointer.active'),
        elRect = container?.getBoundingClientRect()
    if(
        ((document.querySelector('.slider-pointer.active').offsetLeft + (document.querySelector('.slider-pointer.active').offsetWidth - 0)) >= containerRect.width ||
        (document.querySelector('.slider-pointer.active').offsetLeft + (document.querySelector('.slider-pointer.active').offsetWidth - 0)) <= containerRect.width) &&
        (index+1 !== 5)
      ) {
      container.scroll({
        left: (el.offsetLeft - container.offsetWidth/3),
        behaviour: 'smooth'
      })
    }
  }
  
  
  
  function clickHandler(clickId) {
    $(clickId).on("click",function(e){
      const attr = parseInt($(this).closest('.slider-pointer').attr('data-index'))
      $('.v-slider').slick('slickGoTo',attr)
      $(`[data-index]`).removeClass("progress-complete")
      
      for(let i = -1; i< attr; i++ ) {
        $(`[data-index="${i}"]`).addClass("progress-complete")
      }
  
      for(let i = $('.slider-pointer').length; i > attr; i--){
        $(`[data-index="${i}"]`).removeClass("highlighted")
      }
      
      for(let i = 0; i< attr; i++ ) {
      $(`[data-index="${i}"]`).addClass("highlighted")
      }

      $('.v-slider').slick('slickPause')

  })
  }
  
  clickHandler('.slider-pointer .pointer-icon');
  clickHandler('.slider-pointer h3');

});


