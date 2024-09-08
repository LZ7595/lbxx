<template>
    <footer class="under navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">

        <div class="un_info navbar-nav-scroll" style="position:relative">
            <img class="logo navbar-brand mr-0 mr-md-2" alt="蜡笔小新分享站" title="蜡笔小新分享站" src="../assets/logo.jpg">
            <ul class="block navbar-nav bd-navbar-nav flex-row">
                <li class="nav-item">
                    <p><h5><strong>分享站导航</strong></h5></p>
                    <p><router-link to="/rwjs">动漫简介</router-link></p>
                    <p><router-link to="/rwjs">人物介绍</router-link></p>
                </li>
                <li class="nav-item">
                    <p><h5><strong>关于分享站</strong></h5></p>
                    <p><router-link to="/gywe">关于我们</router-link></p>
                    <p><a href="javascript:void(0);" onclick="window.open('http://wpa.qq.com/msgrd?v=3&uin=2567407595&site=qq&menu=yes');">加入我们</a></p>
                </li>
                <li class="nav-item">
                    <p><h5><strong>观看动漫</strong></h5></p>
                    <p><router-link to="/rcdh">日常版观看</router-link></p>
                    <p><router-link to="/jcgy">剧场版观看</router-link></p>
                </li>
                <li class="nav-item">
                    <p><h5><strong>联系分享站</strong></h5></p>
                    <p><a href="javascript:void(0);" onclick="window.open('http://wpa.qq.com/msgrd?v=3&uin=2567407595&site=qq&menu=yes');">意见反馈</a></p>
                    <p><a href="mailto:2567407595@qq.com" target="_blank">电子邮件</a></p>
                    <p><router-link to="/admin">后台管理</router-link></p>
                </li>

            </ul>

        </div>

    </footer>
</template>

<script>
export default {
    name: "Foot"
}
</script>

<style scoped>
.bd-navbar{
    min-height: 4rem;
    background-color: #44c2d3;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.05),inset 0 -1px 0 rgba(0,0,0,0.1);
}
@media (max-width: 768px){
    .un_info .logo{
        display:none;
    }
}
.under {
    display: flex;
    padding-top: 10px;
    padding-bottom: 20px;
    color: #fff!important;
}
.un_info {
    height: 260px;
    padding: 10px 0 0 0;
    margin-top: 30px;
    margin: 0 auto;
    display: flex;
}
.un_info .block {
    height: 200px;
    margin: 0;
    padding: 0;
    float: left;
}
.un_info .logo {
    width: 150px;
    height: 150px;
    margin-top: 10px;
    float: left;
}
.un_info li {
    width: 120px;
    display: block;
    float: left;
    padding: 20px 20px 0 0;
}
.un_info a{
    color: #fff;
    text-decoration: none;
}
.un_info a:hover{
    color: #b3aeae;
    text-decoration: none;
}
</style>