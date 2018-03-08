<template>
    <div class="lists">
        <div>
            <form @submit.prevent="addTask()">
                <input type="text" name="name" placeholder="Task Name" v-model="createdTask.body">
                <button type="submit" class="btn btn-submit">Create Task</button>
            </form>
        </div>
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">{{list.name}}</h5>
                <div class="list-group">
                    <div class="list-group-item d-flex w-100 justify-content-between" v-for="task in tasks">
                        <task :task="task"></task>
                    </div>
                </div>
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
    import Task from './Task'
    export default {
        name: 'List',
        data() {
            return {
                createdTask: {}
                
            }
        },
        mounted() {
            this.$store.dispatch('getTasks',
                {                 
                    boardId: this.list.boardId,
                    listId: this.list._id
                });
        },
        methods: {
            
            addTask() {
                this.$store.dispatch('addTask', { body: this.createdTask.body, boardId: this.list.boardId, listId: this.list._id })
            },
            deleteList(list) {
                this.$store.dispatch('deleteList', { listId: list._id, boardId: this.board._id })
            },
            editList(event) {
                var form = event.target
                this.$store.dispatch('editList', { name: form.name.value, _id: form.id.value, boardId: this.board._id })
            }
        },
        computed: {

            boardId() {
                return this.$store.state.board
            },
            tasks() {
                return this.$store.state.tasks[this.list._id] || []
            }
        },
        components: {
            Task
        },

        props: ['board', 'list']
    }
</script>

<style>
</style>