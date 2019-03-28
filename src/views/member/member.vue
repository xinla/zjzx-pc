<template></template>
<script>
import userService from '@/services/userService'
import config from '@/assets/configs/config'

const agency = config.successServer + '/zjzx-system/three/getThreeInfo'
const agencyHttps = config.successServer + '/zjzx-system/three/getThreadInfoHttps'

export default {
	mounted(){
		var _this = this,
			hash = location.hash,
			state = hash.substring(hash.lastIndexOf('zjzx'),hash.lastIndexOf('tion') + 4);
			// console.log(hash)
			// console.log(state)
		if (state == 'zjzxQQAuthorization') {
			let access_token = hash.substring(hash.indexOf('=') + 1,hash.indexOf('&'));
				// redirectURI = encodeURIComponent('http://zjzx.xyz/member'),
			 	// authorizationCode = this.$route.query.code,
			 	// openid = '';
		 	// 用户成功授权初始获得（进入）：http://graph.qq.com/demo/index.jsp?code=9A5F************************06AF&state=test
			// 根据authorizationCode获取access_token
			// 返回参数"access_token= **********&expires_in=***&refresh_token=**********"
			/*if (authorizationCode && !access_token) {
				location.href = "https://graph.qq.com/oauth2.0/token?grant_type=authorization_code  &client_id=" + appid + "&client_secret="+ appkey + "&redirect_uri=" + redirectURI + "&code=" + authorizationCode;
			}*/

			/**
			 * http://zjzx.xyz/#/login?#access_token=5B4C881C174FD8CD63C6DD601946F08A&expires_in=7776000&state=zjzxQAuthorization
			 * 根据access_token获取openid和unionid
			 * https://graph.qq.com/oauth2.0/me?access_token=5B4C881C174FD8CD63C6DD601946F08A&unionid=1
			 * @return callbackc ( {"client_id": "**********", "openid": "**********","unionid":***********} )
			 * callback( {"client_id":"101532474","openid":"DEF306ECDC61C9FBA8BFB342A6DCB588","unionid":"UID_693CF9DDB9603AF9B5D8CF932406B48E"} );
			 * client_id即为appid
			 * openid即为我们要获取到的openid值
			 * unionid即为我们要获取到的unionid值
			 */
			$.ajax({
				url:`https://graph.qq.com/oauth2.0/me?access_token=${access_token}&unionid=1`, 
				type:"GET",
				dataType:"jsonp", 
				jsonpCallback:'callback',
				success(data){
					/**
					 * 根据openid获取openid
					 * https://graph.qq.com/user/get_user_info?access_token=5B4C881C174FD8CD63C6DD601946F08A&oauth_consumer_key=101532474&openid=DEF306ECDC61C9FBA8BFB342A6DCB588
					 * @param  {[type]} access_token [description]
					 * @return {nickname:"用户的昵称",figureurl_qq_1:"用户不同尺寸的QQ头像url",gender:"用户性别"}
					 * { "ret": 0, "msg": "", "is_lost":0, "nickname": "风安•辛幸", "gender": "男", "province": "安徽", "city": "合肥", "year": "1995", "constellation": "", "figureurl": "http:\/\/qzapp.qlogo.cn\/qzapp\/101532474\/DEF306ECDC61C9FBA8BFB342A6DCB588\/30", "figureurl_1": "http:\/\/qzapp.qlogo.cn\/qzapp\/101532474\/DEF306ECDC61C9FBA8BFB342A6DCB588\/50", "figureurl_2": "http:\/\/qzapp.qlogo.cn\/qzapp\/101532474\/DEF306ECDC61C9FBA8BFB342A6DCB588\/100", "figureurl_qq_1": "http:\/\/thirdqq.qlogo.cn\/qqapp\/101532474\/DEF306ECDC61C9FBA8BFB342A6DCB588\/40", "figureurl_qq_2": "http:\/\/thirdqq.qlogo.cn\/qqapp\/101532474\/DEF306ECDC61C9FBA8BFB342A6DCB588\/100", "is_yellow_vip": "0", "vip": "0", "yellow_vip_level": "0", "level": "0", "is_yellow_year_vip": "0" }
					 *
					 */
					let param = {
						access_token,
						"oauth_consumer_key":data.client_id,
						"openid":data.openid
					}
					let params = {
						url:"https://graph.qq.com/user/get_user_info",
						paramStr:JSON.stringify(param)
					}
					$.post(agency,params,function(info){
						// console.log(data);
						/*{
							client_id:"101532474"
							openid:"DEF306ECDC61C9FBA8BFB342A6DCB588"
							unionid:"UID_693CF9DDB9603AF9B5D8CF932406B48E"
						}*/
						let userparams = {
							qq_openid:data.openid,//:"qq标识",
							qq_unionid:data.unionid,//qq_多应用唯一标识
							qq_nikname:info.nickname,//:"qq昵称",
							qq_image:info.figureurl_1//:"qq头像地址"
						}
						// console.log(userparams)
						_this.$store.dispatch('loginByQQ', userparams)
					});
				}
			})
			return;
		}
		if (state == 'zjzxWechatAuthorization') {
			/**
			 * 进入地址：http://www.zjzx.xyz/#/member?code=061Lz3yW1dc6xZ0h8jwW1xCayW1Lz3yi&state=zjzxWechatAuthorization
			 * 通过code获取access_token
			 * 请求地址：https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxa13e1618061e3e39&secret=f85d6f1ffac38ffb059f5a24f7d09638&code=061Lz3yW1dc6xZ0h8jwW1xCayW1Lz3yi&grant_type=authorization_code
			 * @return 
			 * {"access_token":"16_DQgpZ-iQehrzMRaqoRaeUm2EPQ1A79IDm_bimfg_T4ozTeJgkpGpdJyTEud2RmzWr7grn69-m44Uu0MuAoE8Pg","expires_in":7200,"refresh_token":"16_YAYY4iwrMZkhMNr4cq3njLbp4_jPYx5zC_2uJ9P7LClXE1nvC_MegNB7NlwH9ouqqkYrsn7O6lkkbZg8j3rWnw","openid":"oyn3p5iZy_H-zSWbsxLAKDS8CjV0","scope":"snsapi_login","unionid":"oU8OS0dTFAaCqShxi4OcakwV5QKI"}
			 */
			let param = {
				appid:'wxa13e1618061e3e39',
				secret:'f85d6f1ffac38ffb059f5a24f7d09638',
				code:hash.substring(hash.indexOf('=') + 1,hash.indexOf('&')),
				grant_type:'authorization_code'
			}
			let params = {
				url:"https://api.weixin.qq.com/sns/oauth2/access_token",
				paramStr:JSON.stringify(param)
			}
				// console.log(_params)

			$.post(agency,params,function(data){
				/**
				 * 获取用户个人信息（UnionID机制）
				 * https://api.weixin.qq.com/sns/userinfo?access_token=16_DQgpZ-iQehrzMRaqoRaeUm2EPQ1A79IDm_bimfg_T4ozTeJgkpGpdJyTEud2RmzWr7grn69-m44Uu0MuAoE8Pg&openid=oyn3p5iZy_H-zSWbsxLAKDS8CjV0
				 * @return 
				 * {"openid":"oyn3p5iZy_H-zSWbsxLAKDS8CjV0","nickname":"君","sex":1,"language":"zh_CN","city":"Chizhou","province":"Anhui","country":"CN","headimgurl":"http:\/\/thirdwx.qlogo.cn\/mmopen\/vi_32\/Q0j4TwGTfTIXX4hFhU2RMz3X2jpODHicdoJqJ5EVPz7TJjp4zN3WvpZPotA8kYv1fiafjlicEyD1icqhXtSaDZKSJA\/132","privilege":[],"unionid":"oU8OS0dTFAaCqShxi4OcakwV5QKI"}
				 */
				let _param = {
					access_token:data.access_token,
					openid:data.openid
				}
				let _params = {
					url:"https://api.weixin.qq.com/sns/userinfo",
					paramStr:JSON.stringify(_param)
				}
				// console.log(_params)
				$.post(agency,_params,function(info){
					let userparams = {
						wx_openid:info.openid,//:"微信标识",
						wx_nikname:info.nickname,//:"微信昵称",
						wx_image:info.headimgurl,//:"微信头像地址"
						wx_unionid:info.unionid,//:"微信uid"
					}
					// console.log(userparams)
					_this.$store.dispatch('loginByWx', userparams)
				})
			});
			return;
		}
		/**
		 * sina
		 * http://www.zjzx.xyz/#/member?state=zjzxSinaAuthorization&code=3ffce78a8d582ff8f9401560efc46c5a
		 * 通过code获取access_token
		 * https://api.weibo.com/oauth2/access_token?client_id=273153298&client_secret=88090437f53685a2c4ea967a9f65af7a&grant_type=authorization_code&redirect_uri=http://www.zjzx.xyz/#/member&code=3ffce78a8d582ff8f9401560efc46c5a
		 */
		if (state == 'zjzxSinaAuthorization') {

			let _param = {
				'client_id':'273153298',
				'client_secret':'88090437f53685a2c4ea967a9f65af7a',
				'grant_type':'authorization_code',
				'redirect_uri':'http://www.zjzx.xyz/#/member',
				'code':hash.substring(hash.lastIndexOf('=') + 1)
			}
			let _params = {
				url:"https://api.weibo.com/oauth2/access_token",
				paramStr:JSON.stringify(_param)
			}
			// console.log(_params)
			$.post(agencyHttps,_params,function(data){
			// debugger
			// https://api.weibo.com/2/users/show.json?access_token=2.00aJfJtG03eHUScc4208a39aT64juB&uid=6311798622
				let param = {
					access_token:data.access_token,
					"uid":data.uid
				}
				let params = {
					url:"https://api.weibo.com/2/users/show.json",
					paramStr:JSON.stringify(param)
				}
				// debugger;
					// console.log(param)
				$.post(agency,params,function(info){
					// console.log(info)
					let userparams = {
						xl_openid:info.id,//:"sina标识unid",
						xl_nikname:info.screen_name,//:"sina昵称",
						xl_image:info.profile_image_url,//:"sina头像地址"
						// xl_unionid:info.unionid,//:"sinauid"
					}
					// debugger;
					_this.$store.dispatch('loginByXl', userparams)
					// console.log(userparams)
				})
			})
		}
	}
}
</script>