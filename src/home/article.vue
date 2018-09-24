<template>
<div id="article">
<headbar></headbar>
     <div class="w_container">
        <div class="container">
            <div class="row w_main_row">
                
                <ol class="breadcrumb w_breadcrumb">
                  <li><router-link to="/">首页</router-link></li>
                  <li><router-link :to="{path:'articlelist',query:{type:article.type}}">{{article.type}}</router-link></li>
                  <li class="active">{{article.title}}</li>
                  <span class="w_navbar_tip">我们长路漫漫，只因学无止境。</span>
                </ol>
                
                <div class="col-lg-9 col-md-9 w_main_left">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <h2 class="c_titile">{{article.title}}</h2>
                            <p class="box_c"><span class="d_time">发布时间：{{article.post_time}}</span><span>编辑：<a href="mailto:wfyv@qq.com">{{article.user}}</a></span><span>阅读（{{reads}}）</span></p>
<!-- 段落 -->
                            <img :src="article.imgsrc" height="600" width="100%">
                            <ul class="infos">
                                      <p v-html="article.content"></p>
                            </ul>
<!-- 关键字 -->
                            <div class="keybq">
                                <p><span>关键字</span>：<a class="label label-default">个人博客</a><a class="label label-default">{{article.keyword}}</a></p>
                            </div>                        
                        </div>
                    </div>
                    <!-- 功能模块 -->
                    <div class="panel panel-default">
                      <div class="panel-body">
                        <div id="like"> 
                          <h4>{{article.artlike}}</h4>
                          <button class="btn btn-success" @click="like">点赞</button>
                        </div>
                      </div>
                    </div>
                    <!-- 评论模块 -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          <h3 class="panel-title">评论</h3>
                        </div>
                        <div class="panel-body">
                          <div class="panel panel-default" @mouseenter="enter(list.id)" v-if="list.replyid == 0"  v-for="list in article.pinlun">
                                <div class="panel-body pl"  style="background: #f4f4f4">
                                    <div class="media">
                                        <div class="media-left">
                                            <img class="media-object" :src="list.imgsrc"  height="50" width="50" style="border-radius: 100px;background: #000">
                                        </div>
                                        <div class="media-body Reviewdisplay">
                                            <h4 class="media-heading">{{list.nickname}}</h4>
                                            {{list.content}} ({{list.create_time}})
                                            <!-- 回复按钮 -->
                                            <span  :class="`btn btn-default h`+list.id" style="margin-left:50px;opacity: 0" @click="displayhuifu(list.id)">回复</span>
                                            <!-- 二级回复出现 -->
                                            <div class="tworeply">
                                             <div :class="`two`+list.id" style="display: none">
                                              <div class="form-group">
                                                    <textarea class="form-control" v-model="replycontent" rows="3"></textarea>
                                              </div>
                                              <div class="form-group">
                                                <button class="btn btn-default" @click="reply(list.id)">评论</button>
                                              </div>
                                             </div>
                                            </div>
                                            <!-- 二级评论 -->
                                            <div class="media" v-for="reply in list.reply" v-if="reply.replyid == list.id">
                                                <div class="media-left">
                                                    <img class="media-object" :src="reply.imgsrc"  height="50" width="50" style="border-radius: 100px;background: #000">
                                                </div>
                                                <div class="media-body">
                                                  <h4 class="media-heading">{{reply.nickname}}</h4>
                                                  {{reply.replycontent}} ({{reply.create_time}})
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                              </div>
                          </div>
                              <div class="form-group">
                                  <textarea class="form-control" v-model="pin" rows="3"></textarea>
                              </div>
                              <div class="form-group">
                                <button class="btn btn-default" @click="Review">评论</button>
                              </div>
                        </div>
                        
                    </div>
                </div>
<!-- 右面 -->
                <div class="col-lg-3 col-md-3 w_main_right">
                    <!-- 右面大部分 -->
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h3 class="panel-title">我热爱着</h3>
                      </div>
                      <div class="panel-body">
                           育碧游戏 彩虹六号，全境封锁
                      </div>
                    </div>
                    <!-- 右面小部分 -->
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h3 class="panel-title">友情链接</h3>
                      </div>
                      <ul class="list-group">
                                  <li class="list-group-item" v-for="list in url"><a :href="list.url" target="black">{{list.title}}</a></li>
                      </ul>
                    </div>
                    <!-- 右面小部分end -->
                </div>
            </div>
        </div>
    </div>
    <footbar></footbar>
</div>
</template>

<script>
	import header from '../components/header.vue'
  import footer from '../components/footer.vue'
  import {getLocalTime,suijishu} from '../../static/js/common.js'
export default {
	components:{
		"headbar":header,
    "footbar":footer
	},
	data(){
		return{
           myinfo:JSON.parse(localStorage.getItem("myinfo")),
           articleid:this.$route.query.id,
           article:{},
           pin:"",
           replycontent:"",
           reads:suijishu(),
           url:[{
            url:"http://guxuejian.top/wx/index.php/home/mp.html",
            title:'微信二次开发demo'
           },{
            url:"http://guxuejian.top/wxq/index.php/",
            title:'微信墙'
           },]
		}
	},
  created(){
    this.content() 
  },
	methods:{
       // 初始化
       content:function(){
          var _this = this;
          $.post(_this.api.api+"/Blog/public/index.php/api/Note/listPosts",{id:_this.articleid},function(res){
               res.data[0].post_time = getLocalTime(res.data[0].post_time)
               _this.article = res.data[0]
          },"json")
       },
       // 评论
       Review:function(){
          if(!this.myinfo){
            alert("亲先登录");
            this.$router.push({path:'/login'})
            return
          }
          $.post(this.api.api+"/Blog/public/index.php/api/Note/pinlun",{id:this.articleid,pin:this.pin,token:this.myinfo.token},res=>{
            if(res.errcode>0){
              alert(res.errmsg)
            }else{
              this.content()
              this.pin=""
            }
          },"json")
       },
       // 回复
       reply:function(replyid){
          if(this.replycontent==""){
            alert("回复内容为空");
            return;
          }
          $.post(this.api.api+"/Blog/public/index.php/api/Note/pinlun",
            {
              id:this.articleid,
              pin:this.pin,
              token:this.myinfo.token,
              replyid:replyid,
              replycontent:this.replycontent
            },
            res=>{
              if(res.errcode>0){
                alert(res.errmsg)
              }else{
                this.content()
                $(".two"+replyid).css("display",'none')
                this.replycontent=""

              }
          },"json")

       },
       // 功能 点赞次数
       like:function(){
           $.post(this.api.api+"/Blog/public/index.php/api/Note/like",
           {
            articleid:this.articleid,
           },
           res=>{
            if(res.code){
                 alert("你点过赞了呦");
                 return
            }
            this.content()
           })
       },
       // 显示回复框
       displayhuifu:function(replyid){
           if(!this.myinfo){
             alert("亲先登录");
             this.$router.push({path:'/login'})
             return
           }
           $(".two"+replyid).css("display",'block')
           $(".tworeply>div:not"+"("+'.two'+replyid+")").css("display",'none')
           return;
       },
       // 鼠标移入显示回复
       enter:function(plid){
           $(".h"+plid).css('opacity','1')
           $(".Reviewdisplay span:not"+"("+'.h'+plid+")").css('opacity','0')
           return;
       }
	},
	mounted:e=>{//钩子函数
  }

}
</script>

<style scoped>
  #like{
    width:100px;
    margin:0 auto;
    text-align: center;
  }
  a,a:hover,a:active{
  text-decoration:none;
}
</style>