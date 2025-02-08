import Vue from 'vue'
import App from './App.vue'
import axios from "axios";
import { Toast, Card,DropdownMenu, DropdownItem,Cell, CellGroup} from 'vant';

Vue.config.productionTip = false
Vue.use(Toast)
Vue.use(Card)
Vue.use(axios)
Vue.use(DropdownItem)
Vue.use(DropdownMenu)
Vue.use(Cell)
Vue.use(CellGroup)
new Vue({
  render: h => h(App),
}).$mount('#app')
