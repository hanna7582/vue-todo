import Vue from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCheck, faTrash, faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vue2TouchEvents from 'vue2-touch-events'

library.add(faCheck, faTrash, faPlus)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(Vue2TouchEvents)

Vue.config.productionTip = false

new Vue({
    render: h => h(App),
}).$mount('#app')