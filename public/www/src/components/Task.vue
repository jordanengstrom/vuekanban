<template>
    <div class="tasks">
        <h5 class="mb-1">{{task.body}}</h5>
        <div>
            <i class="fas fa-minus-square pointer" @click="deleteTask(task)"></i>
        </div>
        <div>
            <form @submit.prevent="editTask">
                <input type="text" :placeholder="task.body" name="body" value="">
                <input type="text" :placeholder="task._id" name="id" :value="task._id" hidden>
                <button type="submit" class="brtn btn-submit">Update Name</button>
            </form>
        </div>
        <div>
            <form @submit.prevent="addComment">
                <input type="text" name="body" placeholder="thoughts?" v-model="createdComment.body">
                <button type="submit" class="btn btn-submit">Add Comment</button>
            </form>
        </div>
        <div>
            <div class="list-group">
                <div class="list-group-item justify-content-between" v-for="comment in comments">
                    <comment :comment="comment"></comment>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import Comment from './Comment'
    export default {
        name: 'Task',
        data() {
            return {
                createdComment: {}
            }
        },
        mounted() {
            this.$store.dispatch('getComments',
                {
                    boardId: this.task.boardId,
                    listId: this.task.listId,
                    taskId: this.task._id
                })
        },
        methods: {
            addComment(event) {
                var form = event.target

                this.$store.dispatch('addComment',
                    {
                        body: this.createdComment.body,
                        listId: this.task.listId,
                        boardId: this.task.boardId,
                        taskId: this.task._id
                    })
            },
            deleteTask(task) {
                this.$store.dispatch('deleteTask', task)
            },
            editTask(event) {
                var form = event.target
                this.$store.dispatch('editTask',
                    {
                        body: form.body.value,
                        _id: form.id.value,
                        listId: this.task.listId,
                        boardId: this.task.boardId
                    })
            }
        },
        computed: {
            comments() {
               return this.$store.state.comments[this.task._id] || []
            }
        },
        props: ['task'],
        components: {
            Comment
        }
    }
</script>

<style>
</style>