<template>
	<view >
		<view class="Tree_Warp">
			<view class="search_Pad">
				<view class="Tree_search">
					<input type="text" v-model="treeSearchModel" 
					placeholder="搜索关键字" placeholder-class="placeholderClass">
					<view class="iconfont icon-sousuo" @tap="searchHanderClick"></view>
				</view>
			</view>
			<tree :list="SendList" :resultModel="SendSearchModel"></tree>
		</view>
	</view>
</template>

<script>
	import tree from  '../../components/tree.vue';
	import {mapState ,mapGetters, mapActions} from 'vuex';
	export default {
		computed:{
			...mapGetters(['GetCheckboxSelect','GetTreeList'])
		},
		components:{
			tree
		},
		data() {
			return {
				treeSearchModel:'',
				SendSearchModel:'',
				list:[
					{
						title:"1号区域",
						childFlag:true,
						idList:[1],
						checkboxSelect:0,
						child:[
							{
								title:"11号门店",
								childFlag:true,
								idList:[1,11],
								checkboxSelect:0,
								child:[
									{
										idList:[1,11,111],
										childFlag:true,
										checkboxSelect:0,
										title:"张三",
									},
									{
										idList:[1,11,112],
										childFlag:true,
										checkboxSelect:0,
										title:"李四",
									},
									{
										idList:[1,11,113],
										childFlag:true,
										checkboxSelect:0,
										title:"王五",
									},
									{
										idList:[1,11,114],
										childFlag:true,
										checkboxSelect:0,
										title:"赵六",
									}
								]
							}
						]
					},
					{
						title:"2号区域",
						childFlag:true,
						idList:[2],
						checkboxSelect:0,
						child:[
							{
								idList:[2,21],
								title:"21号门店",
								childFlag:true,
								checkboxSelect:0,
								child:[
									{
										idList:[2,21,212],
										childFlag:true,
										title:"谢谢你",
										checkboxSelect:0,
									},
									{
										idList:[2,21,213],
										childFlag:true,
										title:"Sorry",
										checkboxSelect:0,
									},
									{
										idList:[2,21,214],
										childFlag:true,
										title:"sad",
										checkboxSelect:0,
									}
								]
							},
							{
								idList:[2,22],
								title:"22号门店",
								childFlag:true,
								checkboxSelect:0,
								child:[
									{
										idList:[2,22,221],
										childFlag:true,
										title:"Proxy",
										checkboxSelect:0,
									},
									{
										idList:[2,22,222],
										childFlag:true,
										title:"webPack",
										checkboxSelect:0,
									}
								]
							}
						]
					}
				],
				SendList:[]
			}
		},
		onLoad(){
			this.SetActionsTreeList(this.list);
			this.SendList =  this.deepSetFontList(this.GetTreeList);
		},
		methods: {
			...mapActions(["SetActionsTreeList"]),
			//拆分字体
			deepSetFontList(list){
				list.forEach((item,index)=>{
					item.titleList =  Array.from(item.title);
					if(item.child && item.child.length > 0){
						this.deepSetFontList(item.child);
					}
				})
				return list;
			},
			//点击模糊查找数据
			searchHanderClick(){
				let forList = JSON.parse(JSON.stringify(this.GetTreeList));
				let RsultTree = [];
				//剔除全部不匹配的数据
				for(let i = 0 ; i < this.GetTreeLever(this.GetTreeList)(); i++){
					RsultTree = this.deepForDemolition(
					this.deepForDemolition(forList,this.treeSearchModel.toLocaleLowerCase()),
					this.treeSearchModel.toLocaleLowerCase());
				}
				// 打开全部
				function OpenAll(list){
					list.forEach((item,index)=>{
						item.childFlag = false;
						if(item.child && item.child.length > 0)
							OpenAll(item.child);
					})
				}
				// 搜索词空不执行，直接把副本传递出去
				if(this.treeSearchModel!=''){
					OpenAll(RsultTree);
				}
				this.SendList = RsultTree;
				this.SendSearchModel = this.treeSearchModel;
			},
			// 计算树的最高层级
			GetTreeLever(list,lever = 0){
				let that = this
				~function GetLever(forList){
					++lever;
					forList.forEach((item,index)=>{			
						if(item.child && item.child.length > 0){
							GetLever(item.child,lever);
						}
					})
					return lever;
				}(list);
				return function(){
					return  (Math.ceil((lever - 1) / that.GetTreeList.length));
				};
			},
			//拆开全部数据,过滤不需要的 只拆一次
			deepForDemolition(Forlist,model = ""){
				
				for(let i = 0 ; i < Forlist.length ; i++){
					if(Forlist[i].child && Forlist[i].child.length > 0){
						this.deepForDemolition(Forlist[i].child,model);
					}else{
						if(!(Forlist[i].title.toLocaleLowerCase().includes(model)) && model != ""){							
							Forlist.splice(i,1);
							this.deepForDemolition(Forlist,model);
						}
					}
				}
				return Forlist;
			}
		}
	}
</script>

<style lang="less">
	.Tree_Warp{
		.search_Pad{
			padding: 20upx 40upx 40upx;
			.Tree_search{
				display: flex;
				border: 4upx solid #67B26F;
				border-radius: 10upx;
				height: 60upx;
				input{
					flex: 1;
					font-size: 30upx;
					line-height: 60upx;
					height: 100%;
					display: block;
					padding-left: 20upx;
					color: #67B26F;
				}
				.icon-sousuo{
					width: 100upx;
					text-align: center;
					line-height: 60upx;
					background: #67B26F;
					color: #fff;
				}
				.placeholderClass{
					font-size: 30upx;
					color: #999;
				}
			}
		}
	}
	
</style>
