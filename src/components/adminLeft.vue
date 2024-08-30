<template>
    <el-row class="tac">
        <el-col>
            <el-menu

                    :default-active="activeIndex"
                    class="el-menu-vertical-demo"
                    style="height: 90vh"
                    @open="handleOpen"
                    @close="handleClose"
                    router
            >
                <el-sub-menu index="1">
                    <template #title>
                        <el-icon><List /></el-icon>
                        <span>视频管理</span>
                    </template>
                    <el-menu-item index="/admin/">日常动漫</el-menu-item>
                        <el-menu-item index="/admin/jcgl">剧场电影</el-menu-item>
                </el-sub-menu>
                <el-menu-item index="/admin/videoAdd">
                    <el-icon><Document /></el-icon>
                    <span>添加视频</span>
                </el-menu-item>
                <el-menu-item index="/admin/userManage">
                    <el-icon><setting /></el-icon>
                    <span>用户管理</span>
                </el-menu-item>
            </el-menu>
        </el-col>
    </el-row>
</template>
<script>
import {
    Document,
    List,
    Setting,
} from '@element-plus/icons-vue'

export default {
    name: "adminLeft",
    components: {
        Document,
        List,
        Setting
    },
    data() {
        return {
            activeIndex: this.$route.path // 初始值
        };
    },
    watch: {
        // 观察路由变化，并更新 activeIndex
        '$route'(to, from) {
            this.activeIndex = to.path;
        }
    },
    methods: { // 注意这里将 methods 改为对象
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>