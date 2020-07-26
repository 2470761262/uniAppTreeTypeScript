import Vuex from 'vuex'
import tree from './tree.js'; 
export default ()=>{
	return new Vuex.Store({
		modules:{
			tree
		}
	})
} 