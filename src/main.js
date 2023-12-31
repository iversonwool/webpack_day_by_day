
// import 'core-js/es/promise'

import {add, triple} from './math'
import {currentTime} from './tools'

import './css/index.css'
import './css/less.less'
import './css/sass.sass'
import './css/scss.scss';
import './css/st.styl';

import './css/iconfont.css'

// var a = 3;

document.getElementById('btn').onclick = function () {
  // 主要 webpackChunkName 不能写错
  import(/* webpackChunkName: "hello" */'./hello')
    .then(({hello}) => {
      hello()
    })
}

if (module.hot) {
  module.hot.accept('./math.js')
}

console.log(currentTime())
console.log(add(1, 2, 3, 4, 5))
console.log(currentTime())
console.log(triple(3))

new Promise(function (resolve) {
  setTimeout(function () {
    resolve()
  }, 1000)
}).then(function () {
  console.log('resolve')
})

const arr = [1, 3, 4]
console.log(arr.includes(3))


if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}