<template>
    <div class="tasks">
        <h2>tasks</h2>
        <div class="list-group">
            <div class="list-group-item d-flex w-100 justify-content-between" v-for="task in tasks">
                <h5 class="mb-1">{{task.body}}</h5>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Task',
        data() {
            return {
            }
        },
        methods: {
            addTask() {
                this.$store.dispatch('addTask', {listId: list._id, boardId: this.board._id})
            },
            deleteTask(task) {
                this.$store.dispatch('deleteTask', {listId: list._id, boardId: this.board._id})
            }
        },
        computed: {
            tasks() {
                return this.$store.state.tasks
            }
        },
        props: ['board', 'list']
    }
</script>

<style>
</style>