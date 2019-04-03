<template>
	<transition enter-active-class="animated fadeIn" leave-active-class=" animated fadeOut">

		<div class="question-dialog" v-show="visiable">
			<div class="dialog-wrapper">

				<div class="dialog-header clearfix">
					<h4 class="dialog-tit fl">提问</h4>
					<i class="iconfont icon-close fr" @click="cancel"></i>
				</div>

				<div class="dialog-body">
					<el-form ref="from" :model="record" label-width="80px">

						<el-form-item label="标题">
							<el-input v-model="record.title"  placeholder="请输入标题" maxlength="50" ref="titleRef"></el-input>
						</el-form-item>

						<el-form-item label="描述">
							<el-input type="textarea" v-model="record.description" placeholder="请描述问题" maxlength="500" ref="descRef">
							</el-input>
						</el-form-item>

						<div class="dialog-upload clearfix">

							<transition-group  enter-active-class="animated fadeInLeft" leave-active-class=" animated fadeOutRight">
								<div class="dialog-thumbnail fl" v-for="(item,index) in record_file" :key="index">
									<div class="dialog-mask">
										<i class="iconfont icon-lajixiang" @click="handleRemoveThumbnail(index)"></i>
									</div>
									<div class="dialog-img">
										<img :src="fileRoot + item.url">
									</div>
								</div>
							</transition-group>

							<div class="dialog-add fl" v-show="addShow">
								<label for="upImg"></label>
								<i class="iconfont icon-add"></i>
								<input type="file" id="upImg" multiple @change="uploadFile" accept = "image/*"  style="display: none;">
							</div>

						</div>

					</el-form>
				</div>

				<div class="dialog-footer">
					<el-button type="danger" @click="cancel">取消</el-button>
					<el-button type="primary" @click="handlePublish">发布</el-button>
				</div>

			</div>
		</div>

	</transition>
</template>

<script>
	import fileService from '@/services/fileService'
	import interService from '@/services/interlocutionService'
	export default {
		data(){
			return{
				fileRoot:window.urls.fileRoot +'/',
				record:{},
				record_file:[],
				addShow:true,
			}
		},
		computed: {
			visiable() {
				return this.$store.state.release === 'question'
			}
		},
		methods:{
      // 取消弹框
      cancel(){
      	this.$store.commit('SetRelease', '')
      	this.addShow = true;
      	this.record_file = [];
      },

      // 上传图片
      uploadFile(e){
      	let file = e.target.files[0];
      	if(!file){return;}
      	if(!this.$Tool.checkPic(file.name)){
      		this.$message({
      			message:"格式错误",
      			center: true,
      			type: "error"
      		});
      		return;
      	}
      	let param = new FormData();
      	param.append('file', file, file.name);
      	fileService.uploadPic(param, (data)=>{
      		let obj = {};
      		obj.url = data.result.url;
      		obj.filename = data.result.filename;
      		this.record_file.push(obj);
      		if(this.record_file.length >= 4) {
      			this.addShow = false;
      		}else{
      			this.addShow=true;
      		}

      	});
      },
      //删除上传缩略图
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
      		this.addShow = true;
      	}).catch(() => {
      		this.$message({
      			type: 'info',
      			message: '已取消删除'
      		});
      	});
      },
      // 发布
      handlePublish(){
      	if(!this.record.title) {
      		this.$message({
      			message: "请输入问题标题",
      			type: "warning"
      		});
      		this.$refs.titleRef.focus();
      		return;
      	}
      	if(!this.$Tool.checkInput(this.record.title)){
      		this.record.title = this.$Tool.replaceNo(this.record.title);
      		this.$message({
      			message: '内容含有非法字符，已为您删除，请确认',
      			type: 'error'
      		});
      		return;
      	}
      	this.record.author = Number(localStorage.id || 0);
      	if(this.record.type != 1 && this.record.type != 2) {
      		this.record.title = this.$Tool.doTitle(this.record.title);
      		Object.assign(this.record,this.position);
      		let images = [];
      		for(let i = this.record_file.length -1; i>=0;i--){
      			images.push(this.record_file[i].url);
      		}
      		let data = interService.publishQuestion(this.record,images+"");
      		if(data && data.status == "success"){
      			console.log(data)
      			this.$message({
      				message: '发布成功',
      				type: 'success'
      			});
      		}
      	}



      },

    }
  }
</script>

<style scoped lang="less">
.question-dialog{
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
	.dialog-wrapper {
		width: 620px;
		min-height: 580px;
		position: relative;
		padding: 10px 30px 26px 30px;
		border-radius: 12px;
		background-color: #fff;
		.dialog-header {
			height: 50px;
			line-height: 50px;
			.dialog-tit {
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
		.dialog-body {
			padding-top: 10px;
			.dialog-upload {
				padding-top: 10px;
				padding-bottom: 40px;
				.dialog-thumbnail {
					position: relative;
					margin-right: 8px;
					margin-bottom: 8px;
					width: 130px;
					height: 130px;
					border: 1px solid #c0ccda;
					border-radius: 8px;
					.dialog-mask {
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
						background-color: rgba(0, 0, 0, 0.6);
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
				.dialog-add {
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
<style lang="less">
.el-tabs__item{
	font-size: 16px;
	&:hover{
		color: #f56c6c;
	}
	&.is-active{
		color: #f56c6c;
	}
}
.el-tabs__active-bar{
	background-color: #f56c6c;
}
.el-form-item{
	.el-input{
		width: 60%;
	}
	.el-input--suffix{
		width: 100%;
	}
	.el-textarea__inner{
		height: 150px;
		resize: none;
	}
	.el-form-item__label{
		text-align: center;
	}
}
.el-upload--picture-card{
	width: 100px;
	height: 100px;
	line-height: 110px;
}
</style>