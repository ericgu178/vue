<template>
	<div id="index">
<headbar></headbar>
<!-- 全部 -->
<div class="w_container">
	<div class="main-header" style="background:#563d7c;height:300px;">
		<div class="container">
			<h1 style="text-align: center;color:#fff;line-height: 100px">我是一个平凡的人</br>EricGu178</h1>
		</div>
    </div>
<!-- 主体 -->
<div class="container">
    <div  class="row">
    	<!-- 列表 -->
      <div id="artlclist" class="wrap-left pull-left col-md-9 col-xs-12">
			<ul v-for="list,index in wenzhanglist" v-if="index<5">
				<li class="row">
					<img class="wrap-left col-md-3 col-xs-3" :src="list.imgsrc" width="200" height="150">
					<div class="wrap-right col-md-9 col-xs-9">
						<router-link :to="{path:'article',query: {id: list.id}}">{{list.title}}</router-link>
					    <p>{{list.describe}}</p>
					   <div id="time">
					    <span><i class="glyphicon glyphicon-calendar" style="color:green"></i> {{list.post_time}}</span> 
					    <span v-if="list.user != ''"><i class="glyphicon glyphicon-user"></i> {{list.user}}</span>
					    <span v-if="list.user == ''"><i class="glyphicon glyphicon-user"></i> Author</span>
					    <span><i class="glyphicon glyphicon-comment"></i> {{list.comments}}</span>
					   </div>
					</div>
				</li>
			</ul>
			<ul class="pagination" style="margin-top:10px;">
				<li :class="current==1 ? 'disabled' : ''"><a :href="current==1 ? 'javascript:;' : '#'" @click="prev">&laquo;</a></li>
				<li v-for="list,index in page" :class="index+1==current ? 'active' : ''"><a href="#" @click="changepage(index+1)">{{index+1}}</a></li>
				<li :class="current==page ? 'disabled' : ''" @click="up"><a :href="current==page ? 'javascript:;' : '#'">&raquo;</a></li>
			</ul>
	  </div>
	<!-- 右面 -->
	   <div class="warp-right pull-right col-md-3 col-xs-12">
						<div class="panel panel-default" style="margin-top:20px">
							<div class="panel-heading">
								<h3 class="panel-title">最新发布</h3>
							</div>
							<ul class="list-group">
    							<li class="list-group-item" v-for="list,index in newwenzhanglist">
    								<router-link :to="{path:'article',query: {id: list.id}}">
    										{{index+1}}. {{list.title}}
    								</router-link>
    								<span class="badge" style="background: red">新</span>
    							</li>
							</ul>
						</div>
						<div class="panel panel-default" style="margin-top:20px">
							<div class="panel-heading">
								<h3 class="panel-title">关注我的微信</h3>
							</div>
							<div id="rightmodule" class="panel-body">
								 <img src="../../static/img/mp.jpg" width=230 height=230>
							</div>
						</div>			
		</div>
		<!-- 右面end -->
    </div>
  </div>
 </div>
   <footbar></footbar>
</div>
</template>
<script>
	import header from '../components/header.vue'
	import footer from '../components/footer.vue'
	import {getLocalTime,cutstr} from '../../static/js/common.js'
export default {
	components:{
		"headbar":header,
		"footbar":footer
	},
	data(){
		return{
           wenzhanglist:[],
           newwenzhanglist:[],
           page:0,
           current:1
		}
	},
	created(){ //初始化
        this.list(),
        this.newlist()
	},
	methods:{
         list:function(){
         	var _this = this;
			$.get(_this.api.api+"/Blog/public/index.php/api/Note/listPosts",function(res){
			   for(var i in res.data){
			   	  res.data[i].post_time = getLocalTime(res.data[i].post_time)
			   }
			_this.wenzhanglist = res.data
			_this.page = res.page
		    },"json")
         },
         newlist:function(){
         	$.get(this.api.api+"/Blog/public/index.php/api/Note/newposts",res=>{
                   this.newwenzhanglist = res
		    },"json")
         },
         //翻页操作函数
         changepage:function(page){
         	var _this = this;
			$.post(_this.api.api+"/Blog/public/index.php/api/Note/pagelist",{page:page,type:'article'},function(res){
                for(var i in res){
			   	  res[i].post_time = getLocalTime(res[i].post_time)
			   }
			_this.wenzhanglist = res
			_this.current = page
		    },"json")
         },
         prev:function(){
         	var _this = this
         	if(_this.current==1){
         		_this.changepage(2-1)
         		return 
         	}
         	console.log(_this.current)
         	 _this.changepage(_this.current-1)
         	 _this.current = _this.current-1
         },
         up:function(){
         	var _this = this
             if(_this.page==_this.current){
             	return
             }
             _this.changepage(_this.current+1)
             _this.current = _this.current+1
         }
	},
	mounted:function(){//钩子函数
    }
}
</script>
<style scoped>
body{
	position: relative;
}
#artlclist{
    
	margin-top:20px;
}
#artlclist ul li:last-child{
	border-bottom:none;
}
#artlclist ul li{
	margin-top: 10px;
	height:165px;
	vertical-align:middle;
	border-bottom:1px solid #999;
}
#time span{
	margin-right:10px;
}
#xiangguan p{
	font-size:12px;
	width: 95%;
}
/*右面*/

</style>