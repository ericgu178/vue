<template> 
   <div id="fabu"> 
    <headbar></headbar> 
    <div class="container v-continer"> 
     <!-- 提示框 --> 
     <div id="myAlert" class="alert alert-success" style="display: none"> 
      <a href="#" class="close" data-dismiss="alert">&times;</a> 
      <strong>成功！</strong>{{alertmsg}} 
     </div> 
     <div id="myAlert" class="alert alert-warning" style="display: none"> 
      <a href="#" class="close" data-dismiss="alert">&times;</a> 
      <strong>警告！</strong>{{alertmsg}} 
     </div>
     <!-- 提示框end --> 
     <div class="row"> 
      <!-- 列表 --> 
      <div class="col-md-3"> 
       <ul id="list" v-for="(list,index) in item"> 
        <li> 
         <router-link :to="{path:list.path}">
          {{list.name}}
         </router-link> </li> 
       </ul> 
      </div> 
      <!-- form 表单 --> 
      <form enctype="multipart/form-data" class="form-horizontal col-md-9" onsubmit="return false"> 
       <div class="form-group"> 
          <input type="text" class="form-control" v-model="list.title" placeholder="请输入标题" /> 
       </div> 
       <div class="form-group"> 
          <input type="text" class="form-control" v-model="list.keyword" placeholder="关键字" /> 
       </div> 
       <div class="form-group" style="display:flex"> 
          <input type="file" id="file" class="form-control-file" /> 
          <img src="" width="100" height="100" id="imgg" style="background: #fff" /> 
       </div>
       <div class="form-group"> 
           <select name="dealer_id" id="dealer_id" v-model="list.type" class="selectpicker show-tick form-control">
              <option value="其他" disabled="">请选择类型</option>
              <option value="杂谈">杂谈</option>
              <option value="笔记">笔记</option>
              <option value="学习">学习</option>
              <option value="军事">军事</option>
          </select>
       </div>
       <div class="form-group"> 
        <mavon-editor v-model="list.content"></mavon-editor> 
       </div> 
       <div class="form-group"> 
        <div class="col-sm-offset-2 col-sm-10"> 
         <button class="btn btn-default" @click="fabu">发布</button> 
        </div> 
       </div> 
      </form> 
     </div> 
    </div>
    <footbar></footbar>
   </div> 
</template>
<script>
	import header from '../components/header.vue'
  import footer from '../components/footer.vue'
  import {cutstr,getObjectURL,getBase64Image} from '../../static/js/common.js'
export default {
	components:{
		"headbar":header,
    "footbar":footer
	},
	data(){
		return{
		   list:[],
           item:[{
           	 name:"发布文章",
           	 path:"fabu"
           },{
           	 name:"文章管理",
           	 path:"wenzhangguanli"
           }],
           myinfo:JSON.parse(localStorage.getItem("myinfo")),
           imgbase64:"",
           alertmsg:""
		}
	},
  created(){
    this.valid_token()
  },
	methods:{
       fabu:function(){
       	$.post(this.api.api+'/Blog/public/index.php/api/Note/fPost',
       		{
            title:this.list.title,
        		content:this.list.content,
        		type:this.list.type,
            keyword:this.list.keyword,
            token:this.myinfo.token,
            img:this.imgbase64,
        		describe:cutstr(this.list.content,200)
        	},(res)=>{
              if(res.errcode>0){
                  this.alertmsg=res.errmsg
                  $(".alert-warning").attr("style",'display:block')
                  $(".alert-success").attr("style",'display:none')
              }else{
                  this.alertmsg=res.errmsg
                  $(".alert-success").attr("style",'display:block')
                  $(".alert-warning").attr("style",'display:none')  
                setTimeout(function(){
                  $(".alert-success").attr("style",'display:none')
                },2000)   
              }
        		},'json')
       },
       valid_token:function(){
        if(!this.myinfo){
           alert("请先登录,再发表文章")
           this.$router.push({path:"/login"})
           }
        }
	},
	mounted:function(){//钩子函数    
        var _this = this;
         // 选择图片 变化
        $("#file").change(function(){
            var img =new Image();
            img.src = getObjectURL(document.getElementById("file"))
            img.onload=function(){
              var base64 = getBase64Image(img);
              _this.imgbase64 = base64
            }
          $("#imgg").attr('src',getObjectURL(document.getElementById("file")))
        })
    }

}
</script>

<style>
	.v-continer{
		padding-top:80px;
	}
    #list li a{
    	display: inline-block;
    	color:#000;
    	width: 100%;
    	height: 50px;
    	text-align: center;
    	line-height: 50px;
    	background: #fff;
    	border-bottom:1px solid #999;
    	text-decoration:none;
    }
    #list li a:hover{
    	color:#fff;
    	background: green;
    }
</style>