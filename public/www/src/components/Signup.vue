<template>
    <div class="signup flexor2">
        <div class="flexor">
            <div class="login-holder">
                <div class="logo-section">
                    <img src="../assets/ship-logo-purp.png" height="100">
                    <h1>All aBoard</h1>
                    <p>Sign Up</p>
                </div>
                <div>
                    <form @submit.prevent="createSignup()">
                        <div class="form-group">
                            <label>Username</label>
                            <input v-model="signupUser.username" class="form-control" type="text" placeholder="Username" required>
                        </div>
                        <div class="form-group">
                            <label>Email</label>
                            <input v-model="signupUser.email" class="form-control" type="text" placeholder="Email" required>
                        </div>
                        <div class="form-group">
                            <label>Password</label>
                            <input v-model="signupUser.password" class="form-control" type="password" placeholder="Password" required>
                        </div>
                        <button class="btn btn-block btn-outline-success" type="submit">signup</button>
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
                signupUser: {}
            }
        },
        methods: {
            createSignup() {
                this.$store.dispatch('signup', this.signupUser)
                this.signupUser = {}
            },
        }
    }
</script>

<style scoped>
    .signup {
        height: 100vh;
        background-image: url('../assets/vuekanban-bg.jpg');
        background-size: cover;
        background-position: center;
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
</style>