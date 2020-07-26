export default{
	state:{
		TreeList:[],
		CheckboxSelect:{
			cell:-1,
			list:[]
		}
	},
	getters:{
		//获取树
		GetTreeList(state){
			return state.TreeList;
		},
		//获取选中的数据
	    GetCheckboxSelect(state) { 
	       return state.CheckboxSelect;
	    }
	},
	mutations:{
		//设置选中的数据
		SetCheckboxSelect(state,payload){
			Object.keys(payload).forEach((item,index)=>{
				if(state.CheckboxSelect.hasOwnProperty(item)){
					state.CheckboxSelect[item] = payload[item];
				}
			})
			
		},
		//修改树
		SetTreeList(state,payload){
			return state.TreeList = payload;
		}
	},
	actions:{
		//提交到设置选中的数据方法中
		SetActionsCheckboxSelect(context,val){
			context.commit('SetCheckboxSelect',val);
		},
		//提交到修改书的方法
		SetActionsTreeList(context,val){
			context.commit('SetTreeList',val);
		}
	}
}