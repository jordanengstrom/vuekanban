<template>
    <div class="tasks">
        <div class="flexor">
            <div>
                <h5 class="">{{task.body}}</h5>
            </div>
            <div>
                <div class="flexor-icons">
                    <div class="pad-r">
                        <span title="add/read comments" class="fa-stack pointer" @click.prevent="showCommentSection(task._id)">
                            <i title="add comment" class="far fa-comment fa-stack-1x"></i>
                            <p class="fa-stack comment-number">{{comments.length}}</p>
                        </span>
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
                <div class="list-group pad-t">
                    <div class="list-group-item justify-content-between" v-for="comment in comments">
                        <comment :comment="comment"></comment>
                    </div>
                </div>
            </div>
            <div>
                <form @submit.prevent="addComment" class="pad-t">
                    <input type="text" name="body" placeholder="add comment" v-model="createdComment.body">
                    <button type="submit" class="btn btn-submit" hidden>Add Comment</button>
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
                this.createdComment = {}
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
    .fa-stack-1x {
        font-size: 1.5rem;
    }

    .comment-number {
        font-family: 'Quattrocento Sans', sans-serif;
        font-size: .8rem;
        padding-top: .2rem;
        padding-left: .7rem;
    }

    .list-group-item {
        padding: .5rem .6rem
    }

    .pad-t {
        padding-top: 1rem
    }

    input {
        border-radius: .25rem;
        border: 1px solid #e2e2e2;
        padding: .25rem 0;
        width: 100%
    }

    .tasks {
        width: 100%
    }

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

    h5 {
        font-family: 'Quattrocento Sans', sans-serif;
        margin-bottom: 0
    }
</style>