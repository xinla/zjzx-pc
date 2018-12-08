<template>
	<div>
		<div class="mask-current" v-show="ifLoad">
			<loading-main></loading-main>
		</div>
		<div class="detail">
			<section class="content-wrap" v-if="!proFail1">
				<h1 class="article-title">{{ article.title }}</h1>
				<div class="publisher bfc-o clearfix">
					<router-link :to="{name:'',query:{userId:article.author}}">
						<!-- <img :src="$Tool.headerImgFilter(artUser.imageurl)" alt="" class="uphoto uphoto-big fl"> -->
						<div class="article-time-name">
								{{ artUser.username}}
								<time v-text="$Tool.publishTimeFormat(article.publishtime)"></time>
							<!-- <div class="uname">
							</div> -->
							<!-- <div class="ts utime">
							</div> -->
						</div>
					</router-link>
					<!-- <button type="button" class="focus bfc-p fr" v-if="userId != article.author" @click="handleFocus(article.author,1)">{{focusState?'已关注':'关注'}}</button> -->
				</div>
				<div class="content">
					<div class="article-content" v-if="3 === article.type">
			          <p v-html="article.content"></p>
			        </div>
					<div class="phone-content" v-else>
						<div v-if="1 === article.type" class="phone-img clearfix">
							<div class="tel-img fl" v-for="(item,index) in ArticleFile">
								<img  :src="fileRoot + item.url" :alt="item.filename"  v-preview="fileRoot + item.url">
							</div>
						</div>
						<div v-else-if="2 === article.type">
							<video-player class="video-player vjs-custom-skin"
								ref="videoPlayer"
							 	:playsinline="true"
							  	:options="playerOptions">
							</video-player>
						</div>
					</div>
					<a :href="article.sourceurl" class="see-text" v-if="sourceShow">查看原文</a>
				</div>
				<div class="loveCiew">
					<p class="red">爱心提示：</p>
					<p>
	          诈骗在中国已涉及到各行各业，高超的诈骗手段让人防不胜防！
	          全国每年累计被诈骗金额超过3000亿，许多人被骗得倾家荡产，甚至家破人亡！有毒有害食品层出不穷，假冒伪劣产品泛滥成灾，严重伤害了国人的身体健康。
					</p>
					<p>我们对此深恶痛绝，鉴于此，我们开创了这个平台！</p>
					<p>
					我们希望你能通过直击真相的平台了解到有关方面的知识和技能，懂得如何更好地保护自己和家人，并能够把这个平台推荐和分享给您身边的亲朋好友，让他们尽早的远离欺骗和伤害。
					</p>
					<p>我们相信，你的一次举手之劳，可能就会挽救一个家庭甚至一个美丽的生命！</p>
					<p class="red">直击真相：多一个人看到，就少一个人受骗！</p>
				</div>
				<!-- <div class="keywords">
					<label>关键词：</label>
					<span v-for="item in article.keywords">{{ item }}</span>
				</div> -->
			</section>
			<prompt-blank v-if="proFail1" :mes="failMes1"></prompt-blank>
			<ul class="share-wrap">
				<li class="share-text"> 分享至 </li>
				<li class="share-list iconfont icon-wechat" @click="share('wechat')">
					<canvas class="qr-code" v-if="isWechatCode" ref="QRCode"></canvas>
				</li>
				<li class="share-list iconfont icon-qq" @click="share('qq')"></li>
				<li class="share-list iconfont icon-kongjian" @click="share('qzone')"></li>
				<li class="share-list iconfont icon-weibo" @click="share('weibo')"></li>
				<!-- <li ><canvas ref="QRCode"></canvas></li> -->
			</ul>
			<ul class="article-change clearfix" v-if="!detailType">
				<li class="item" @click="handleFabulous(1)" :class="{'likeActive':likeStatus}">
					<like :likeStatus="likeStatus"></like>
					{{likeNum}}
				</li>
				<li class="item">
					<i class="iconfont" :class="{'icon-not-collection':collectToggle.notcollect,'icon-collected':collectToggle.collected}" @click="handleCollect(id)"></i>
					<span>收藏</span>
				</li>
				<li class="item">
					<i class="iconfont icon-lajixiang"></i>
					<span>不喜欢</span>
				</li>
				<div class="item" @click="handleReport(1)">
					<i class="iconfont icon-warning-circle"></i>
					<span>举报</span>
				</div>
			</ul>

			<ul class="article-menu" v-else>
				<li :class="{current:current == 1}" @click="handleSwitch(1)">评论</li>
				<li :class="{current:current == 2}" @click="handleSwitch(2)">转发</li>
				<li :class="{current:current == 3}" @click="handleSwitch(3)">点赞</li>
			</ul>
			<div class="comment-wrap" v-if="ifSwitchB">
				<div class="comment-all-num">
					共<em class="all-num">{{commentNum}}</em>条评论				
				</div>
				<div>
					<!-- <div class="fl">
						<img class="myphoto" :src="$Tool.headerImgFilter()" alt="">
					</div> -->
					<!-- 一级评论框 -->
					<div class="comment-writer-wrap">
						<input type="text" class="input-commnet-content" v-model.trim="commentCon" maxlength="100" placeholder="留下你的高见，一百字以内">
						<input type="button" @click="comment(1)" class="submit-comment cp" value="评论">
					</div>
				</div>
				<div class="hot-content">
					<ul class="hot-list">
						<li class="hot-item clearfix" v-for="(item,index) in commentList">
							<div class="hot-userphoto fl">
								<img :src="$Tool.headerImgFilter(item.imageurl)">
							</div>
							<div class="hot-wrap fl">
								<div class="hot-header clearfix">
									<h5 class="fl">{{item.username}}</h5>
									<p class="hot-fabulous fr cp" :class="{'likeActive':item.ifLike}" @click="handleFabulous(2,item.id,index)">
										<var class="hot-count">{{item.likeNum}}</var>
										<like :likeStatus="index==curLike?ifLike:0"></like>
									</p>
								</div>
								<div class="hot-body clearfix">
									<p class="hot-text">
										{{item.content}}
									</p>
									<!-- <span class="hot-open fr">展开全文</span> -->
								</div>
								<div class="hot-footer clearfix">
									<div class="fl">
										<span class="hot-time">{{$Tool.publishTimeFormat(item.commenttime)}}</span>
										<span class="hot-point">•</span>
										<span class="cp" @click='showReplyInput($event,item.douserid,item.id,index),commentConAdd = ""'>回复</span>-
										<span class="hot-reply cp" @click="handleFirstReply(item,index)">
											<var>{{item.replyCount}}</var>回复<i class="iconfont icon-down"></i>
										</span>
									</div>
									<span class="hot-report fr cp" @click="handleReport(2,item)">举报</span>
									<span class="hot-report fr cp"  v-if="item.douserid == userId" @click="deleteCommon(item.id,index,1)" >删除</span>
								</div>								
								<!-- 二级回复 -->
								<ul class="hot-list" v-if="item.replyShow">
									<li class="hot-item clearfix" v-for="(unit,sign) in replyList[index]">
										<div class="hot-userphoto fl">
											<img :src="$Tool.headerImgFilter(unit.imageurl)">
										</div>
										<div class="hot-wrap fl">
											<div class="hot-header clearfix">
												<h5 class="fl">{{unit.username}}</h5>
											</div>
											<div class="hot-body clearfix">
												<p class="hot-text">
													{{unit.content}}
												</p>
											</div>
											<div class="hot-footer clearfix">
												<div class="fl">
													<span class="hot-time">{{$Tool.publishTimeFormat(unit.commenttime)}}</span>
													<span class="hot-point">•</span>
													<span @click='showReplyInput($event,item.douserid,item.id,index),commentConAdd = unit.username'>回复</span>
												</div>
												<span class="hot-report fr cp"  v-if="unit.douserid == userId" @click="deleteCommon(unit.id,index,2,sign)" >删除</span>
											</div>
										</div>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
			<!-- <memberList v-else :list="listMember" :mes="proMes"></memberList> -->
		</div>
		<!-- 举报框 -->
		<div class="report-wrap mask" @click="cancleReport($event)" v-if="reportShow">
			<div class="report-body cc" @click="$event.stopPropagation()">
				<i class="iconfont icon-close fr" @click="cancleReport($event)"></i>
				<b class="rep-t">举报</b>
				<ul class="report-list">
					<li class="report-item" v-for="(item,index) in reportList" >
						<label :for="`reportInput_${index}`" class="report-label">{{item}}</label>
						<input type="radio" name="reportInput" :id="`reportInput_${index}`" v-model="reportreasion.type" :value="item">
					</li>
					<li>
						<p>举报描述：</p>
						<textarea name="reportInput" v-model.trim = "reportreasion.desc"></textarea>
					</li>
				</ul>
			<div class="ac" @click="handleSendReport">
				提交
			</div>
			</div>
		</div>
		<!-- 二/三级回复评论框 -->
		<div class="comment-writer-wrap" ref="test" v-show="isReplyInput">
			<input type="text" class="input-commnet-content" v-model.trim="replyCon" maxlength="100" placeholder="留下你的高见，一百字以内">
			<input type="button" @click="comment(2)" class="submit-comment" value="评论">
		</div>
	</div>
