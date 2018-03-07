<template>
    <div class="board">
        <h1>Hiiiieeeeeeeee</h1>
        <h2>{{loadBoard.name}}</h2>
        <lists :board="loadBoard"></lists>
    </div>


</template>

<script>
    import Lists from './Lists'
    export default {
        name: 'Board',
        // This is temporary data that Home.vue and it's methods have access too.
        // It's inaccessible outside of this file.
        data() {
            return {
                
            }
        },
        mounted() {
            this.$store.dispatch('getBoard', this.$route.params.boardId);
            this.$store.dispatch('getLists', this.$route.params.boardId);
        },
        // methods: {
        //     getBoards() {
        //         this.$store.dispatch('getBoards')
        //     },
        // },
        computed: {
            loadBoard() {
                // console.log(this.$store.state.board)
                return this.$store.state.board
            },
        },
        components: {
            Lists
        }

    }
</script>

<style>
</style>