<template>
<div id="login">
		<div class="container">
            <div class="row row-centered">
                <div class="well col-md-6 col-centered">
                  <!-- 提示框 -->
                      <div id="myAlert" class="alert alert-success" style="display: none">
                          <a href="#" class="close" data-dismiss="alert">&times;</a>
                          <strong>成功！</strong>{{alertmsg}}
                      </div>
                      <div id="myAlert" class="alert alert-warning" style="display: none">
                            <a href="#" class="close" data-dismiss="alert">&times;</a>
                            <strong>警告！</strong>{{alertmsg}}
                      </div>
                  <!-- end -->
                    <h1 style="text-align: center">注册</h1>
                    <form onsubmit="return false">
                        <div class="input-group input-group-md">
                            <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                            <input type="text" class="form-control" id="userid" required="required" placeholder="账号" v-model="info.user"/>
                        </div>
                        <div class="input-group input-group-md">
                            <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                            <input type="text" class="form-control" required="required" placeholder="请输入个性昵称" v-model="info.nickname"/>
                        </div>
                        <div class="input-group input-group-md">
                            <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" class="form-control" required v-model="info.pwd" placeholder="请输入密码"/>
                        </div>
                        <div class="input-group input-group-md">
                            <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" class="form-control" id="password" required v-model="info.repwd" placeholder="请再次输入密码"/>
                        </div>
                        <br/>
                          <div class="form-group" style="display:flex">
                            <img src="" width="100" height="100" id="imgg" style="background: #fff" /> 
                            <input type="file" id="file" class="form-control-file" />   
                          </div>
                        <button class="btn btn-success btn-block" @click="register">注册</button>
                        <h5 style="text-align: center;margin-top:20px;font-size:14px">已有账号? <router-link to="login">点此登录</router-link></h5>
                        <h5 style="text-align: center;margin-top:20px;font-size:14px"><router-link to="/">返回首页</router-link></h5>
                    </form>
                </div>
            </div>
        </div>

</div>
</template>
<script>
  import {getObjectURL,getBase64Image} from '../../static/js/common.js'
	export default{
		data(){
			return{
				info:[],
        alertmsg:"",
        imgbase64:"",
			}
		},
		methods:{
			register:function(){
        if(this.info.pwd!=this.info.repwd){
          this.alertmsg='密码不一致';
          $(".alert-warning").attr("style",'display:block')
          return;
        }
				$.post(this.api.api+"/Blog/public/index.php/api/Identify/register",{user:this.info.user,pwd:this.info.pwd,img:this.imgbase64,nickname:this.info.nickname},(res)=>{
             if(res.errcode>0){
                  this.alertmsg=res.errmsg
                  $(".alert-warning").attr("style",'display:block')
                  $(".alert-success").attr("style",'display:none')
              }else{
                  this.alertmsg=res.errmsg
                  $(".alert-success").attr("style",'display:block')
                  $(".alert-warning").attr("style",'display:none')  
                setTimeout(()=>{
                  this.$router.push({path:"/"})
                },2000)
              }
				},"json")
			}
		},
    mounted:function(){
      var _this = this;
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
<style scoped>
.container{
   display:table;
   height:100%;
   margin-top:60px;
}
.row{
      display: table-cell;
      vertical-align: middle;
}
  /* centered columns styles */
.row-centered {
      text-align:center;
}
.col-centered {
      display:inline-block;
      float:none;
      text-align:left;
      margin-right:-4px;
}
.input-group{
	margin-top:20px;
}
</style>