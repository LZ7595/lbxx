<template>
    <div class="login-view">
        <main class="login-container">
            <div class="login-box">
                <div class="login-form-box">
                    <form @submit.prevent="handleSubmit">
                        <h1>管 理 员 登 录</h1>
                        <div class="form-item">
                            <label for="uname">账号：</label>
                            <input
                                id="uname"
                                placeholder="请输入用户名"
                                name="uname"
                                maxlength="8"
                                v-model="loginForm.username"
                            />
                        </div>
                        <div class="form-item">
                            <label for="upass">密码：</label>
                            <input
                                id="upass"
                                type="password"
                                placeholder="请输入密码"
                                name="upass"
                                maxlength="16"
                                v-model="loginForm.password"
                            />
                        </div>
                        <div class="form-item">
                            <button type="submit">登录</button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import router from "@/router.js"; // 确保路径正确

export default {
    name: "Login",
    setup() {
        const loginForm = ref({
            username: '',
            password: '',
        });

        const userStore = useUserStore();
        async function handleSubmit() {
            try {
                const response = await userStore.login(loginForm.value); // 调用 store 中的 login 方法
                if (response.success) {
                    // 登录成功，可以在这里添加其他逻辑，如路由跳转
                    const redirect = router.currentRoute.value.query.redirect || '/';
                    alert('登录成功')
                    router.push(redirect);

                } else {
                    // 登录失败处理
                    console.error('Login failed:', response.error);
                    // 可以在这里设置组件的某个状态来显示错误信息
                }
            } catch (error) {
                // 错误处理
                console.error('Error during login:', error);
            }
        }
        return {
            loginForm,
            handleSubmit
        };
    }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.login-view {
    width: 100%;
    height: 960px;
    background: url('../../assets/xx4.jpg') no-repeat;
    background-size: 100% 100%;
    background-attachment: fixed;
}


.login-container {
    position: fixed;
    top: 20%;
    width: 100%;
    height: 500px;
}

.login-box {
    max-width: 1200px;
    height: 500px;
    margin: 0 auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.login-form-box {
    padding: 50px 20px;
    background-color: #ffffff;
    border-radius: 10px;
    opacity: .9;
}
.login-form-box h1 {
    font-size: 20px;
    text-align: center;
    color: #1a497d;
    margin-bottom: 30px;
}

.login-form-box .form-item {
    margin-bottom: 10px;
}

.login-form-box .form-item label {
    display: block;
    margin-bottom: 10px;
}

.login-form-box .form-item input {
    width: 360px;
    height: 40px;
    padding: 0 10px;
    border: 1px solid #eee;
    outline: none;
    border-radius: 3px;
}

.login-form-box .form-item input:focus {
    width: 358px;
    height: 38px;
    border: #1a497d 2px solid;
    background: rgb(99, 194, 211);
}


.login-form-box .form-item button {
    width: 380px;
    height: 50px;
    background-color: #0767b8;
    color: #FFF;
    border: none;
    margin-top: 20px;
    font-size: 18px;
    opacity: .8;
    cursor: pointer;
}

.login-form-box .form-item button:hover {
    opacity: 1;

}
@media (max-width:768px) {
    .login-view {
        background: url('../../assets/lbxx2.png');
        background-size: 100% 100%;
        background-attachment: fixed;
    }
    .login-box {
        justify-content: center;
    }
}
</style>