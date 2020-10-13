import Swiper from 'Swiper/swiper-bundle.js'
import '../style/company.scss'

const swiper = new Swiper('#certificate .swiper-container', {
  slidesPerView: 1,
  spaceBetween: 30,
  navigation: {
    nextEl: '#certificate .swiper-button-next',
    prevEl: '#certificate .swiper-button-prev',
  },
  pagination: {
    el: '#certificate .swiper-pagination',
    clickable: true
  },
  breakpoints: {
    768: {
      slidesPerView: 4,
    }
  }
})

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 4,
  loop: true,
  freeMode: true,
  loopedSlides: 5, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
  navigation: {
    nextEl: '.gallery-thumbs .swiper-button-next',
    prevEl: '.gallery-thumbs .swiper-button-prev',
  },
  breakpoints: {
    768: {
      direction: 'vertical',
    }
  }
});
var galleryTop = new Swiper('.gallery-top', {
  effect: 'fade',
  spaceBetween: 10,
  loop: true,
  loopedSlides: 5, //looped slides should be the same
  thumbs: {
    swiper: galleryThumbs,
  },
});
