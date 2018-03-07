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
                <tasks :board="board" :list="list"></tasks>
                <i class="fas fa-minus-square pointer" @click="deleteList(list)"></i>
            </div>
            <form @submit.prevent="editList">
                <input type="text" :placeholder="list.name" name="name" value="">
                <input type="text" :placeholder="list._id" name="id" :value="list._id" hidden>            
                <button type="submit" class="brtn btn-submit">Update Name</button>
              </form>
        </div>
    </div>
</template>

<script>
    import Tasks from './Tasks'
    export default {
        name: 'List',
        data() {
            return {
                createdList: {}
            }
        },
        mounted(){
            this.$store.dispatch('getTasks', {boardId: this.board._id, listId: list._id});
        },
        methods: {
            addList() {
                this.$store.dispatch('addList', {name: this.createdList, boardId: this.board._id})
            },
            deleteList(list) {
                this.$store.dispatch('deleteList', {listId: list._id, boardId: this.board._id})
            },
            editList(event) {
                var form = event.target
                this.$store.dispatch('editList', {name: form.name.value, _id: form.id.value, boardId: this.board._id})
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
        component: {
            Tasks
        },

        props: ['board']
    }
</script>

<style>
</style>