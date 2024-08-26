<template>
    <header class="navbar navbar-expand navbar-dark flex-column flex-md-row bd-navbar">
        <router-link class="navbar-brand mr-0 mr-md-2" to="/user/home" >
            <img src="../assets/logo.jpg" alt="蜡笔小新分享站" width="60px"/>
        </router-link>

        <div class="navbar-nav-scroll">
            <ul class="navbar-nav bd-navbar-nav flex-row">
                <li class="nav-item">
                    <router-link class="nav-link " to="/" :class="{'active': $route.path === '/'}">首页</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/rcdh" :class="{'active': isActive('/rcdh')}">日常动画</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/jcgy" :class="{'active': isActive('/jcgy')}">剧场电影</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/rwjs" :class="{'active': $route.path === '/rwjs'}">动漫介绍</router-link>
                </li>
                <li class="nav-item">
                    <router-link class="nav-link" to="/gywe" :class="{'active': $route.path === '/gywe'}">关于我们</router-link>
                </li>
            </ul>
        </div>
    </header>
</template>

<script>
export default {
    name: 'Head',
    methods: {
        isActive(path) {
            // 检查 $route.path 是否以 path 开头
            return this.$route.path.startsWith(path);
        }
    }
}
</script>

<style scoped>
.bd-navbar{
    min-height: 4rem;
    background-color: #44c2d3;
    box-shadow: 0 0.5rem 1rem rgba(0,0,0,0.05),inset 0 -1px 0 rgba(0,0,0,0.1);
}
</style>