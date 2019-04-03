<template>
	<transition enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">

		<div class="release-dialog" v-show="visiable">
			<div class="dialog-wrapper">

				<div class="dialog-header clearfix">
					<h4 class="dialog-tit fl">{{ dialogTitle }}</h4>
					<i class="iconfont icon-close fr" @click="close"></i>
				</div>

				<div class="dialog-body">
					<el-form ref="form" :model="record" label-width="80px">

						<el-form-item label="标题">
							<el-input v-model="record.title" placeholder="请输入标题" maxlength="50" ref="titleRef"></el-input>
						</el-form-item>

						<el-form-item label="类型">
							<el-select v-model="record.classify" placeholder="请选择类型" ref="typeRef">
								<el-option 
									v-for="(item, index) in classifyList"
									:key="index"
									:label="item.classifyname" 
									:value="item.classifycode"
									></el-option>
							</el-select>
						</el-form-item>

						<el-form-item label="内容" v-show="dialogDescShow">
							<el-input 
								type="textarea" 
								placeholder="请输入内容" 
								maxlength="500" 
								ref="descRef"
								v-model="record.content" 
							></el-input>
						</el-form-item>

						<div class="dialog-upload clearfix">

							<transition-group  enter-active-class="animated fadeInLeft" leave-active-class=" animated fadeOutRight">
								<div class="dialog-thumbnail fl" v-for="(item,index) in record_file" :key="index">
									<div class="dialog-mask">
										<i class="iconfont icon-lajixiang" @click="handleRemoveThumbnail(index)"></i>
									</div>
									<div class="dialog-img" v-if="isType">
										<img :src="fileRoot + item.url" alt="">
									</div>
									<div class="dialog-img aa" v-else>
										<img :src="fileRoot + item.thumbnail" alt="">
									</div>
								</div>
							</transition-group>

							<div class="dialog-add fl" v-show="recordShow">
								<label for="upImg"></label>
								<i class="iconfont icon-add"></i>
								<input type="file" id="upImg" style="display: none;" multiple 
									:accept="accept" 
									@change="uploadFile">
							</div>

						</div>

					</el-form>
				</div>

				<div class="dialog-footer">
					<el-button type="danger" @click.native="close">取消</el-button>
					<el-button type="primary" @click.native="handlePublish">发布</el-button>
				</div>

			</div>
		</div>

	</transition>
</template>

<script>
	import articleService from '@/services/articleService'
	import followService from '@/services/followService'
	import userService from '@/services/userService'
	import fileService from '@/services/fileService'
	import classifyService from '@/services/article_classifyService'

	const defaultForm = {
		title: '',
		content: '',
		author: 0,
		type: 0,
		publishtime: '',
		classify: '',
		selectedpublishname: '',
		selectedpublishaddress: ''
	}
	export default {
		data() {
			return {
				classifyList: JSON.parse(localStorage.classify),
				fileRoot: window.urls.fileRoot + '/',
				dialogTitle: '',
				record: Object.assign({}, defaultForm),
				dialogDescShow: true,
				record_file: [],
				recordShow: true,
				accept: '',
			}
		},
		computed: {
			visiable() {
				return this.$store.state.release === 'article' || this.$store.state.release === 'video'
			}
		},
		watch: {
			'$store.state.release' (val) {
				if(val === 'article'){
            this.dialogTitle = "发布图文";
            this.record.type = 1;
            this.dialogDescShow = true;
            this.accept = "image/*";
        }
        else if(val === 'video') {
            this.dialogTitle = "发布视频";
            this.record.type = 2;
            this.dialogDescShow = false;
            this.accept = "video/*";
        }
			}
		},
		methods: {
			// 隐藏发布弹框
			close(){
				this.$store.commit('SetRelease', '')
				this.record.title = '';
				this.record.classify = '';
				this.record.content = '';
				this.record_file = [];
				this.recordShow = true;
			},

	    // 上传图片
	    uploadFile(e){
	    	let file = e.target.files[0];
	    	if(!file){return;}
	    	if(this.record.type == 1 && !this.$Tool.checkPic(file.name)) {
	    		this.$message({
	    			message: '格式错误',
	    			center: true,
	    			type:"error"
	    		});
	    		return;
	    	}
	    	if(this.record.type == 2 && !this.$Tool.checkVideo(file.name)) {
	    		this.$message({
	    			message: '格式错误',
	    			center: true,
	    			type:"error"
	    		});
	    		return;
	    	}

	        let param = new FormData(); //创建form对象
	        param.append('file',file,file.name);//通过append向form对象添加数据

	        if(this.record.type == 1) {
	        	fileService.uploadPic(param,(data) =>{
	        		let obj = {};
	        		obj.url = data.result.url;
	        		obj.filename = data.result.filename;
	        		obj.type = 1;
	        		this.record_file.push(obj);
	        		if(this.record_file.length >= 8){
	        			this.recordShow = false;
	        		}else{
	        			this.recordShow = true;
	        		}
	        	});
	        }
	        else if(this.record.type == 2) {
	        	fileService.uploadVideo(param, (data) => {
	        		let obj = {};
	        		obj.url = data.result.url;
	        		obj.filename = data.result.filename;
	        		obj.type = 2;
	        		obj.thumbnail = data.thumbnail;
	        		this.record_file.push(obj);
	        		this.recordShow = false;

	        	});
	        }else{
	        	this.$message({
	        		message: '出现意外错误',
	        		center: true,
	        		type:"error"
	        	});
	        }
	      },

	    // 删除上传缩略图
	    handleRemoveThumbnail(item){
	    	this.$confirm('确认删除?', '', {
	    		confirmButtonText: '确定',
	    		cancelButtonText: '取消',
	    		type: 'warning'
	    	}).then(() => {
	    		this.record_file.splice(item,1);
	    		this.$message({
	    			type: 'success',
	    			message: '删除成功!'
	    		});
	    		this.recordShow = true;
	    	}).catch(() => {
	    		this.$message({
	    			type: 'info',
	    			message: '已取消删除'
	    		});
	    	});
	    },

	    // 发布文章
	    handlePublish(){
	    	if(this.record.type == 1) {
	    		if(!this.record.title) {
	    			this.$message({
	    				message: '请输入文章标题',
	    				type:"warning"
	    			});
	    			this.$refs.titleRef.focus();
	    			return;
	    		}
	    		if(!this.record.classify){
	    			this.$message({
	    				message: '请选择文章类型',
	    				type:"warning"
	    			});
	    			this.$refs.typeRef.focus();
	    			return;
	    		}
	    		if(!this.record.content) {
	    			this.$message({
	    				message: '请输入文章内容',
	    				type:"warning"
	    			});
	    			this.$refs.descRef.focus();
	    		}
	    	}else if(this.record.type == 2) {
	    		if(!this.record.title) {
	    			this.$message({
	    				message: '请输入视频标题',
	    				type:"warning"
	    			});
	    			this.$refs.titleRef.focus();
	    			return;
	    		}
	    		if(!this.record.classify){
	    			this.$message({
	    				message: '请选择视频类型',
	    				type:"warning"
	    			});
	    			this.$refs.typeRef.focus();
	    		}
	    	}

	    	if(!this.$Tool.checkInput(this.record.title)) {
	    		this.record.title = this.$Tool.replaceNo(this.record.title);
	    		this.$message({
	    			message: '标题含有非法字符，已为您删除',
	    			type:"error"
	    		});
	    		return;
	    	}
	    	this.record.author = Number(this.loginUserId || 0);

	    	let data;
	    	if(this.record.type == 1 || this.record.type == 2) {
	    		data = articleService.publishArticle(this.record, this.record_file);
	    		if(data && data.status == "success") {
	    			this.$message({
	    				message: '发布成功',
	    				type: 'success'
	    			});
	    			this.emitInput(false);
	    			this.record_file =[];
	    			this.record.title = "";
	    			this.record.classify = "";
	    			this.record.content = "";
	    			this.record.show = true;
	    		}else{
	    			this.$message({
	    				message: '发布失败，请重新发布',
	    				type: 'error'
	    			});
	    		}
	    	}
	    }

	  }

	}
