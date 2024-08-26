<template>
    <div id="carouselExampleCaptions" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselExampleCaptions" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="1"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="2"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="3"></li>
            <li data-target="#carouselExampleCaptions" data-slide-to="4"></li>
        </ol>
        <div class="carousel-inner">
            <div class="carousel-item active">
                <img src="../../assets/轮播1.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p>蜡笔小新剧场版2017：宇宙人来袭！</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../../assets/轮播2.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p>《蜡笔小新:爆盛!功夫男孩～拉面大乱～》</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../../assets/轮播3.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p>蜡笔小新精选图集</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../../assets/轮播4.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p>蜡笔小新图辑：野原一家大集合</p>
                </div>
            </div>
            <div class="carousel-item">
                <img src="../../assets/轮播5.jpg" class="d-block w-100" alt="...">
                <div class="carousel-caption d-none d-md-block">
                    <p>蜡笔小新30周年纪念宣传图</p>
                </div>
            </div>
        </div>
        <button class="carousel-control-prev" type="button" data-target="#carouselExampleCaptions" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-target="#carouselExampleCaptions" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </button>
    </div>
    <div class="hygl" >
        <h3 class="text-center">欢迎来到蜡笔小新分享站！</h3>
        <p class="text-center">这里致力于收集分享蜡笔小新动漫的图片、视频、影片等资源6</p>
    </div>
    <div class="img-fluid muluimg">
        <div class="container lml">
            <h2 class="text-center">目录指引</h2>
            <p class="text-center">这里将提供蜡笔小新动漫的目录，方便大家查找</p>
            <div class="container zmulu">
                <div class="row justify-content-around" v-for="(group, rowIndex) in groupedMulua" :key="rowIndex">
                    <div class="col-md-4 col-lg-5" v-for="(item, colIndex) in group" :key="colIndex + rowIndex * 2">
                        <router-link :to="item.url" class="d-flex align-items-center">
                            <div class="align-self-center isa">
                                <img :src="item.img" alt="蜡笔小新">
                                <p>{{ item.val }}</p>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import img1 from '@/assets/lbxx1.png';
import img2 from '@/assets/lbxx2.png';
import img3 from '@/assets/lbxx3.png';
import img4 from '@/assets/lbxx4.png';
import img5 from '@/assets/lbxx5.png';
import img6 from '@/assets/lbxx6.png';

export default {
    name: "IndexNav",
    setup() {
        const mulua = ref([
            { url: '/rwjs', img: img1, val: '动漫简介' },
            { url: 'rwjs', img: img2, val: '人际关系图' },
            { url: '/rwjs', img: img3, val: '主要人物介绍' },
            { url: '/rcdh', img: img4, val: '日常动漫观看' },
            { url: '/jcgy', img: img5, val: '剧场版观看' },
            { url: '#', img: img6, val: '精彩图片集' }
        ]);

        const groupedMulua = computed(() => {
            const groupSize = 2; // 每组的大小
            let groups = [];
            for (let i = 0; i < Math.ceil(mulua.value.length / groupSize); i++) {
                let startIndex = i * groupSize;
                let endIndex = Math.min(startIndex + groupSize, mulua.value.length);
                groups.push(mulua.value.slice(startIndex, endIndex));
            }
            return groups;
        });

        // 返回给模板使用的响应式数据和计算属性
        return {
            mulua,
            groupedMulua
        };
    }
};
</script>
<style scoped>
.carousel-item p{
    font-size: 30px;
    background: rgba(0, 0, 0, 0.5);
    letter-spacing: 0.2em;
}
.hygl{
    min-height: 120px;
    background: #44c2d3;
    padding-top: 25px;
    color: #fff;
}
.zmulu .col-md-4{
    border: 1px solid #000;
}
.muluimg{
    background: url(../../assets/背景1.jpg) no-repeat center;
    background-size: cover;
    padding: 30px 0;
}
.lml{
    height: auto;
    margin-top: 30px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 20px;
}
.lml h2{
    letter-spacing: 0.2em;
    margin-top: 30px;
}
.lml p:first-child{
    margin-bottom: 30px;
}
.isa{
    position: relative;
    float: left;
}
@media (max-width: 768px){
    .muluimg{
        background: url(../../assets/背景3.jpg) no-repeat center ;
        background-size: cover;
        height: auto;
    }
    .zmulu .col-md-4{
        min-height: 70px;
        margin: 15px;
    }
    .muluimg img{
        width: 5em;
        float: left;
    }
    .muluimg .isa p{
        float: left;
        font-size: 20px;
        padding-top: 25px;
        width: 120px;
        text-align: center;
    }
    .muluimg a{
        margin: 0 auto;
        width: 230px;
    }
    .lml{
        padding-bottom: 15px;
    }
}
@media (min-width: 768px){
    .zmulu .col-md-4{
        min-height: 160px;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .muluimg img{
        width: auto;
        float: left;
    }
    .muluimg .isa p{
        float: left;
        font-size: 1.5em;
        padding-top: 60px;
        text-align: center;
    }
}
@media ( 768px < width < 992px){
    .muluimg .isa p{
        float: none;
    }
    .muluimg .isa{
       margin: 0 auto;
    }
    .lml{
        padding-bottom: 35px;
    }
}
@media ( 992px < width < 1200px){
    .lml{
        padding-bottom: 30px;
    }
}
@media (min-width: 1200px){
    .muluimg .isa p{
        width: 200px;
    }
    .lml{
        padding-bottom: 35px;
    }
}
</style>