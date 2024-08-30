<template>
    <div class="common-layout">
        <el-container style="height: 100vh">
            <el-header><adminHead/></el-header>
            <el-container style="height: 90vh">
                <el-aside><adminLeft/></el-aside>
                <el-main><router-view></router-view></el-main>
            </el-container>
        </el-container>
    </div>


</template>

<script>
import adminHead from "@/components/adminHead.vue";
import adminLeft from "../../components/adminLeft.vue";
export default {
    name: "adminHome",
    components:{adminHead,adminLeft}
}
</script>