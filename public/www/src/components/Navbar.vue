<template>
    <div>
        <nav class="navbar">
            <div>
                <h3>
                    <i class="fas fa-map-pin"></i> All aBoard
                </h3>
            </div>
            <div>
                <div class="dropdown">
                    <a class="dropdown-toggle" role="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span><i class="fas fa-user"></i> {{user.username}}</span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button @click.prevent="logout" class="dropdown-item" type="button">logout</button>
                    </div>
                </div>
            </div>
        </nav>
    </div>
</template>

<script>
    export default {
        name: 'Navbar',
        data() {
            return {


            }
        },
        props: ['user']
    }

</script>


<style scoped>
    .navbar {
        background-color: #7BA6D0;
    }

    .navbar h3 {
        font-family: 'Paytone One', sans-serif;
        font-weight: 800;
        font-size: 2rem;
    }
    .dropdown-menu {
        min-width: 0;
        padding: .1rem 0;
        left: -2rem;
    }
</style>