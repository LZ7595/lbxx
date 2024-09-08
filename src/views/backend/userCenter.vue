<template>
    <div>
        <p><span>用户：</span><span>{{ name }}</span></p>
        <el-button plain @click="updateStatus = 'name'">重命名</el-button>
        <el-button type="primary" plain @click="updateStatus = 'pwd'">修改密码</el-button>
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
        <div class="updateName" v-if="updateStatus === 'name'">
            <form>
                <table>
                    <tr>
                        <td><label for="password">密码:</label></td>
                        <td>
                            <el-input
                                v-model="UpNameForm.password"
                                style="width: 240px"
                                type="password"
                                placeholder="请输入密码"
                                show-password
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="name">新用户名:</label></td>
                        <td>
                            <el-input
                                v-model="UpNameForm.newname"
                                style="width: 240px"
                                placeholder="请输入新用户名"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-button type="success" @click="updateName">确定</el-button>
                            <el-button @click="resetForm">重置</el-button>
                            <el-button type="primary" @click="updateStatus = ''">取消</el-button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
        <div class="updatePwd" v-if="updateStatus === 'pwd'">
            <form>
                <table>
                    <tr>
                        <td><label for="password">旧密码:</label></td>
                        <td>
                            <el-input
                                v-model="UpPwdForm.oldPwd"
                                style="width: 240px"
                                type="password"
                                placeholder="请输入旧密码"
                                show-password
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="name">新密码:</label></td>
                        <td>
                            <el-input
                                v-model="UpPwdForm.newPwd"
                                style="width: 240px"
                                placeholder="请输入新密码"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td><label for="name">确认密码:</label></td>
                        <td>
                            <el-input
                                v-model="UpPwdForm.newPwd2"
                                style="width: 240px"
                                placeholder="请输入再次新密码"
                            />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <el-button type="success" @click="updatePwd">确定</el-button>
                            <el-button type="primary" @click="updateStatus = ''">取消</el-button>
                        </td>
                    </tr>
                </table>
            </form>
        </div>
    </div>
</template>

<script>
import request from "@/request/request.js";
import { useUserStore } from "@/store/user.js";
import router from "@/router.js";
import { reactive } from "vue";

export default {
    name: "userCenter",
    data() {
        return {
            updateStatus: "",
        };
    },
    methods: {
        async handleLogout() {
            const userStore = useUserStore();
            // 首先调用store的logout方法来重置状态
            userStore.logout();
            // 然后调用API服务来执行登出逻辑
            try {
                await userStore.logout(userStore.token); // 假设userStore中存储了token
                await router.push('/login'); // 登出成功后重定向到登录页面
            } catch (error) {
                console.error('Failed to logout:', error);
                // 处理登出失败的情况
            }
        },
        resetForm() {
            this.UpNameForm.newname = "";
            this.UpNameForm.password = "";
        },
        updateName() {
            if (!this.UpNameForm.newname ||!this.UpNameForm.password) {
                this.$message.error("请填写完整信息");
                return;
            }
            return request
                .post("/api/user/updateName", this.UpNameForm)
                .then((res) => {
                    if (res.data.code === 200) {
                        this.updateStatus = "";
                        this.handleLogout();
                        this.$message.success("修改成功,请重新登录");

                    } else {
                        this.$message.error("修改失败");
                    }
                });
        },
        updatePwd() {
            console.log(this.UpPwdForm)
            if (!this.UpPwdForm.oldPwd || !this.UpPwdForm.newPwd || !this.UpPwdForm.newPwd2) {
                this.$message.error("请填写完整信息");
                return;
            }
            if (this.UpPwdForm.newPwd !== this.UpPwdForm.newPwd2) {
                this.$message.error("两次密码不一致");
                return;
            }
            return request
                .post("/api/user/updatePwd", this.UpPwdForm)
                .then((res) => {
                    if (res.data.code === 200) {
                        this.updateStatus = "";
                        this.handleLogout();
                        this.$message.success("修改成功,请重新登录");
                    } else {
                        this.$message.error("修改失败");
                    }
                })

        }
    },
    setup() {
        const userData = localStorage.getItem("user");
        if (userData) {
            const userObj = JSON.parse(userData);
            const name = userObj.user;
            const UpNameForm = reactive({
                oldname: name,
                newname: "",
                password: "",
            });
            const UpPwdForm = reactive({
                username: name,
                oldPwd: "",
                newPwd: "",
                newPwd2: "",
            });
            return { UpNameForm, UpPwdForm, name };
        } else {
            return { UpNameForm: null, UpPwdForm: null, name: null };
        }
    },
};
</script>

<style scoped>
table {
    width: 100%;
}
form {
    margin-top: 20px;
}
tr td:first-child {
    width: 80px;
}
tr {
    display: block;
    margin: 10px 0;
}
</style>