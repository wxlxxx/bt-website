import '../style/main.scss'
import WebFont from 'webfontloader'
import siblings from 'siblings'
import Swal from 'sweetalert2'
import { throttle, debounce } from 'throttle-debounce'
import 'share-buttons'

WebFont.load({
  google: {
    families: ['Noto Sans JP:n3,n4,n7']
  }
})

if(document.querySelectorAll('[data-page="home"]').length > 0){
  import(/* webpackChunkName: "homepage" */ './homePage.js')
}

if(document.querySelectorAll('[data-page="company"]').length > 0){
  import(/* webpackChunkName: "companypage" */ './companyPage.js')
}

if(document.querySelectorAll('[data-page="product"]').length > 0){
  import(/* webpackChunkName: "productpage" */ './productPage.js')
}

if(document.querySelectorAll('[data-page="list"]').length > 0){
  import(/* webpackChunkName: "listpage" */ './listPage.js')
}

document.querySelectorAll('[data-toggle="collapse"]').forEach((item, i) => {
  item.addEventListener('click', (e) => {
    const targetEle = document.querySelector(item.getAttribute('data-target'))
    if(item.getAttribute('aria-expanded') === 'false'){
      item.setAttribute('aria-expanded', 'true')
      targetEle.classList.add('show')
    }else {
      item.setAttribute('aria-expanded', 'false')
      targetEle.classList.remove('show')
    }
  })
})

const homeBavcar = document.querySelectorAll('nav.navbar.bg-primary').length === 0 ? true : false
document.querySelectorAll('header [data-toggle="dropdown"]').forEach((item, i) => {
  if(window.innerWidth >= 992) {
    item.addEventListener('mouseenter', (e) => {
      if(homeBavcar){
        document.querySelectorAll('nav.navbar')[0].classList.add('bg-primary')
      }
      const targetEle = document.querySelector(item.getAttribute('data-target'))
      if(targetEle){
        document.querySelectorAll('header [data-toggle="dropdown"]').forEach((ele, i) => {
          ele.setAttribute('aria-expanded', 'false')
        })
        item.setAttribute('aria-expanded', 'true')
        targetEle.classList.add('show')
        siblings(targetEle, '.navbar-fixed').forEach((item, i) => {
          item.classList.remove('show')
        })
      }else {
        document.querySelectorAll('header .navbar-fixed').forEach((ele, i) => {
          ele.classList.remove('show')
        })
        document.querySelectorAll('header [data-toggle="dropdown"]').forEach((ele, i) => {
          ele.setAttribute('aria-expanded', 'false')
        })
        document.querySelectorAll('header .dropdown-menu').forEach((ele, i) => {
          ele.classList.remove('show')
        })
        item.setAttribute('aria-expanded', 'true')
        siblings(item, '.dropdown-menu')[0].classList.add('show')
      }
    })
  }else {
    item.addEventListener('click', (e) => {
      if(item.getAttribute('aria-expanded') === 'false'){
        document.querySelectorAll('header [data-toggle="dropdown"]').forEach((ele, i) => {
          ele.setAttribute('aria-expanded', 'false')
        })
        document.querySelectorAll('header .dropdown-menu').forEach((ele, i) => {
          ele.classList.remove('show')
        })
        item.setAttribute('aria-expanded', 'true')
        siblings(item, '.dropdown-menu')[0].classList.add('show')
      }else {
        item.setAttribute('aria-expanded', 'false')
        siblings(item, '.dropdown-menu')[0].classList.remove('show')
      }
      e.preventDefault()
    })
  }
})