</template>

<script>
import config from '@/assets/configs/config'
import like from '@/components/like'
import QRCode from 'qrcode'
// import memberList from '@/components/common/memberList'
import listUtil from '@/utils/listUtil'
import userService from '@/services/userService'
import followService from '@/services/followService'
import praiseService from '@/services/praiseService'
import reportService from '@/services/reportService'
import articleService from '@/services/articleService'
import readHistoryService from '@/services/readHistoryService'
import articleFileService from '@/services/article_fileService'
import articleCommentService from '@/services/article_commentService'
import articleCollectService from '@/services/articleCollectService'
import messageService from '@/services/messageService'
import transmitService from '@/services/transmitService'

export default {
	components:{
		like,
	},
	data(){
		return {
			// badgeShow:false,
			sourceShow:false,
			reportToggle:true,
			reportShow:false,
			popMask:false,
			// noZan:false,
			// hasZan:false,
			// noComment:false,
			// hasComment:false,
			// noReply:false,
			// hasReply:false,
			// replyShow:false,
			collectToggle:{
				notcollect:true,
				collected:false
			},
			shareShow:false,
			inputToggle:true,
			ifLoadMore:false,
			userId:localStorage.id,
			id:0,//文章id =>article.id
			detailType:0,
			fileRoot:config.fileRoot+'/',
			focusState:false,
			article:{
				id:Number,
				title:"",
				content:"",
				author:Number,
				type:2,
				sourceurl:'',
				publishtime:"发布时间",
				publisharea:"发布地区",
			},
			artUser:{
				username:'',
				imageurl:'',
			},
			ArticleFile:[],
			// 评论列表
			commentList:[],
			// 回复评论列表，二维数组
			replyList:[],
			proFail1:false,
			proFail2:false,
			failMes1:"获取内容失败",
			failMes2:"获取评论失败",
			// 评论内容
			commentCon:'',
			// 回复内容
			replyCon:'',
			//三级回复@的用户名
			commentConAdd:'',
			//底部评论框状态切换
			ifCommentSwitch:false,
			//评论回复显隐切换
			ifReply:false,
			//回复评论的id
			replyCommentId:0,
			//回复评论人的id
			replyUserId:0,
			//回复评论人的关注状态
			replyUserFocusState:false,
			//指定评论数组中某条评论的索引值 //展开评论回复是顶部当前索引使用
			commentIndex:Number,
			//点赞
			curLike:0,
			//点赞动画
			ifLike:false,
			//评论删除
			ifDeleteCom:false,
			//是否收藏
			// ifCollect:false,
			//文章点赞量
			likeNum:0,
			//评论总量
			commentNum:0,
			//点赞状态
			likeStatus:false,
			//举报显隐
			ifReport:false,
			//二三级回复框显隐
			isReplyInput:false,
			//举报数组
			reportList:['淫秽色情','违法信息','营销广告','恶意攻击谩骂'],
			//显影分享
			ifShare:false,
			//评论加载分页
			pageNum1:1,
			//回复加载分页
			pageNum2:1,
     		audioSrc:[],
     		index:0,
     		iconShow:false,
     		icon:'icon-touting',
     		tag:false,
			//是否加载
			ifLoad:false,
			//加载锁
			lock:false,
			//load文字提示
			loadText:"正在加载",
			// 视频
			playerOptions : {
				// playbackRates: [0.7, 1.0, 1.5, 2.0], //播放速度
				// autoplay: false, //如果true,浏览器准备好时开始回放。
				// muted: false, // 默认情况下将会消除任何音频。
				// loop: false, // 导致视频一结束就重新开始。
				preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
				language: 'zh-CN',
				aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
				fluid: true, // 当true时，Video.jsplayer将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
				sources: [
					{
						type: "video/mp4",
						src: "" //url地址
					}
				],
				poster: "", //你的封面地址
				// width: document.documentElement.clientWidth,
				notSupportedMessage: '此视频暂无法播放，请稍后再试', //允许覆盖Video.js无法播放媒体源时显示的默认信息。
				controlBar: {
					timeDivider: false,
					durationDisplay: false,
					remainingTimeDisplay: false,
					fullscreenToggle: true //全屏按钮
				}
			},
			reportreasion:{
				type:'',
				desc:''
			},//"举报原因"
			reportType:0,//举报类型 1:文章，2:评论
			//转发，点赞列表
			listMember:[],
			//转发，点赞提示
			proMes:"",
			//转发、点赞，评论切换
			ifSwitchB:true,
			//当前
			current:1,
			replyobj:{},
			shareDesc:{
				href:'',
				title:'',
				content:'',
				thumbs:[]
			},
			isWechatCode:false
		}
	},
	mounted(){
		this.id = this.$route.query.id;
		this.detailType = this.$route.query.detailType || 0;
		this.init();
	},
	methods:{
		init(){
			if (!this.id) {
				this.$message({
		          message: '获取出错，请返回！',
		          center: true
		        });
				// this.$Tool.goBack();
				return;
			}
			this.ifLoad = true;
			//添加阅读记录
			readHistoryService.addReadHistory(this.id,(data)=>{});
			// if (resAddReadHistory && resAddReadHistory.status == "success") {
			// }
			//获取文章信息
			let resArticleDetail = articleService.getArticleById(this.id);
			if (resArticleDetail && resArticleDetail.status == "success") {
				this.article = resArticleDetail.record;
				/*if(!this.article.content){
					this.iconShow = false;
				}else{
					this.iconShow = true;
          let audioStr =  resArticleDetail.record.audio;
          let audioArr = audioStr.split(',');
          this.audioSrc = audioArr;
				}*/
				if(this.article.sourceurl == null) {
					this.sourceShow = false;
				}else{
					this.sourceShow = true;
				}
			} else {
				this.proFail1 = true;
			}

			//获取发布人信息
			let resUserInfo = userService.getUserById(this.article.author);
			if (resUserInfo && resUserInfo.status == "success") {
				this.artUser = resUserInfo.result.user;
			}
			// console.log(resUserInfo)
			// 是否关注发布人
			if (localStorage.getItem('token')) {
				followService.testFollow(this.article.author,(data)=>{
					if (data && data.status == "success") {
						if (data.result == 1) {
							this.focusState = true;
						} else {
							this.focusState = false;
						}
					}
				});
			}
			// 文章附件 图片
			if (this.article.type != 3) {
				articleFileService.getFileByArticle(this.article.id,(data)=>{
					if (data && data.status == "success") {
						if (this.article.type == 1) {
							this.ArticleFile = data.result.filelist;
						}else if(this.article.type == 2){
							this.playerOptions.sources[0].src = this.fileRoot + data.result.filelist[0].url;
							this.playerOptions.poster = this.fileRoot + data.result.filelist[0].thumbnail;
						}
					}
				});
			}
			//获取文章点赞量
			praiseService.getPraiseCount(this.id,1,(data)=>{
				if (data && data.status == "success") {
					this.likeNum = this.$Tool.numConvertText(data.result.count);
				}
			});
			//用户是否给文章点赞
			praiseService.testPraise(this.id,1,(data)=>{
				if (data && data.status == "success") {
					if (data.result == 1) {
						this.likeStatus = true;
					} else {
						this.likeStatus = false;
					}
				}
			});
			//获取评论数量
			articleCommentService.getArticleCommentCount(this.id,(data)=>{
				if (data.status == "success") {
					this.commentNum = this.$Tool.numConvertText(data.result.count);
					// if(this.commentNum == 0) {
					// 	this.badgeShow = false;
					// }else{
					// 	this.badgeShow = true;
					// }
				}
			});

			// console.log(resArticleCommentList)
			// console.log(this.commentList)
			//是否收藏
			articleCollectService.testCollect(this.id,(data)=>{
				if (data && data.status == "success") {
					if (data.result == 1 ) {
						this.collectToggle.notCollect = false;
						this.collectToggle.collected = true;
						// this.ifCollect = true;
					} else {
						// this.ifCollect = false;
						this.collectToggle.notCollect = true;
						this.collectToggle.collected = false;
					}
				}
			});
			//评论滚动近底部，自动加载 一屏1080
			this.loadComment();
			this.ifLoad = false;
		},
		// 弹出评论框
	    ended(){
	    	console.log(111);
	    },
	    handleAudio(){
	    	if(!this.tag){
	    		this.icon = "icon-ziyuanldpi";
	    		this.playerAudio();

	    		this.tag=true;
	    	}else{
	    		this.icon = "icon-touting";
	    		this.pauseAudio();
	    		this.tag=false;
	    	}
	    },
	    playerAudio(){
	    	let audios = document.getElementsByClassName("myAudios");
			let index = 0;
	    	function play() {
				var caudio = audios[index];
				if(!caudio){
					index =0;
					// play();
				}
				caudio.play();
				caudio.addEventListener("ended", function() {
					console.log("播放完毕")
					index ++;
					// play()
				});
			}
			play();
	    },
	    pauseAudio(){
	    	let audios = document.getElementsByClassName("myAudios");
	    	if(audios!==null){
	    		alert(audios.paused);
	    	}
	    },
		handleOpenInput(){
			this.textShow();
			// if(this.replyShow){
			// 	this.popMask = true;
			// }
		},
		// 关注--取消关注
		handleFocus(userId,type){
			/*
			type: 1文章发布人---2.评论人
			*/
			if(!localStorage.id){
				this.$Tool.loginPrompt();
				return;
			}
			followService.doFollow(userId, (data)=>{

				if(data && data.status == "success") {
					if(type == 1) {
						if(data.result == 1) {
							this.focusState = true;
							//给发布人发送消息
							messageService.sendMessage(userId, "focus", this.id, 1);
						}else {
							this.focusState = false;
						}
					}else {
						if(data.result == 1) {
							this.replyUserFocusState = true;
							// 给评论人发送消息
							messageService.sendMessage(userId, "focus", this.replyCommentId, 2);
						}else {
							this.replyUserFocusState = false;
						}
					}
				}else {
					// this.$vux.alert.show({
					// 	content:'关注失败，请重新关注'
					// })
				}
			});
		},
		// 点赞--取消点赞
		handleFabulous(type, itemid, index) {
			if(!localStorage.id) {
				this.$Tool.loginPrompt();
				return;
			}
			// 文章点赞
			if(type == 1) {
				let resDoPraise = praiseService.doPraise(this.id,1);
				if(resDoPraise && resDoPraise.status == "success") {
					if(resDoPraise.result.code == 1) {
						this.likeStatus = true;
						this.likeNum++;
						// 给发布人发送消息
						messageService.sendMessage(this.article.author, "like", this.id, 1);
					}else{
						this.likeStatus = false;
						this.likeNum --;
					}
				}
			}else{
				// 评论点赞
				let resDoPraise = praiseService.doPraise(itemid,2);
				if(resDoPraise && resDoPraise.status == "success") {
					// console.log(resDoPraise);
					if(resDoPraise.result.code == 1) {
						this.curLike = index;
						this.ifLike = true;
						this.commentList[index].likeNum ++;
						this.commentList[index].ifLike = true;
						// 给评论人发送消息
						messageService.sendMessage(this.replyUserId, "like", this.replyCommentId, 2);
					}else{
						this.curLike = index;
						this.ifLike = false;
						this.commentList[index].likeNum --;
						this.commentList[index].ifLike = false;
					}

					// if(resDoPraise.result.count <= 0){
					// 	this.noZan = false;
					// 	this.hasZan = true;
					// }else{
					// 	this.hasZan = false;
					// 	this.noZan = true;
					// }
				}
			}
		},
		/**
		 * 发布评论
		 * @param  type 1:评论 2：回复
		 */
		comment(type){
			// this.badgeShow = true;
			if(!localStorage.id){
				this.$Tool.loginPrompt();
				return;
			}
			let userId = localStorage.id;
			if(type == 1) {
				if(this.commentCon && this.$Tool.checkInput(this.commentCon)) {
					// 执行发送评论
					let resArticleComment = articleCommentService.articleComment(this.id,this.commentCon,userId,this.article.author,1);
					if(resArticleComment && resArticleComment.status == "success") {
						this.lock = false;
						this.pageNum1 = 1;
						this.loadComment();
						// setTimeout(()=>{
						// 	this.$vux.toast.show({
						// 		type:'success',
						// 		text: '发布成功'
						// 	});
						// },500);
						this.commentCon = "";
						this.commentNum++;
						// 给发布人发送消息
						messageService.sendMessage(this.article.author,"reply",this.id,1);
						return;
					}else{
						this.$message({
				          message: '评论失败，请重试！',
				          center: true
				        });
					}
				}else{
					this.$message({
			          message: '内容不合法，请修改后提交！',
			          center: true
			        });
				}
			}else if (type == 2){
				if (this.replyCon && this.$Tool.checkInput(this.replyCon)) {
					let comment = this.commentConAdd?(this.replyCon + " //@" + this.commentConAdd):this.replyCon;
					// 执行发送评论回复
					let resACommentReply = articleCommentService.articleComment(this.id,comment,userId,this.replyUserId,2,this.replyCommentId);
					if(resACommentReply && resACommentReply.status == "success") {
						/*setTimeout(()=>{
							this.$vux.toast.show({
								type:'success',
								text: '发布成功'
							});
						},500);*/
						this.replyCon = "";
						// this.commentConAdd = "";
						this.popMask = false;
						this.commentList[this.commentIndex].replyCount ++;
						// 给评论人发送消息
						this.loadReply();
						this.commentList[this.commentIndex].replyShow = true;
						messageService.sendMessage(this.replyUserId,'reply',this.replyCommentId,2);
						return;
					}else{
						this.$message({
				          message: '评论失败，请重试！',
				          center: true
				        });
					}
				}else{
					this.$message({
			          message: '内容不合法，请修改后提交！',
			          center: true
			        });
				}
				
			}
		},

		// 删除评论
		deleteCommon(itemid,index,type,sign){
			const thiz = this;
			this.$messageBox.confirm('确认删除评论？','提示',{
				type: 'warning',
	          	center: true
          	}).then(()=>{
          		let deleteData = articleCommentService.deleteArticleConmon(itemid);
          		if(deleteData && deleteData.status == "success") {
          			if(type == 1) {
						thiz.commentList.splice(index,1);
						thiz.commentNum --;
						/*if(thiz.commentList.length <= 0) {
							thiz.proFail2 = true;
							thiz.ifLoadMore = false;
							// thiz.badgeShow = false;
						}*/
					}else{
						thiz.replyList[index].splice(sign,1);
						thiz.commentList[thiz.commentIndex].replyCount --;
						// let resReplyList = articleCommentService.getReplyList(thiz.replyCommentId,1,10)
						/*if(resReplyList.recordPage.list.length <= 0){
							// thiz.noComment = true;
							// thiz.hasComment = false;
						}else{
							// thiz.hasComment = true;
							// thiz.noComment = false;
						}*/
					}
          		}
          	}).catch(()=>{

          	})
		},

		//收藏---取消收藏
		handleCollect(articleid){
			if (!localStorage.id ) { this.$Tool.loginPrompt(); return; }
			let resArticleCollect = articleCollectService.articleCollect(articleid);
			if (resArticleCollect && resArticleCollect.status == "success") {
				if (resArticleCollect.result == 1 ) {
					//给发布人发送消息
					messageService.sendMessage(this.article.author,"collect",this.id,1);
					this.collectToggle.notcollect = false;
					this.collectToggle.collected = true;
				} else {
					this.collectToggle.notcollect = true;
					this.collectToggle.collected = false;
				}
			}
		},
		/**
		 * 分享到第三方
		 * @return {[type]} [description]
		 */
		share(whi){
		    //获取文章标题,图片链接,内容
		    let reg = /[^\u4e00-\u9fa5]+/g,
		    	title = this.article.title,
		     	thumbs = '',
		     	content = this.article.content.replace(reg,"").substring(0,180);
		    //获取网页中内容的第一张图片
		    if (this.article.type == 3) {
				let temp = this.$Tool.extractImg(this.article.content,1);
				thumbs = temp[0];
			}else if(this.ArticleFile.length) {
				thumbs = [this.fileRoot + this.ArticleFile[0]['url']];
			}else{
				thumbs = [this.fileRoot + this.playerOptions.poster];
			}
			if (!thumbs) {
				thumbs = require('@/assets/images/logo-icon.png');
			}
			switch(whi){
				// qq空间接口的传参
				case 'qzone':window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + location.href+'?sharesource=qzone&title='+ title +'&pics='+ thumbs +'&summary='+ content);
				break;
				// 新浪微博接口的传参
				case 'sina':window.open('http://service.weibo.com/share/share.php?url=' + location.href+'?sharesource=weibo&title='+ title +'&pic='+ thumbs +'&appkey=1715625583');
				break;
				// qq好友接口的传参
				case 'qq':window.open('http://connect.qq.com/widget/shareqq/index.html?url='+location.href+'?sharesource=qzone&title='+ title +'&pics='+ thumbs +'&summary='+ content +'&desc=直击真相：多一个人看到，就少一个人受骗！');
				break;
				// 生成二维码给微信扫描分享
				case 'wechat':
				this.isWechatCode = !this.isWechatCode ;
				if (!this.isWechatCode) {
					return;
				}
				this.$nextTick(()=>{
					creatQRCode.call(this);
				}) 
				break;
				dafault:;
			}
			// 动态生成二维码
		    function creatQRCode(){ 
		      	// 生成的二维码内容，添加变量
				let canvas = this.$refs.QRCode;
		        QRCode.toCanvas(canvas, 'http://www.baidu.com', function (error) {
		        // if (error) console.error(error);
		        })
		    }
		    /*//qq空间接口的传参
		    if(whi=='qzone'){
		        window.open('https://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=' + location.href+'?sharesource=qzone&title='+ title +'&pics='+ thumbs +'&summary='+ content);
		    }
		    //新浪微博接口的传参
		    if(whi=='sina'){
		        window.open('http://service.weibo.com/share/share.php?url=' + location.href+'?sharesource=weibo&title='+ title +'&pic='+ thumbs +'&appkey=1715625583');
		    }
		    //qq好友接口的传参
		    if(whi == 'qq'){
		        window.open('http://connect.qq.com/widget/shareqq/index.html?url='+location.href+'?sharesource=qzone&title='+ title +'&pics='+ thumbs +'&summary='+ content +'&desc=直击真相：多一个人看到，就少一个人受骗！');
		    }
		    //生成二维码给微信扫描分享
		    if(whi == 'wechat'){
		        window.open('http://zixuephp.net/inc/qrcode_img.php?url=http://zixuephp.net/article-1.html');
		    }*/
		    
		},
		//首次回复
		handleFirstReply(item,commentIndex){
			this.replyUserId = item.douserid;	//回复评论人id
			this.replyCommentId = item.id; //回复评论的id
			this.commentIndex = commentIndex;//指定评论数组中某条评论的索引值
			if (this.replyList[commentIndex] === undefined) {
				this.loadReply();
			}
			this.$set(item,'replyShow',!item.replyShow);
			// this.$set(this.commentList[commentIndex],'replyShow',!this.commentList[commentIndex].replyShow);
			// this.replyShow = true;
			/*this.replyUserId = replyUserId;	//回复评论人id
			this.replyCommentId = commentid; //回复评论的id
			this.commentIndex = commentIndex;//指定评论数组中某条评论的索引值
			//展开评论回复是顶部当前索引使用
			// 是否关注发布人
			// debugger;
			this.replyobj = this.commentList[commentIndex];
			if(this.replyobj.likeNum <= 0) {
				this.noZan = false;
				this.hasZan = true;
			}else{
				this.noZan = true;
				this.hasZan = false;
			}
			if(localStorage.getItem('token')){
				let resTestFolow = followService.testFollow(replyUserId);
				if(resTestFolow && resTestFolow.status == "success"){
					if(resTestFolow.result == 1){
						this.replyUserFocusState = true;
					}else{
						this.replyUserFocusState = false;
					}
				}
			}*/
			// 获取文章评论回复列表
		},

		//二级三级回复
		/*handleAllReply(userName){
			this.textShow();
			this.popMask = true;
			// this.popList.placeholder = "回复 "  + userName + ":"
			this.commentConAdd = " //@" + userName;
		},*/

		// 关闭回复框
		// handleCloseRelpy(){
		// 	this.replyShow = false;
		// },

		// 点击消息滚动
		// handleComment(){
		// 	let dis = $(".detail").scrollTop() + $(".article-change").offset().top -100;
		// 	$(".detail").animate({scrollTop:dis},100);
		// 	// console.log(dis);
		// },

		/**
		 * 举报
		 * @param  Number type 举报类型 1:文章，2:评论
		 * @return {[type]}      [description]
		 */
		handleReport(type,item){
			this.reportShow = true;
			this.popMask = true;
			this.reportType = type;
			this.replyobj = item;
		},

		/**
		 * 提交举报
		 * @return {[type]}      [description]
		 */
		handleSendReport(){
			/*reportInfo:{
				reporttime:'',//"举报时间" ,
				itemid:'',//"对象id",
				reportuserid:'',//"被举报人id",
				type:'',//"类型"  1.文章举报
			},*/
			let reason = this.reportreasion;
			if(reason.type || reason.desc){
				let reportInfo;
				if (this.reportType === 1) {
					reportInfo = {
						type:1,
						itemid:this.id,
						reportuserid:this.article.author,
						reportreasion:reason.type + reason.desc
					};
				}else if (this.reportType === 2){
					reportInfo = {
						type:2,
						itemid:this.replyobj.id,
						reportuserid:this.replyobj.douserid,
						reportreasion:reason.type + reason.desc
					};										
				}
				// console.log(reportInfo)
				let res = reportService.doReport(reportInfo);
				if (res && res.status === "success") {
					this.$vux.alert.show({
					  content:'感谢您的反馈，我们会着实核查！',
					})			
					this.reportShow = false;
					this.popMask = false;
					this.reportreasion = "";
				}else{
					this.$vux.alert.show({
					  content:'提交失败，请稍后再试！',
					})
				}
			} else {
				this.reportShow = false;
				this.popMask = false;
				// this.reportList.show = false;
			}
		},
		cancleReport(e){
			this.reportShow = false;
			e.stopPropagation();
		},
		// 个人中心所能看到的switch
		handleSwitch(v){;
			if(v == 1) {
				this.ifSwitchB = true;
				this.current = 1;
				return;
			}
			else if(v == 2) {
				this.ifSwitchB = false;
				this.current = 2;
				let res = transmitService.getTransmitList(this.id,1,10);
				if (res && res.status == "success") {
					this.listMember = res.recordPage.list;
				}
				if(this.listMember.length == 0){
					this.proMes = "还没有人转发哦"
				}
				return;
			}
			else {
				this.ifSwitchB = false;
				this.current = 3;
				let res = praiseService.getPraiseList(this.id,1,1,10);
				if (res && res.status == "success") {
					this.listMember = res.recordPage.list;
				}
				if(this.listMember.length == 0){
					this.proMes = "还没有人点赞哦"
				}
				return;
			}
		},

		/*----------------加载-函数---------------------*/
		// 加载评论
		loadComment(){
			// 获取文章一级评论列表
			this.ifLoadMore = true;
			let resArticleCommentList = articleCommentService.getArticleCommentPage(this.id, this.pageNum1, 10);
			if(resArticleCommentList && resArticleCommentList.status == "success") {
				if(this.pageNum1 == 1) {
					this.commentList = [];
				}
				listUtil.appendList(this.commentList,resArticleCommentList.list.list);
				listUtil.asyncSetListPropty(resArticleCommentList.list.list,(item)=>{
					// 获取文章一级评论人信息
					let resUserInfo = userService.getUserById(item.douserid);
					if (resUserInfo && resUserInfo.status == "success") {
						this.$set(item, "imageurl", resUserInfo.result.user.imageurl);
						this.$set(item, "username", resUserInfo.result.user.username);
					}
					// 获取文章一级评论回复数量
					let resGetReplyCount = articleCommentService.getReplyCount(item.id);
					if(resGetReplyCount && resGetReplyCount.status == "success") {
						this.$set(item, 'replyCount', resGetReplyCount.result.count);
					}
					// 获取文章一级评论点赞数
					let resGetPraiseCount = praiseService.getPraiseCount(item.id,2);
					if(resGetPraiseCount && resGetPraiseCount.status == "success") {
						this.$set(item,"likeNum",resGetPraiseCount.result.count);
					}
					//用户是否给文章一级评论点赞
					let resTestPraise = praiseService.testPraise(item.id,2)
					if (resTestPraise && resTestPraise.status == "success") {
						if (resTestPraise.result == 1) {
							this.$set(item,"ifLike",true);
						} else {
							this.$set(item,"ifLike",false);
						}
					}
				});
				if (this.commentList.length <= 10){
					this.pageNum1 ++;
				}
				// if (this.commentList.length == 0) {
				// 	this.lock = true;		
				// 	this.proFail2 = true;
				// 	this.failMes2 = "暂无评论，来抢第一个沙发吧";
				// 	this.ifLoadMore = false;
				// } else if (this.commentList.length < 10 || this.commentNum == this.commentList.length ) {
				// 	this.lock = true;		
				// 	this.ifLoadMore = true;
				// 	this.proFail2 = false;
				// 	this.loadText = "已加载全部";
				// } else {
				// 	this.pageNum1 ++;
				// }
			} else {
				this.proFail2 = true;
			}
		},

		// 加载回复
		loadReply() {
			// 获取文章评论回复列表
			let resReplyList = articleCommentService.getReplyList(this.replyCommentId,1,10)
			if (resReplyList && resReplyList.status == "success") {
				let temp = resReplyList.recordPage.list;
				//获取回复人信息
				for (var i = 0,len = temp.length; i < len; i++) {
					let resUserInfo = userService.getUserById(temp[i].douserid);
					if (resUserInfo && resUserInfo.status == "success") {
						temp[i].username = resUserInfo.result.user.username;
						temp[i].imageurl = resUserInfo.result.user.imageurl;
					}
				}
				this.replyList[this.commentIndex] = temp;
			}
			/*if(resReplyList.recordPage.list.length <= 0){
				// this.noReply = true;
				// this.hasReply = false;
				// this.noComment = true;
				// this.hasComment = false;
			}else{
				// this.hasReply = true;
				// this.noReply = false;
				// this.hasComment = true;
				// this.noComment = false;
			}*/
		},
		// show reply input
		showReplyInput(e,replyUserId,commentid,commentIndex){
			this.replyUserId = replyUserId;	//回复评论人id
			this.replyCommentId = commentid; //回复评论的id
			this.commentIndex = commentIndex;//指定评论数组中某条评论的索引值
			this.isReplyInput = true;
			if($(e.target).parent().parent().next("comment-writer-wrap").length==0){
				$(".hot-footer").find("comment-writer-wrap").remove();
				$(e.target).parent().parent('.hot-footer').after(this.$refs.test);
			}
		},
	},
	watch:{
		'$route'(to,from){
			this.id = to.query.id;
		},
		id(){
			// debugger
			this.ifLoad = true;
			setTimeout(()=>{
				this.init();
				this.ifLoad = false;
			},200)
		}
	},
	// beforeRouteEnter(to,from,next){
	// 	next(vm=>{
	// 		vm.id = to.query.id;	
	// 		vm.detailType = to.query.detailType || 0;
	// 	})
	// }
}
</script>

