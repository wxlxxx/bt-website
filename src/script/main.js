import '../style/main.scss'
import WebFont from 'webfontloader'
import siblings from 'siblings'
import Swal from 'sweetalert2'

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

if(window.innerWidth >= 992) {
  document.querySelectorAll('footer details').forEach((item) => {
    item.setAttribute('open', '')
  })
}

document.querySelectorAll('details').forEach((item) => {
  item.addEventListener('click', () => {
    siblings(item.parentNode, '').forEach((ele) => {
      ele.children[0].removeAttribute('open')
    })
  })
})


document.querySelectorAll('.nav-tabs .nav-link').forEach((item) => {
  item.addEventListener('click', (e) => {
    item.classList.add('active')
    item.setAttribute('aria-selected', 'true')
    siblings(item, '.nav-link').forEach((item2) => {
      item2.classList.remove('active')
      item2.setAttribute('aria-selected', 'false')
    })
    const target = document.querySelector(item.getAttribute('href'))
    console.log(target);
    target.classList.add('show')
    target.classList.add('active')
    siblings(target, '.tab-pane').forEach((item3) => {
      item3.classList.remove('show')
      item3.classList.remove('active')
    })
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
