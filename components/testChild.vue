<template>
	<view>
		<view>子组件Mmessage:{{message}}</view>
		<view>子组件age:{{propA}}/{{tit}}</view>
		<view>子组件propD:{{propD}}</view>
	</view>
</template>

<script lang="ts">
	import { Vue, Component , Prop} from 'vue-property-decorator';
	
	@Component({  
	    name: 'TestChild'
	})  
	export default class Index extends Vue {  
	   @Prop({required:true,type:[Number,String] }) 
				message! : Number | String ;
	   @Prop({ default: 'so good' })  
				propA ;
		@Prop()
		  propD: any ;
				  
		public tit:string  = 5;
		
		asd(){
			this.tit =234;
		}
	}  
</script>

<style>

</style>
