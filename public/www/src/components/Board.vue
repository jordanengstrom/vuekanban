<template>
    <div class="board">
        <navbar :user="user"></navbar>
        <h2>{{loadBoard.name}}</h2>
        <div>
            <form @submit.prevent="addList()">
                <input type="text" name="name" placeholder="List Name" v-model="createdList.name">
                <button type="submit" class="btn btn-submit">Create List</button>
            </form>
        </div>
        <div v-for="list in lists">
            <lists :list="list" :board="loadBoard"></lists>
        </div>
    </div>


</template>

<script>
    import Navbar from './Navbar'
    import Lists from './Lists'
    export default {
        name: 'Board',
        // This is temporary data that Home.vue and it's methods have access too.
        // It's inaccessible outside of this file.
        data() {
            return {
                createdList: {}
            }
        },
        mounted() {
            this.$store.dispatch('getBoard', this.$route.params.boardId);
            this.$store.dispatch('getLists', this.$route.params.boardId);
        },
        methods: {
            addList() {
                this.$store.dispatch('addList', { name: this.createdList, boardId: this.$route.params.boardId })
            },
        },
        computed: {
            loadBoard() {
                return this.$store.state.board
            },
            loadList() {
                return this.$store.state.list
            },
            lists() {
                return this.$store.state.lists
            },
            user() {
                return this.$store.state.user
            }

        },
        components: {
            Lists,
            Navbar
        }

    }
</script>

<style>
</style>