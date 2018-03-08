<template>
    <div>
        <nav class="navbar">
            <div class="flexor">
                <div>
                    <img class="pad-r" src="../assets/ship-logo.png" height="50px">
                </div>
                <div>
                    <h3>
                        All aBoard
                    </h3>
                </div>
            </div>
            <div>
                <div class="dropdown pointer">
                    <a class="dropdown-toggle" role="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span>
                            <i class="fas fa-user"></i> {{user.username}}</span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="dropdownMenu2">
                        <button @click.prevent="logout" class="dropdown-item pointer" type="button">logout</button>
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
    .pointer {
        cursor: pointer;
    }

    .navbar {
        background-color: #797691;
        /* background-color: #7BA6D0; */
        color: white;
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

    .dropdown-item:hover {
        background-color:  #f9f9f9;
    }

    .flexor {
        display: flex;
        align-items: flex-end;
        justify-content: space-around;
    }

    .flexor h3 {
        margin-bottom: 0;
    }

    .pad-r {
        padding-right: 1rem;
    }
</style>