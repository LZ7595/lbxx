<template>
      <div class="container">
          <div class="row r1">
              <h5>
                  <a @click="getBack()">{{this.service == "rcdh" ? '日常动画观看' : this.service == "jcgy" ? '剧场版观看' : '出现未知错误'}}</a>
                  -->
                  <a @click="getPeer()">{{item.name}}</a>
              </h5>
          </div>
          <div class="row">
              <video :src="item.url" controls="controls">
              </video>
          </div>
          <div class="row r2">
              <h4>{{item.name}}</h4>
              <p>{{this.service == "rcdh" ? `共${item.num}集` : this.service == "jcgy" ? `${item.year}年上映` : '出现未知错误'}}</p>
              <p>{{item.word}}</p>
          </div>
      </div>
</template>

<script>
import request from "@/request/request.js";

export default {
    name: "gkIndex",
    props: ['id', 'service'],
    data() {
        return {
            item: []
        };
    },
    watch: {
        id(newVal) {
            if (newVal) {
                this.init();
            }
        },
        service(newVal) {
            if (this.id && newVal) {
                this.init();
            }
        }
    },
    methods: {
        init() {
            const url = `/api/${this.service}/${this.id}`;
            request.get(url)
                .then(res => {
                    this.item = res.data.data[0] || {}; // 假设返回的是一个数组，并且我们只取第一个元素
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        },
        getBack() {
            this.$router.push(`/${this.service}`); // 假设您有一个基于 service 的路由
        },
        getPeer() {
            // 这里可能需要根据实际情况调整路由逻辑
            // 例如，如果您想保持在同一服务下但更改 id，则可能不需要更改路由
            this.$router.push(`/${this.service}/gkxq/${this.id}`);
        }
    },
    created() {
        // 如果在创建时 id 和 service 都已定义，则初始化数据
        if (this.id && this.service) {
            this.init();
        }
    }
}
</script>

<style scoped>
h4 {
    font-weight: bold;
}

.r1 a {
    color: #feaeee;
    cursor: pointer;
}
.r1 a:hover{
    text-decoration: 1px solid #feaeee;
}
.r2 {
    border: 2px solid #000;
    padding: 20px;
}

p {
    width: 100%;
}

.row {
    margin-top: 20px;
    margin-bottom: 20px;
}

video {
    min-width: 1140px;
    min-height: 650px;
}

@media (max-width: 1200px) {
    video {
        min-width: 950px;
        min-height: 550px;
    }
}

@media (max-width: 992px) {
    video {
        min-width: 720px;
        min-height: 450px;
    }
}

@media (max-width: 768px) {
    video {
        min-width: 540px;
        min-height: 320px;
    }
}
</style>