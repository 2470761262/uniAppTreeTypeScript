import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import CreateStore from './store/store.js';

Vue.config.productionTip = false
App.mpType = 'app'

Vue.use(Vuex);
const store = CreateStore();

const app = new Vue({
    ...App,
	store
})
app.$mount()
