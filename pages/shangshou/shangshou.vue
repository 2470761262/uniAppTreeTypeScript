<template>
	<view>
	 <view>{{title}}</view>
	<testChild :message="55" :propD="[1,3,5]"></testChild>
	<button type="default" @click="gogo">gogo</button>
	
	
	</view>
</template>

<script lang="ts">
	 import { Vue, Component , Watch} from 'vue-property-decorator';  
	import testChild from '../../components/testChild.vue';
	
	@Component({  
	    name: 'Index',
		components:{
			testChild
		}
	})  
	export default class Index extends Vue {  
	    title: string = '我是父组件'; 
		 gogox: any = {
			 soso:1,
			 sxs:{
				 dg:55
			 }
		 }
		onLoad(){
			console.log(1);
		}
		
		@Watch("title")
		onHandleTitleWatch(value){
			console.log("titleChange:",value,this);
		}
		
		@Watch("gogox.sxs.dg")
		onHandleTitleWatch1(value){
			console.log("titleChan124214ge:",value,this);
		}
		
		gogo(){
			this.title +=1;
			 this.gogox.sxs.dg +=1;
			//console.log(this.gogox.sxs.dg,"this.gogo.sxs.dg");
		}
	}  
</script>

<style>

</style>