</script>

<style lang="less" scoped>
.release-dialog{
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	z-index: 99;
	display: flex;
	overflow: hidden;
	justify-content: center;
	align-items: center;
	background: rgba(0,0,0,0.6);
	.dialog-wrapper{
		width: 620px;
		min-height: 580px;
		position: relative;
		padding: 10px 30px 26px 30px;
		border-radius: 12px;
		background-color: #fff;
		.dialog-header{
			height: 50px;
			line-height: 50px;
			.dialog-tit{
				position: relative;
				padding-left: 10px;
				font-size: 15px;
				font-weight: 600;
				letter-spacing: 1px;
				color: #f56c6c;
				&:before{
					position: absolute;
					left: 0;
					top: 16px;
					content: "";
					display: block;
					width: 3px;
					height: 18px;
					border-radius: 20px;
					background-color: #f56c6c;
				}
			}
			.iconfont{
				font-size: 18px;
				font-weight: 700;
				color: #666;
				transition: all .5s;
				&:hover{
					opacity: .6;
					transform: rotate(180deg);
				}
			}
		}
		.dialog-body{
			padding-top: 10px;
			.dialog-upload{
				padding-top: 10px;
				padding-bottom: 40px;
				.dialog-thumbnail{
					position: relative;
					margin-right: 8px;
					margin-bottom: 8px;
					width: 130px;
					height: 130px;
					border: 1px solid #c0ccda;
					border-radius: 8px;
					.dialog-mask{
						position: absolute;
						top: 0;
						left: 0;
						z-index: 9;
						display: flex;
						justify-content: center;
						align-items: center;
						width: 100%;
						height: 100%;
						border-radius: 6px;
						background-color: rgba(0,0,0,0.6);
						.iconfont{
							font-size: 20px;
							padding: 0 10px;
							color: #fff;
							opacity: .6;
							transition: all .4s;
						}
						&:hover .iconfont{
							font-size: 30px;
							opacity: 1;
						}
					}
					.dialog-img{
						position: absolute;
						left: 0;
						top: 0;
						width: 100%;
						height: 100%;
						margin-bottom: 8px;
						img{
							display: block;
							width: 100%;
							height: 100%;
							border-radius: 6px;
							object-fit: cover;

						}
					}
				}
				.dialog-add{
					width: 128px;
					height: 128px;
					border-radius: 6px;
					border: 1px dashed #999;
					transition: all .2s;
					&:hover{
						border: 1px  dashed #409eff;
						.iconfont{
							color: #409eff;
						}
					}
					label{
						position: absolute;
						top: 0;
						left: 0;
						display: block;
						width: 100%;
						height: 100%;
						cursor: pointer;
					}
					.iconfont{
						display: block;
						width: 100%;
						height: 100%;
						line-height: 128px;
						text-align: center;
						color: #8c939d;
						font-size: 28px;
					}
				}
			}
		}
		.dialog-footer{
			position: absolute;
			bottom: 26px;
			right: 30px;
		}

	}
}

</style>
