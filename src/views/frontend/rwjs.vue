<template>
    <div class="xko">
        <div class="container xkk">
            <div class="row xrow">
                <div class="col-12" id="dmjs">
                    <h1>动漫介绍</h1>
                    <p>蜡笔小新》是一部由日本漫画家臼井仪人创作的漫画作品，于1990年开始连载。该作不仅成为日本漫画的代表之一，还衍生出了多部动画、电影以及丰富的周边产品，赢得了广泛的国际影响力。</p>
                    <p>故事的主人公是野原新之助，通称小新，一个天真烂漫、顽皮捣蛋的五岁男孩。小新的生活以他与家人、朋友之间的趣事和冒险为中心，展现了充满笑声和温馨的日常生活。小新的家庭成员包括他的父母野原广志和野原美伢，爷爷野原阿财，还有婶婶野原玛丽。</p>
                </div>
            </div>

            <div class="row xrow xxx">
                <div class="col-12">
                    <h1>人物关系图</h1>
                    <img src="../../assets/人物关系图.jpg" alt="人物关系图" style="width: 100%; height: auto">
                </div>
            </div>
            <div class="xrow">
                <h1>人物介绍</h1>
                <div class="row rio" v-for="item in items" :key="item.id">
                    <div class="col-3"><img :src="item.img" alt="{{item.name}}"></div>
                    <div class="col-9"><h3>{{item.name}}</h3><p>{{item.word}}}</p></div>
                    <hr width="90%" color="#000" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import request from '@/request/request.js';
export default {
    name: "rwjs",
    data() {
        return {
            items: []
        }
    },
    mounted() {
        request.get(`/api/allRw`)
            .then(res => {
                this.items = res.data.data.rows;
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }}
</script>

<style scoped>
.xko .xrow{
    border: 2px solid #000;
    margin: 30px auto!important;
}
.xkk .row{
    margin: 0;
}
.rio img{
    width: 200px;
    height: 250px;
    margin-left: 20px;
    border: 1px solid #000;
}
.rio{
    padding: 20px 0;
}
@media (max-width: 992px) {
    .rio img{
        width: 150px;
        height: 187.5px;
    }
}
@media (max-width: 768px) {
    .rio img{
        width: 100px;
        height: 125px;
    }
}
</style>