document.body.addEventListener('click', (e) => {
  document.querySelectorAll('.navbar-fixed').forEach((item, i) => {
    item.classList.remove('show')
  })
  document.querySelectorAll('[data-toggle="dropdown"]').forEach((item, i) => {
    item.setAttribute('aria-expanded', 'false')
  })
  document.querySelectorAll('header [data-toggle="dropdown"]').forEach((ele, i) => {
    ele.setAttribute('aria-expanded', 'false')
  })
  document.querySelectorAll('header .dropdown-menu').forEach((ele, i) => {
    ele.classList.remove('show')
  })
  if(homeBavcar){
    document.querySelectorAll('nav.navbar')[0].classList.remove('bg-primary')
  }
})

document.querySelectorAll('.navbar-fixed').forEach((item, i) => {
  item.addEventListener('click', (e) => {
    e.stopPropagation()
  })
})


if(window.innerWidth <= 992) {
  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('click', () => {
      siblings(item.parentNode, '').forEach((ele) => {
        ele.children[0].removeAttribute('open')
      })
    })
  })
}else {
  document.querySelectorAll('details').forEach((item) => {
    item.addEventListener('click', (e) => {
      e.preventDefault()
    })
  })
  document.querySelectorAll('footer details').forEach((item) => {
    item.setAttribute('open', '')
  })
}


document.querySelectorAll('.nav-tabs .nav-link').forEach((item) => {
  item.addEventListener('click', (e) => {
    item.classList.add('active')
    item.setAttribute('aria-selected', 'true')
    siblings(item, '.nav-link').forEach((item2) => {
      item2.classList.remove('active')
      item2.setAttribute('aria-selected', 'false')
    })
    if(/^#.*/.test(item.getAttribute('data-target'))){
      const target = document.querySelector(item.getAttribute('data-target'))
      target.classList.add('show')
      target.classList.add('active')
      siblings(target, '.tab-pane').forEach((item3) => {
        item3.classList.remove('show')
        item3.classList.remove('active')
      })
    }else{
      const targets = document.querySelectorAll(item.getAttribute('data-target'))
      siblings(targets[0], '.active').forEach((item) => {
        item.classList.remove('show')
        item.classList.remove('active')
      })
      targets.forEach(item => {
        item.classList.add('show')
        item.classList.add('active')
      })
    }
    e.preventDefault()
  })
})

document.querySelectorAll('.video-wrap').forEach((item) => {
  item.querySelector('.play-btn').addEventListener('click', (e) => {
    Swal.fire({
      width: 900,
      padding: 0,
      showConfirmButton: false,
      html: `<div class="embed-responsive embed-responsive-16by9"><iframe class="embed-responsive-item" src="${item.getAttribute('data-src')}" allowfullscreen></iframe></div>`
    })
    e.preventDefault()
  })
});

// to top
const toTop = document.querySelectorAll('a[href="#totop"]')[0] || null
if(toTop && !toTop._clickHandle){
  toTop._clickHandle = () => {
    const scrollToTop = () => {
        let sTop = document.documentElement.scrollTop || document.body.scrollTop
        if (sTop > 0) {
            window.requestAnimationFrame(scrollToTop)
            window.scrollTo(0, sTop - sTop / 8)
        }
    }
    scrollToTop()
  }
  toTop.addEventListener('click', toTop._clickHandle)
}

// window scroll listener
if(!window._scrollHandle){
  window._scrollHandle = () => {
    if(toTop){
      if(window.scrollY >= 150){
        toTop.style.display = 'flex'
      }else {
        toTop.style.display = 'none'
      }
    }
  }
  window.addEventListener('scroll', throttle(500,window._scrollHandle))
}

// seasonal banner
const seasonalBanner = document.querySelector('.seasonalBanner')
const mobileBanner = document.querySelector('.seasonalBanner').getAttribute('data-mobileBanner')
if(seasonalBanner){
  seasonalBanner.addEventListener('click', (e) => {
    if(e.target.classList.contains('close')){
      seasonalBanner.style.display = 'none'
      e.preventDefault()
    }
  })
  if(window.innerWidth < 992){
    seasonalBanner.style.backgroundImage = `url(${mobileBanner})`
  }
}

