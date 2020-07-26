<template>
	<view>
		<view v-for="(item,index) in TreeList" :key="index" :class="['Tree',{'TreeBor':item.idList.length != 1 }]">
			<view class="Tree_cell_warp" :style="{color: colorList[item.idList.length - 1]}">
				<view class="Tree_Icon" @tap="treeHanderClick(item)">
					<view :class="['iconfont',iconSet(item) ? 'icon-caozuo-zhankai' : 'icon-liebiaozhankai'] "></view>
				</view>
				<view @tap="moreSelectHander(item)" class="Tree_Icon">
					<view :class="['iconfont','selectIcon',
					iconSelect(item.checkboxSelect) ? 'icon-duoxuanxuanzhong' : 'icon-weixuanzhong1'] ">
					</view>
				</view>
				<view class="Tree_cell_title" @tap="treeHanderClick(item)">
					<text v-for="(itemtext,itemindex) in item.titleList" :class='{"includesText" :ResetColor(itemtext) }' :key="itemindex">{{itemtext}}</text>
				</view>
			</view>
			<view :class="['Tree_child',{'Tree_childHide':item.childFlag}]">
				<tree :resultModel="resultModel" :list="item.child" v-if="item.child && item.child.length > 0"></tree>
			</view>
		</view>
	</view>
</template>

<script lang="ts">
	import {
		Vue,
		Component,
		Prop,
		Watch
	} from 'vue-property-decorator';
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	interface TreeListType {
		title:string;
		childFlag:boolean;
		idList:Array<number>;
		checkboxSelect:number;
		child?:Array<TreeListType>;
	}
	
	@Component({
		name: 'tree',
		computed: {
			...mapGetters(['GetCheckboxSelect']),
			//单个字体的颜色切换
			ResetColor(): Boolean {
				return (val) => {
					if (this.resultModel.includes(val)) {
						return true;
					}
					return false;
				}
			},
			//计算选中icon样式
			iconSelect(): Boolean {
				return (checkboxSelect) => {
					switch (checkboxSelect) {
						case 0:
							return false;
							break;
						case 1:
							return true;
							break;
					}
				}
			},
			//计算展开icon样式
			iconSet(): Boolean {
				return (item) => {
					if (item.child && item.child.length > 0)
						if (item.childFlag)
							return true;
						else
							return false;
					else
						return false;
				}
			}
		}
	})
	export default class tree extends Vue {
		public TreeList: Array < TreeListType > = [];
		public colorList: Array < sring > = ["#67B26F", "#F3904F", "#A770EF"];
		public iconType: Array < sring > = ["clear", "success"];
		public checkboxSelectList: Array < TreeListType > = [];

		@Prop({type: Array,default: []}) list: Array;
		@Prop({type: String,default: ""}) resultModel: String;

		@Watch("list", {
			deep: true,
			immediate: true
		})
		onWatchList(val) {
			this.TreeList = JSON.parse(JSON.stringify(val));
		}

		@Watch("GetCheckboxSelect.cell", {
			deep: true
		})
		onWatchCell(newval) {
			this.deepFor(this.TreeList, newval);
			this.$forceUpdate();
		}

		// 设置不关联的列表取消
		public deepFor(Forlist:Array<TreeListType>, setlength:number): void {
			let that = this;
			Forlist.forEach((item, index) => {
				if (item.idList.length != setlength) {
					item.checkboxSelect = 0;
					// 不挂念的组件清空存储的数组
					that.checkboxSelectList = [];
				}
			})
		}
		//title点击
		public treeHanderClick(item:TreeListType): void {
			if (item.child && item.child.length > 0) {
				item.childFlag = !item.childFlag;
			}
			console.log(`点击了第${item.idList.length}级菜单,title:${item.title}`);
		}
		//checkbox点击 0未选择 1选择
		public moreSelectHander(item:TreeListType): void {

			item.checkboxSelect = (item.checkboxSelect == 0 ? 1 : 0);
			//判断当前组件有没有已经添加到存储的数组 如果有删除 没有就添加
			if (this.checkboxSelectList.includes(item.idList[item.idList.length - 1])) {
				// 找到对应的index删除
				let deleteIndex = this.checkboxSelectList.findIndex((findIndex) => {
					return findIndex == item.idList[item.idList.length - 1];
				})
				this.checkboxSelectList.splice(deleteIndex, 1);

			} else {

				this.checkboxSelectList.push(item.idList[item.idList.length - 1]);
			}

			let that = this;

			//选中的数据提交到vuex统一管理。
			//可以在父页面监听vuex的变化来提交数据到后台
			this.$store.dispatch("SetActionsCheckboxSelect", {
				cell: item.idList.length,
				list: that.checkboxSelectList
			});
			console.log(this.GetCheckboxSelect.list);
		}
	}
</script>

<style lang="less">
	.Tree {
		padding-left: 40upx;

		&.TreeBor {
			position: relative;

			&::before,
			&::after {
				content: '';
				position: absolute;
				left: 12.5upx;
			}

			&::before {
				top: 0;
				width: 0;
				height: 100%;
				border-left: 2upx dotted #999;
			}

			&::after {
				top: 32upx;
				width: 20upx;
				border-top: 2upx dotted #999;
			}

			&:last-child {
				&::before {
					height: 35upx;
				}
			}
		}

		.Tree_cell_warp {
			height: 70upx;
			display: flex;
			align-items: center;

			.Tree_Icon {
				line-height: 1;

				.iconfont {
					font-size: 25upx;
					color: #67B26F;
				}

				.selectIcon {
					font-size: 40upx;
					margin-left: 20upx;
				}
			}

			.Tree_cell_title {
				flex: 1;
				font-size: 30upx;
				line-height: 1;
				text-indent: 20upx;
				transform: translateY(-4upx);
			}
		}

		.Tree_child {
			opacity: 1;
			overflow: hidden;
			transition: opacity 1s;

			&.Tree_childHide {
				opacity: 0;
				height: 0upx;
			}
		}
	}

	.includesText {
		color: #006699;
	}
</style>
