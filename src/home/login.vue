<template>
<div id="login">
		<div class="container">
            <div class="row row-centered">
                <div class="well col-md-6 col-centered">
                    <h1 style="text-align: center">登录</h1>
                    <div>
                        <div class="input-group input-group-md">
                            <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-user" aria-hidden="true"></i></span>
                            <input type="text" class="form-control" required="" placeholder="账号" v-model="info.user"/>
                        </div>
                        <div class="input-group input-group-md">
                            <span class="input-group-addon" id="sizing-addon1"><i class="glyphicon glyphicon-lock"></i></span>
                            <input type="password" class="form-control" required="" v-model="info.pwd" placeholder="请输入密码"/>
                        </div>
                        <br/>
                        <button class="btn btn-success btn-block" @click="login">登录</button>
                        <h5 style="text-align: center;margin-top:20px;font-size:14px">还没有账号? <router-link to="register">注册新账号</router-link></h5>
                        <h5 style="text-align: center;margin-top:20px;font-size:14px"><router-link to="/">返回首页</router-link></h5>
                    </div>
                </div>
            </div>
        </div>

</div>
</template>
<script>
	export default{
		data(){
			return{
				info:[]
			}
		},
		methods:{
			login:function(){
				var _this = this;
				$.post(_this.api.api+"/Blog/public/index.php/api/Identify/login",{user:_this.info.user,pwd:_this.info.pwd},function(res){
					if(res.errcode>0){
						alert(res.errmsg)
					}else{
						localStorage.setItem("myinfo",JSON.stringify(res));
						setTimeout(function(){
							_this.$router.push({path:"/"})
						},2000)
					}
				},"json")
			}
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