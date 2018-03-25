<template>
    <div class="login flexor2">
        <div class="flexor">
            <div class="login-holder">
                <div class="logo-section">
                    <img src="../assets/ship-logo-purp.png" height="100">
                    <h1>All aBoard</h1>
                    <p>Login</p>
                </div>
                <div>
                    <form @submit.prevent="login()">
                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="loginUser.email" class="form-control" type="text" placeholder="Email">
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="loginUser.password" class="form-control" type="password" placeholder="Password">
                        </div>
                        <button class="btn btn-block btn-outline-success" type="submit">login</button>
                        <router-link :to="{name: 'Signup'}">
                            <button class="btn btn-block btn-outline-info">create account</button>
                        </router-link>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Login',
        data() {
            return {
                loginUser: {}

            }
        },
        methods: {
            login() {
                console.log(this.loginUser)
                this.$store.dispatch('login', this.loginUser)
                this.loginUser = {}
            }

        }

    }


</script>


<style scoped>
    a:hover {
        text-decoration: none;
    }
    
    .btn {
        margin-bottom: 1rem;
    }

    .login {
        height: 100vh;
        background-image: url('../assets/vuekanban-bg.jpg');
        background-size: cover;
        background-position: center;
    }

    .flexor {
        display: flex;
        flex-direction: column;
        justify-content: center;
    }

    .login-holder {
        padding: 1.5rem;
        background-color: white;
        border: .1rem solid #e2e2e2;
        border-radius: 10px;
        color: #6c6c6d
    }

    .flexor2 {
        display: flex;
        justify-content: center;
    }

    .logo-section {
        margin-bottom: 1.5rem;
        text-align: center;
        font-family: 'Paytone One', sans-serif;
    }
    .btn-outline-success {
        color: #797691;
        border-color: #797691;
    }
    .btn-outline-success:hover {
        color: #fff;
        border-color: #797691;
        background-color: #797691;
    }
</style>