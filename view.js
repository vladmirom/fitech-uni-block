// TODO: rewrite like in main.js. Move file into scripts/frontend folder

import $ from 'jquery'
import 'slick-carousel/slick/slick'

document.addEventListener('DOMContentLoaded', () => {
  const blockElements = document.querySelectorAll('.js-slider')

  // Get attributes per block.
  blockElements.forEach(( blockElement ) => {
    const attributesData = blockElement.getAttribute('data-block-attributes')
    const attributes = JSON.parse(attributesData)

    const {
      blockId,
      slidesToShow,
      slidesToScroll,
      arrows,
      dots,
      infinite,
      autoplay,
      focusOnSelect,
      autoplaySpeed
    } = attributes

    // Get slider element from the block.
    const sliderElement = blockElement.querySelector('ul')

    // Initialize Slick only if it hasn't already been initialized
    if (!$(sliderElement).hasClass('slick-initialized')) {
      $(sliderElement).slick({
        slidesToShow: slidesToShow,
        slidesToScroll: slidesToScroll,
        infinite: infinite,
        dots: dots,
        autoplay: autoplay,
        autoplaySpeed: autoplaySpeed,
        focusOnSelect: focusOnSelect,
        pauseOnHover: true,
        pauseOnFocus: true,
        prevArrow: arrows ? `.prev-arrow-${blockId}` : '',
        nextArrow: arrows ? `.next-arrow-${blockId}` : '',
        adaptiveHeight: true,
        responsive: [
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            },
          },
        ],
      })

      $(sliderElement).on('afterChange', function (event, slick, currentSlide) {
        // More reliable way to check if we're on the last slide
        const isLastSlide = currentSlide >= slick.slideCount - slick.options.slidesToShow

        // Hide next arrow when on the last slide
        if(isLastSlide) {
            $(`.next-arrow-${blockId}`).addClass('slick-disabled')
        }
        else {
            $(`.next-arrow-${blockId}`).removeClass('slick-disabled')
        }

        // Hide previous arrow when on the first slide
        if(currentSlide === 0) {
            $(`.prev-arrow-${blockId}`).addClass('slick-disabled')
        }
        else {
            $(`.prev-arrow-${blockId}`).removeClass('slick-disabled')
        }
      })
    }
  })
})
