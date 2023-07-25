import {add} from './math'
import {currentTime} from './tools'

import './css/index.css'
import './css/less.less'
import './css/sass.sass'
import './css/scss.scss';
import './css/st.styl';

import './css/iconfont.css'


if (module.hot) {
  module.hot.accept('./math.js')
}

console.log(currentTime())
console.log(add(1, 2, 3, 4, 5))
console.log(currentTime())


