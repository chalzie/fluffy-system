import Vue from "vue";
import App from "./App.vue";

import { library } from '@fortawesome/fontawesome-svg-core'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import VueCompositionAPI from '@vue/composition-api'
import vSelect from 'vue-select'

library.add(faCircleCheck)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.component('v-select', vSelect)
Vue.use(VueCompositionAPI)

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