<style lang="less" scoped>
@import url(../assets/styles/base.less);
	.mask-current{
		position: absolute;
		width:100%;
		height:100%;
		background: #fafafa;
	}
	.detail{
		position: relative;
		height: calc(100% - 1.5rem);
		overflow: hidden;
		overflow-y: auto;
		padding: 0 .3rem .88rem .3rem;
		background-color: #fff;
		.content-wrap{
			.article-title{
        padding-top: .4rem;
        padding-bottom: .2rem;
				font-size: .42rem;
				line-height: .58rem;
				letter-spacing: .02rem;
				overflow: hidden;
				text-overflow:ellipsis;
				display:-webkit-box; 
				-webkit-box-orient:vertical;
				-webkit-line-clamp:3; 
			}
			.publisher{
				padding: .45rem 0;
				.uphoto{
					width: 1.2rem;
					height: 1.2rem;
					border-radius: 50%;
					margin-right: .2rem;
				}
				.article-time-name{
					color: #aaa;
					// width: calc(100% - 2.78rem);
					margin-right: .22rem;
					.uname{
						padding-top: .25rem;
						font-size: .32rem;
					}
					.utime{
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						font-size: .24rem;
						padding-top: .2rem;
						color: #999;

					}
				}
				.focus{
					width: 1.16rem;
					height: .56rem;
					line-height: .56rem;
					margin-top: .4rem;
					text-align: center;
					color: #fff;
					border-radius: .1rem;
					background-color: #f85959;
					border: .02rem solid transparent;
				}
				.btnActive{
					background-color: #fafafa;
					border: .02rem solid #bbb;
					color: #bbb;
				}
			}
			.content{
				padding-bottom: .45rem;
				.article-content{
					// padding-bottom: .4rem;
					line-height: .5rem;
					p{
            font-size: .34rem;
						line-height: .5rem !important;
						margin-bottom: .3rem !important;
					}
					img{
						display: inline-block;
						width: 100%;
						margin-bottom: .4rem !important;
						border-radius: .08rem;
						padding: .04rem;
						border: .02rem solid @borderColor;
						text-align: center;
					}
				}
				.phone-content{
					// padding-bottom: .4rem;
					.phone-img{
						width: 100%;
						.tel-img{
							width: 32.5%;
							height: 2.1rem;
							margin-right: .086rem;
							margin-bottom: .086rem;
							&:nth-child(3n){
								margin-right: 0;
							}
							img{
								display: block;
								width: 100%;
								height: 100%;
								object-fit: cover;
							}
						}
					}
				}
				.see-text{
					letter-spacing: .02rem;
					line-height: .5rem;
					color: #999;
				}

			}
			.keywords{
				margin: .6rem 0;
				label{
					color: #1674e9;
				}
				span{
					font-size: .24rem;
					padding: .13rem .22rem;
					margin-right: .2rem;
					border-radius: .25rem;
					color: #999;
					background-color: #f5f7f9;
				}
			}
		}
	}
	.article-change{
		border-bottom:.02rem solid @borderColor;
		padding-bottom: .56rem;
		// display: flex;
		// justify-content: center;
		text-align: right;
		.item{
			display: inline-block;
			width: 60px;
			// height: .64rem;
			// line-height: .64rem;
			// margin-right: .86rem;
			// border: .02rem solid #d9d9d9;
			// border-radius: .3rem;
			text-align: center;
			&:last-child{
				margin-right: 0;
			}
			.iconfont{
				font-size: .32rem;
				// color: #222;
				padding-right: .03rem;
			}
			span{
				vertical-align: top;
				font-size: .24rem;
				color: #222;
			}
		}
	}
	.likeActive{
		color: #f40;
	}
	.article-menu{
		line-height: .8rem;
		background-color: #fff;
		border-bottom: .02rem solid @borderColor;
		display: flex;
		li{
			flex: 1;
			text-align: center;	
		}
		.current{
			border-bottom: .04rem solid #f85959;
			color: #f85959;
		}
	}
	.comment-all-num {
	    line-height: 50px;
	    margin-left: 5px;
	}
	.all-num {
	    font: 22px/24px Georgia;
	    color: #f40;
	}
	.myphoto {
	    width: 40px;
	    height: 40px;
	    border-radius: 50%;
	}
	.comment-writer-wrap {
	    position: relative;
	    vertical-align: middle;
	}
	.comment-wrap input {
	    line-height: 35px;
	    height: 35px;
	}
	.input-commnet-content {
	    border: 1px solid #888;
	    width: 100%;
	    text-indent: 6px;
	}
	.submit-comment {
	    position: absolute;
	    width: 100px;
	    top: 0;
	    right: 0;
	    background: #333;
	    color: #fff;
	}
	.comment-wrap{
		padding-top: .56rem;
		.hot-content{
			padding-top: .56rem;
			.hot-item{
				margin-bottom: .5rem;
				.hot-userphoto{
					width: .66rem;
					height: .66rem;
					margin-right: .25rem;
					border-radius: 50%;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
			}
			.hot-wrap{
				width: calc(100% - .91rem);
				.hot-header{
					height: .66rem;
					line-height: .66rem;
					h5{
						color: #3e609e;
					}
					.iconfont{
						font-size: .4rem;
						color: #999;
					}
					.hot-count{

						color: #999;
						margin-right: 2px;
						vertical-align: top;
					}
				}
				.hot-body{
					position: relative;
					padding-top: .1rem;
					.hot-text{
						line-height: .45rem;
						// overflow:hidden; 
						// text-overflow:ellipsis;
						// display:-webkit-box; 
						// -webkit-box-orient:vertical;
						// -webkit-line-clamp:4; 
					}
					.hot-open{
						position: absolute;
						right: 0;
						background-color: #fff;
						bottom: -.08rem;
						line-height: .5rem;
						font-size: .24rem;
						color: #1674e9;
					}
				}
				.hot-footer{
					line-height: .4rem;
					font-size: .24rem;
					padding: .2rem 0;
					.hot-time{
						color: #999;
					}
					.hot-point{
						padding: 0 .08rem;
						color: #999;
					}
					.hot-reply{
						var{
							margin-right:2px;
						}
					}
					.hot-report{
						margin-left: 5px;
						color: #999;
					}
				}
			}
		}
	}
	.icon-collected{
		color: #fc0;
	}
	.icon-not-collection{
		color: #222;
	}
	.article-tabBar {
		width: 100%;
		height: .88rem;
		position: fixed;
		z-index: 566;
		left: 0;
		bottom: 0;
		padding: 0 .3rem;
		background-color: #fafafa;
		border-top: .02rem solid #d8d8d8;
		.article-input {
			width: 3rem;
			height: .56rem;
			position: relative;
			line-height: .56rem;
			margin-top: .16rem;
			padding-left: .26rem;
			padding-right: .13rem;
			border: .02rem solid @borderColor;
			border-radius: .3rem;
			background-color: #f3f4f5;
			.icon-comment{
				padding-right: .14rem;
				color: #222;
			}
			span{
				font-size: .24rem;
				color: #222;
			}
			.icon-biaoqing{
				position: absolute;
				right: .13rem;
				font-size: .36rem;
				color: #9fa7b3;
			}
		}
		.article-icon{
			display: flex;
			line-height: .88rem;
			.item{
				margin-right: .56rem;
				&:last-child{
					margin-right: 0;
				}
				.iconfont{
					font-size: .4rem;
					color: #222;
				}
			}
			.msg-item {
				position: relative;
				.iconfont{
					position: absolute;
					left: -.56rem;
				}
				.badge{
					display: inline-block;
					position: absolute;
					top: .12rem;
					left: -.42rem;
					line-height: .3rem;
					padding: 0.02rem .1rem;
					border-radius: .18rem;
					font-size: .2rem;
					background-color: @mainColor;
					transform: scale(.6);
					color: #fff;
				}
			}
				
		}
	}
	.share-wrap{
		padding: .53rem .2rem;
		text-align: center;
		.share-text{
			margin-bottom:5px;
			&::before,&::after{
				display: inline-block;
				position: relative;
				top: -3px;
				content:"";
				width: 40%;
				border-top: 1px solid #ddd;
				margin:0 10px;
			}			
		}
		.share-list{
			position: relative;
			background-color: #666;
			display: inline-block;
			color: #fff;
			padding: 5px;
			border-radius: 50%;
			margin:0 5px;
			// &:last-child{
			// 	margin-right: 0;
			/* li{
				} */
				/* .share-img{
					margin: 0 auto;
					width: 1.2rem;
					height: 1.2rem;
					border-radius: 50%;
					text-align: center;
					background-color: #fff;
					img{
						display: inline-block;
						width: .75rem;
						height: .75rem;
						margin-top: .225rem;
				
					}
				}
				.share-desc{
					display: block;
					padding-top: .2rem;
					font-size: .24rem;
					color: #222;
				} */
			// }
		}
		.share-btn{
			width: 100%;
			height: 1rem;
			line-height: 1rem;
			text-align: center;
			font-size: .32rem;
			background-color: #f6f6f6;
		}
	}
	.reply-wrap{
		height: 100vh;
		border-radius: .3rem .3rem 0 0;
		background-color: #fff;
		.reply-header{
			position: relative;
			left: 0;
			top: 0;
			height: .89rem;
			line-height: .89rem;
			padding: 0 .36rem;
			text-align: center;
			border-bottom: .02rem solid @borderColor;
			.iconfont {
				position: absolute;
				left: .36rem;
				font-size: .45rem;
				font-weight: 700;
			}
			span{
				letter-spacing: .02rem;
				font-size: .32rem;
			}
		}
		.reply-body{
			width: 100%;
			height: calc(100vh - .89rem);
			overflow-y: auto;
			// overflow: auto;
			// padding: .32rem .3rem;
			padding: .32rem .3rem 1rem .3rem;
			.reply-container{
				width: 100%;
				&:first-child{
					border-bottom: .02rem solid @borderColor;
				}
				.reply-box{
					margin-bottom: .5rem;
				}
				.reply-img{
					width: .64rem;
					height: .64rem;
					border-radius: 50%;
					margin-right: .25rem;
					img{
						display: block;
						width: 100%;
						height: 100%;
						border-radius: 50%;
					}
				}
				.reply-content{
					width: calc(100% - .89rem);
					.header{
						.header-desc{
							display: inline-block;
							font-size: .24rem;
							h4{
								font-weight: normal;
								color: #406599;
								// padding-bottom: .13rem;
								line-height: .5rem;
							}
							span{
								color: #979fac;
							}
						}
						.reply-fabulous{
							color: #979fac;
							span{
								font-size: .24rem;
								margin-right: -.1rem;
							}
							.iconfont{
								font-size: .36rem;
							}
							.icon-weizan{
								color: #979fac;
							}
						}
						.header-focus{
							font-weight: 700;
							font-size: .24rem;
							line-height: .5rem;
							color: #f96565;
						}
					}
					.reply-desc{
						margin: .26rem 0;
						p{
							line-height: .45rem;
						}
					}
					.reply-time-report{
						font-size: .24rem;
						color: #979fac;
					}
					.reply-time-delete{
						font-size: .24rem;
						.reply-point{
							color: #666;
							padding: 0 .15rem;
						}
					}
					.reply-footer{
						// padding: .26rem 0;
						height: 1rem;
						line-height: 1rem;
						.reply-footer-wrap{
							.reply-list{
								max-width: 1.68rem;
								height: .48rem;
								margin-top: .26rem;
								margin-right: .18rem;
								overflow: hidden;
								.reply-item{
									float: left;
									width: .48rem;
									height: .48rem;
									margin-right: .08rem;
									border-radius: 50%;
									img{
										display: block;
										width: 100%;
										height: 100%;
										border-radius: 50%;
									}
								}	
							}
							.reply-footer-desc{
								font-size: .24rem;
								color: #222;
								.iconfont{
									font-size: .3rem;
								}
							}
						}
						.reply-fabulous{
							color: #979fac;
							span{
								font-size: .24rem;
								margin-right: -.1rem;
							}
							.iconfont{
								font-size: .36rem;
							}
							.icon-weizan{
								color: #979fac;
							}
						}
					}

				}
			}
			.reply-discuss{
				line-height: .8rem;
			}
			.isDiscuss{
				line-height: .8rem;
				padding-left: .89rem;
			}
		}
	}
	.report-wrap{
		.report-body{
			background: #fff;
		    width: 480px;
		    max-height: 600px;
		    padding: 15px;
	        border-radius: 10px;
			 .report-item{
			 	position: relative;
			 	height: 40px;
			    line-height: 40px;
			 	// border-bottom: 1px solid #eee;
			 }
		}
		input[type=radio] {
		    float: right;
		    position: relative;
		    top: 10px;
		    width: 15px;
		    height: 15px;
		    border: 2px solid #999;
		}
		input[type=radio]:checked{
			border: 2px solid #eee;
			background: red;
		    box-shadow: 0 0 4px 1px red;
		}
		textarea{
			margin-top: 10px;
			width:100%;
			min-height: 100px;
			border: 1px solid #bbb;
			border-radius:6px;
		}
		.report-list {
		    padding: 10px 15px;
		}
	}
	.pop-mask{
		display: block;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
    	z-index: 502;
		tap-highlight-color: rgba(0, 0, 0, 0);
		transition: opacity 400ms

	}
	.video-js .vjs-big-play-button{
		width: 2em;
		height: 2em !important;
	    font-size: 2.8em;
		border-radius: 50%;
		margin: 0 !important;
		transform: translate(-50%,-50%);
	}
	.lg-preview-title{
		display: none !important;
	}
	.loveCiew{
		line-height: 30px;
		text-indent: 2em;
		color:#f36767;
	    margin-bottom: 10px;
	}
	.red{
		color:#f00;
		font-weight: 600;
	}
	.qr-code {
	    position: absolute;
	    top: -45%;
	    right: 30px;
	}
</style>

<style scoped>
	.article-content >>> p{
		line-height: .5rem !important;
		margin-bottom: .3rem !important;
	}
	.article-content >>> p img{
		display: inline-block;
		width: 100%;
		border-radius: .08rem;
		padding: .04rem;
		border: .02rem solid #e8e8e8;
		text-align: center;
	}
</style>	
