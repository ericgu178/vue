<template>
	<div id="articlelist">
<headbar></headbar>
<!-- 全部 -->
<div class="w_container">
<!-- 主体 -->
<div class="container">
    <div  class="row">
    	<!-- 列表 -->
      <div id="artlclist" class="col-md-12 col-xs-12">
      	<div class="panel panel-default">
    		<div class="panel-heading">
        		<h3 class="panel-title">
            		{{type}}
        		</h3>
    		</div>
    		<ul class="list-group">
    							<li class="list-group-item" v-for="list,index in wenzhanglist">
    								<router-link :to="{path:'article',query: {id: list.id}}">
    										{{index+1}}. {{list.title}} 
                                            <span style="float: right;margin-right:10px">
                                                <span class="glyphicon glyphicon-calendar"></span> {{list.post_time}} 
                                                <span class="glyphicon glyphicon-comment"> {{list.comments}}</span>
                                            </span>
    								</router-link>
    							</li>
							</ul>
		</div>
			
			<ul class="pagination" style="margin-top:10px;">
				<li :class="current==1 ? 'disabled' : ''"><a :href="current==1 ? 'javascript:;' : '#'" @click="prev">&laquo;</a></li>
				<li v-for="list,index in page" :class="index+1==current ? 'active' : ''"><a href="#" @click="changepage(index+1)">{{index+1}}</a></li>
				<li :class="current==page ? 'disabled' : ''" @click="up"><a :href="current==page ? 'javascript:;' : '#'">&raquo;</a></li>
			</ul>
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
	import {getLocalTime,cutstr} from '../../static/js/common.js'
export default {
	components:{
		"headbar":header,
		"footbar":footer
	},
	data(){
		return{
           wenzhanglist:[],
           type:this.$route.query.type,
           page:0,
           current:1
		}
	},
	created(){ //初始化
        this.list()
	},
	methods:{
         list:function(){
			$.post(this.api.api+"/Blog/public/index.php/api/Note/typelist",
			{
             type:this.type
			},
			res=>{
			 for(var i in res.data){
			   	  res.data[i].post_time = getLocalTime(res.data[i].post_time)
			  }
			 this.wenzhanglist = res.data
			 this.page = res.page
		    },"json")
         },
         //翻页操作函数
         changepage:function(page){
         	var _this = this;
			$.post(_this.api.api+"/Blog/public/index.php/api/Note/pagelist",{page:page,type:'list',typename:this.type},function(res){
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
#artlclist{
	margin-top:20px;
}
</style>