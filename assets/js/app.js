$(document).ready(function(){
  const slider = $('.v-slider');
  let currentIndex = 0;
  slider
    .slick({
      vertical:true,
      verticalSwiping:true,
      arrows: false,
      infinite: false,
      slidesToScroll: 1,
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
  })
});



// USP of this project
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

