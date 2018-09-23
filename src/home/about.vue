<template>
<div id="about">
<headbar></headbar>
     <div class="w_container">
        <div class="container">
            <div class="row w_main_row">
                <div class="col-lg-9 col-md-9 w_main_left">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          <h3 class="panel-title">关于我</h3>
                        </div>
                        <div class="panel-body">
                              <h3>程序员，石家庄职业技术学院的一名php专业学生。</h3>
                         </div>
                              <ul class="list-group">
                                  <li class="list-group-item" v-for="list in item"> {{list.title}}</li>
                              </ul>
                        </div>
                  
                    <!-- 关于网站 -->
                    <div class="panel panel-default">
                        <div class="panel-heading">
                          <h3 class="panel-title">关于网站</h3>
                        </div>
                        <div class="panel-body">
                              <h3>tp5后台接口，vue搭建页面，工具如下</h3>
                         </div>
                              <ul class="list-group">
                                  <li class="list-group-item" v-for="list in tools"> {{list.title}}</li>
                              </ul>
                        <div class="panel-body">
                              <h3>网站详细</h3>
                         </div>
                              <ul class="list-group">
                                  <li class="list-group-item">开发模块：登录注册，评论，点赞，文章发表，搜索</li>
                                  <li class="list-group-item">开发周期：两周</li>
                              </ul>
                      </div>
                  </div>
<!-- 右面 -->
                <div class="col-lg-3 col-md-3 w_main_right">
                    <!-- 右面大部分 -->
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h3 class="panel-title">联系方式</h3>
                      </div>
                      <ul class="list-group">
                                  <li class="list-group-item">qq:1143055543</li>
                                  <li class="list-group-item"><a href="https://github.com/ericgu178/"target="black">github:https://github.com/ericgu178/</a></li>
                              </ul>
                    </div>
                    <!-- 右面小部分 -->
                    <div class="panel panel-default">
                      <div class="panel-heading">
                        <h3 class="panel-title">友情链接</h3>
                      </div>
                      <div class="panel-body">
                        <div class="newContent">
                            
                        </div>
                      </div>
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
  import {getLocalTime} from '../../static/js/common.js'
export default {
	components:{
		"headbar":header,
    "footbar":footer
	},
	data(){
		return{
        item:[{
          title:'1.熟悉thinkphp框架，熟悉mysql数据库'
        },{
          title:'2.熟悉jquery，ajax，html5+css3(太弱了，审美不好)'
        },{
          title:'3.熟悉微信二次开发，微信小程序制作'
        },{
          title:'4.熟悉前端js框架vue'
        },{
          title:'5.了解dedecms织梦'
        },{
          title:'6.会用git版本分布式工具'
        },{
          title:'7.了解linux'
        },],
        tools:[{
          title:'1.vue-cli'
        },{
          title:'2.jquery'
        },{
          title:'3.bootstrap'
        },{
          title:'4.thinkphp5，mysql数据库'
        }]
		}
	},
  created(){
  },
	methods:{
   
	},
	mounted:e=>{//钩子函数
  }

}
</script>

<style scoped>
.w_container{
  padding-top: 70px
}

a,a:hover,a:active{
  text-decoration:none;
}
</style>