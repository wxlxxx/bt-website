import '../style/main.scss'
import WebFont from 'webfontloader'
import siblings from 'siblings'

WebFont.load({
  google: {
    families: ['Noto Sans JP:n3,n4,n7']
  }
})

if(document.querySelectorAll('[data-page="home"]').length > 0){
  import(/* webpackChunkName: "homepage" */ './homePage.js')
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
