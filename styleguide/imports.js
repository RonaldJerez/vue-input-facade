import Vue from 'vue'
import InputFacade from '../src/plugin'
import Field from './components/Field'
import Display from './components/Display'
import Checkbox from './components/Checkbox'

Vue.use(InputFacade)
Vue.component('example', Field)
Vue.component('display', Display)
Vue.component('checkbox', Checkbox)
