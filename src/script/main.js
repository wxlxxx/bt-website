import '../style/main.scss'
import WebFont from 'webfontloader'
WebFont.load({
  google: {
    families: ['Noto Sans JP:n3,n4,n7']
  }
})

if(document.querySelectorAll('[data-page="home"]').length > 0){
  import(/* webpackChunkName: "homepage" */ './homePage.js')
}
