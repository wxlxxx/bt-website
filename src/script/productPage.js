import Swiper from 'Swiper/swiper-bundle.js'
import '../style/product.scss'

var galleryThumbs = new Swiper('.gallery-thumbs', {
  spaceBetween: 10,
  slidesPerView: 5,
  loop: false,
  freeMode: true,
  loopedSlides: 5, //looped slides should be the same
  watchSlidesVisibility: true,
  watchSlidesProgress: true,
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

const quantity = document.querySelector('#quantity')
const minus = quantity.querySelector('.minus')
const add = quantity.querySelector('.add')
minus.addEventListener('click', () => {
  let num = parseInt(quantity.querySelector('.num').value)
  if(num > 1){
    num -= 1
    quantity.querySelector('.num').value = num
  }
})
add.addEventListener('click', () => {
  let num = parseInt(quantity.querySelector('.num').value)
  num += 1
  quantity.querySelector('.num').value = num
})

// list
const productList = document.querySelector('.product-list')
productList.addEventListener('click', (e) => {
  if(e.target.classList.contains('showMore')){
    e.preventDefault()
    productList.classList.add('show-more')
    e.target.style.display = 'none'
    productList.querySelector('.showLess').style.display = 'block'
  }
  if(e.target.classList.contains('showLess')){
    e.preventDefault()
    productList.classList.remove('show-more')
    e.target.style.display = 'none'
    productList.querySelector('.showMore').style.display = 'block'
  }
})
