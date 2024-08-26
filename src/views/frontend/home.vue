<template>
    <Head/>
    <router-view></router-view>
    <Foot/>
</template>

<script>
import Head from "@/components/Head.vue";
import Foot from "@/components/Foot.vue";

export default {
    name: "Home",
    components: {Foot,Head}
}
</script>

<style scoped>

</style>