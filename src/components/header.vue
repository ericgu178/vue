<template>
  <div id="header">
    <div class="w_header">
        <div class="container">
            <div class="w_header_top">
                <router-link to="/" class="w_logo"></router-link>
                <span class="w_header_nav">
                    <ul>
                       <li v-for="(list,index) in item"><router-link :to="{path:list.path}">
                          {{list.title}}
                        </router-link>
                      </li>
                    </ul>
                </span>
                <div class="w_search">
                    <div class="w_searchbox">
                        <input type="text" placeholder="search" v-model="keyword"/>
                        <button @click="search" id="s">搜索</button>
                    </div>
                    <!-- 注册登录 -->
                    <div class="w_login login" v-if="islogin">
                      <router-link to="login">登录</router-link>
                      <router-link to="register">注册</router-link>
                    </div>
                    <div class="w_login info" v-if="!islogin">
                        <router-link to="">
                          <img :src="myinfo.res.headimgurl" width="40" height="40"><h6>{{myinfo.res.nickname}}</h6>
                        </router-link>
                        <h6 style="cursor: pointer;" @click="exit">退出</h6>
                  </div>
              </div>
            </div>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
       item:[{
        title:"首页",
        path:"/",
       },{
        title:"视频",
        path:"zuoping",
       },{
        title:"关于我",
        path:"about",
       },{
        title:"我要发布",
        path:"fabu",
       }],
       myinfo:JSON.parse(localStorage.getItem("myinfo")),
       islogin:true,
       keyword:""
    }
  },
  created(){
    this.valid_token()
  },
  methods:{
    exit:function(){
      localStorage.removeItem("myinfo");
      location.reload()
      this.$router.push({path:"/"})
    },
    search:function(){
        this.$router.push({path:'search',query:{keyword:this.keyword}})
        location.reload()
    },
    valid_token:function(){
      if(!this.myinfo){
        this.islogin=true
      }else{
        this.islogin=false
      }
    }
  },
  mounted:function(){
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

html,body{
  height: 100%;
  background: #ededed;
}
</style>



