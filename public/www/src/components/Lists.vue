<template>
    <div class="lists">
        <div>
            <form @submit.prevent="addList()">
                <input type="text" name="name" placeholder="List Name" v-model="createdList.name">
                <button type="submit" class="btn btn-submit">Create List</button>
            </form>
        </div>
        <div class="card" style="width: 18rem;" v-for="list in lists">
            <div class="card-body">
                <h5 class="card-title">{{list.name}}</h5>
                <h6 class="card-subtitle mb-2 text-muted">Card subtitle</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'List',
        data() {
            return {
                createdList: {}
            }
        },
        methods: {
            addList() {
                this.$store.dispatch('addList', {name: this.createdList.name, boardId: this.board._id})
            }
        },
        computed: {
            lists() {
                return this.$store.state.lists
            },
            boardId() {
                return this.$store.state.board
            }
        },
        props: ['board']
    }
</script>

<style>
</style>