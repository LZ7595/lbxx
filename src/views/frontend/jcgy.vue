<template>
        <div class="bgo">
            <div class="container">
                <h1>剧场版观看</h1>
                <div class="row">
                    <div class="col-3" v-for="item in items" :key="item.id" @click="goToDetail(item.id)">
                        <div class="card card1">
                                <img :src="item.img" class="card-img-top" :alt="item.name" :title="item.name">
                            <div class="card-body">
                                    <h5 class="card-title">{{ item.name }}</h5>
                                <p class="card-text">年份：{{ item.year }}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <!--分页控件-->
                <div class="col-12 text-center pag">
                    <button @click="goToPreviousPage" :disabled="pageIndex <= 1">上一页</button>
                    <ul class="pagination">
                        <li v-for="p in pageNumbers" :key="p" :class="{ active: p === pageIndex }">
                            <a href="#" @click.prevent="doGo(p)">{{ p }}</a>
                        </li>
                    </ul>
                    <button @click="goToNextPage" :disabled="pageIndex >= pageCnt">下一页</button>
                </div>
            </div>
        </div>
    </template>

    <script>
        import request from "@/request/request.js";

        export default {
            name: "Jcgy",
            data() {
                return {
                    items: [],
                    pageIndex: 1, // 当前所在页数
                    pageSize: 0, // 每页显示数量
                    pageTotal: 0, // 总记录数
                    pageCnt: 0 // 总页数
                };
            },
            computed: {
                pageNumbers() {
                    const arr = [];
                    for (let i = 1; i <= this.pageCnt; i++) {
                        arr.push(i);
                    }
                    return arr;
                }
            },
            methods: {
                requestArticleList() {
                    request.get(`/api/jcgy/allJcQt?pageNum=${this.pageIndex}`)
                        .then(res => {
                            this.items = res.data.data.rows;
                            this.pageSize = res.data.data.pageSize;
                            this.pageTotal = res.data.data.total;
                            this.pageCnt = res.data.data.pages;
                        })
                        .catch(error => {
                            console.error('Error fetching data:', error);
                        });
                },
                goToPreviousPage() {
                    if (this.pageIndex > 1) {
                        this.pageIndex--;
                        this.requestArticleList();
                    }
                },
                goToNextPage() {
                    if (this.pageIndex < this.pageCnt) {
                        this.pageIndex++;
                        this.requestArticleList();
                    }
                },
                doGo(p) {
                    this.pageIndex = p;
                    this.requestArticleList();
                },
                goToDetail(id) {
                    this.$router.push(`/jcgy/gkxq/${id}`);
                }
            },
            created() {
                this.requestArticleList();
            }
        };
    </script>
<style scoped>
ul{
    margin: 0;
}
.card{
    border: 2px solid #000;
    background-color: rgba(255, 255, 255, 0.6);
    cursor: pointer;
}
.card a{
    text-decoration: none;
    color: #000;
}
.card:hover .card-title{
    color: rgb(150, 150, 150);
    transition: 0.5s;
}
.card:hover {
    background-color: rgba(255, 255, 255, 0.9);
    transition: 0.5s;
}
.card1 img{
    height: 350px;
}
.card1{
    width: 16rem;
    margin: 10px;
}
.card-body .card-title{
    height: 100px;
    overflow: hidden;
}
.bgo{
    background: url(../../assets/背景4.jpg) no-repeat center;
    background-size: cover;
}
.pagination{
    float: left;
}
.pagination li{
    background: #44c2d3;
    padding: 12px 15px;
    margin: 10px;
    float: left;
}
.pagination .active{
    background: #44c2d3;;
}
.pagination .active a{
    color: black;
}
.pag{
    height: 80px;
}
.pag a{
    color: #fff;
    text-decoration: none;
}
.pag a:hover{
    color: #000;
    text-decoration: none;
}
.pag button{
    float: left;
    background: #44c2d3;
    padding: 10px 15px;
    margin: 10px;
}
@media (max-width: 1200px) {
    .card1{
        width: 14rem;
    }
    .card1 img{
        height: 305px;
    }
}
@media (max-width: 992px) {
    .card1{
        width: 10.5rem;
        height: 420px;
    }
    .card1 img{
        height: 228px;
    }
}
@media (max-width: 768px) {
    .card-body{
        padding: 1rem;
    }
    .card-body .card-title{
        height: 150px;
    }
    .card1{
        height: 400px;
        width: 8rem;
    }
    .card1 img{
        height: 172px;
    }
    .card1 .card-text{
        font-size: 12px;
    }
    .bgo{
        background: url(../../assets/背景2.jpg) no-repeat center ;
        background-size: cover;
        height: auto;
    }
    .container h1{
        text-align: center;
    }
    .pag button{
        padding: 5px 8px;
        font-size: 12px;
    }
    .pag .pagination li{
        padding: 7px 8px;
        font-size: 12px;
    }
}
</style>