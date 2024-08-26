<template>
    <div class="gywm">
        <div class="container">
            <div class="gywetext">
               <div class="row">
                   <h1>关于我们</h1>
                   <p>蜡笔小新分享站专注于为需求用户转载提供关于蜡笔小新的视频电影资源，在这里，各位用户可以搜索到最新最全的蜡笔小新信息及视频资源，在此，欢迎各位用户来到蜡笔小新分享站，希望你们能在这里找到你们需要的资源。</p>
               </div>
               <div class="row">
                   <h1>联系我们</h1>
                   <p>如果您有任何问题，欢迎联系我们，我们将会在第一时间为您解答。</p>
                   <p>地址：**市**区</p>
                   <p>联系电话：456***16615</p>
                   <p>邮箱：123***16615@qq.com</p>
                   <button onclick='window.open("tencent://AddContact/?fromId=50&fromSubId=1&subcmd=all&uin=2567407595")'>点击此处加工作人员QQ</button>
               </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "gywe"
}
</script>

<style scoped>
.gywm{
    background: url(../../assets/背景5.jpg) no-repeat center ;
    background-size: cover;
    height: auto;
    padding:40px 0;
}
.gywm .container .gywetext{
    background: rgba(255,255,255,0.7);
    width: 100%;
    padding: 20px 40px;
}
.gywm .row p{
    font-size: 24px;
    text-indent: 1.5em;
    width: 100%;
}
.gywm .row:nth-child(1) p{
    letter-spacing: 0.3em;
    text-indent: 2em;
}
.gywm .row h1{
    margin-top: 40px;
    width: 100%;
}
.gywm .row{
    padding-bottom: 20px;
}
@media (max-width: 768px) {
    .gywm{
        background: url(../../assets/蜡笔小新全家福.jpg) no-repeat center ;
        background-size: cover;
        height: auto;
    }
}

</style>