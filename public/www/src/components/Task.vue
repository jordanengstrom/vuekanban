<template>
    <div class="tasks">
        <div class="flexor">
            <div>
                <h5 class="mb-1">{{task.body}}</h5>
            </div>
            <div>
                <div class="flexor-icons">
                    <div class="pad-r">
                        <i title="add comment" @click.prevent="showCommentSection(task._id)" class="far fa-comment pointer"></i>
                    </div>
                    <div class="dropleft pad-r">
                        <i data-toggle="dropdown" title="additional options" class="fas fa-ellipsis-v pointer"></i>
                        <div class="dropdown-menu">
                            <div class="dropdown-item">
                                <form @submit.prevent="editTask">
                                    <input type="text" placeholder="rename task" name="body" value="">
                                    <input type="text" :placeholder="task._id" name="id" :value="task._id" hidden>
                                    <button type="submit" class="brtn btn-submit" hidden>Update Task Name</button>
                                </form>
                            </div>
                            <div class="dropdown-item">
                                <button class="btn btn-outline-danger btn-block" @click="deleteTask(task)">delete</button>
                                <!-- <i class="fas fa-minus-square pointer" ></i> -->
                            </div>
                            <div class="dropdown-item">
                            </div>
                        </div>
                    </div>
                    <div class="btn-group dropright">
                        <i title="move task" data-toggle="dropdown" class="fas fa-caret-right pointer"></i>
                        <div class="dropdown-menu">
                            <!-- Dropdown menu links -->
                            <div class="dropdown-item" v-for="list in lists">
                                <p @click="moveToList(list)">{{list.name}}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="show == true && taskId == task._id">
            <div>
                <div class="list-group">
                    <div class="list-group-item justify-content-between" v-for="comment in comments">
                        <comment :comment="comment"></comment>
                    </div>
                </div>
            </div>
            <div>
                <form @submit.prevent="addComment">
                    <input type="text" name="body" placeholder="thoughts?" v-model="createdComment.body">
                    <button type="submit" class="btn btn-submit">Add Comment</button>
                </form>
            </div>
        </div>
        <div v-else hidden></div>
    </div>
</template>

<script>
    import Comment from './Comment'
    export default {
        name: 'Task',
        data() {
            return {
                createdComment: {},
                show: false,
                taskId: ''
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
            moveToList(list) {
                this.$store.dispatch('moveToList',
                    {
                        task: this.task,
                        listId: list._id,
                        oldId: this.task.listId
                    })
            },
            showCommentSection(taskId) {
                if (this.show) {
                    this.show = false
                } else {
                    this.show = true
                }
                this.taskId = taskId
            },
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
        lists() {
            return this.$store.state.lists
        },

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

<style scoped>
    .flexor {
        display: flex;
        justify-content: space-between;
    }

    .flexor-icons {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .pad-r {
        padding-right: .5rem;
    }

    .pointer {
        cursor: pointer;
    }

    ::-webkit-input-placeholder {
        text-align: center;
    }
</style>