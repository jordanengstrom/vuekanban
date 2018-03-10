<template>
    <div class="lists">
        <div class="card" style="width: 18rem;">
            <div class="card-body">
                <div class="flexor">
                    <div>
                        <h4 class="card-title">{{list.name}}</h4>
                    </div>
                    <div class="aligner">
                        <div class="dropleft">
                            <!-- <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> -->
                            <i data-toggle="dropdown" class="fas fa-plus pointer"></i>
                            <!-- </button> -->
                            <div class="dropdown-menu">
                                <form @submit.prevent="addTask()">
                                    <input type="text" name="name" placeholder="add task" v-model="createdTask.body">
                                    <button type="submit" class="btn btn-submit" hidden>Create Task</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="list-group">
                    <div class="list-group-item d-flex justify-content-between" v-for="task in tasks">
                        <task :task="task"></task>
                    </div>
                </div>
            </div>
            <div class="flex-center">
                <div class="dropdown">
                    <i data-toggle="dropdown" title="additional options" class="fas fa-ellipsis-h pointer"></i>
                    <div class="dropdown-menu">
                        <div class="dropdown-item">
                            <form @submit.prevent="editList">
                                <input type="text" placeholder="rename list" name="name" value="">
                                <input type="text" :placeholder="list._id" name="id" :value="list._id" hidden>
                                <button type="submit" class="brtn btn-submit" hidden></button>
                            </form>
                        </div>
                        <div class="dropdown-item">
                            <button class="btn btn-outline-danger btn-block" @click="deleteList(list)">delete</button>
                            <!-- <i class="fas fa-minus-square pointer" ></i> -->
                        </div>
                    </div>
                </div>
            </div>
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
                this.createdTask = {};
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

<style scoped>
    input {
        border-radius: .25rem;
        border: 1px solid #e2e2e2;
        padding: .25rem 0
    }
    .flex-center {
        display: flex;
        justify-content: center;
        padding-bottom: .75rem;
    }

    .list-group-item {
        padding: .5rem .75rem;
        margin-bottom: .5rem
    }

    .fa-plus {
        font-size: 1rem;
        padding: 0;
        color: #797691;
    }

    .aligner {
        align-self: center;
    }

    .dropdown-menu {
        margin-top: 3px;
        padding: 0;
    }

    .flexor {
        margin-bottom: 1rem;
        display: flex;
        justify-content: space-between;
    }

    .dropdown-toggle {
        /* background-color: #797691; */
        color: #fff
    }

    .pointer {
        cursor: pointer;
    }

    .dropleft .dropdown-toggle::before {
        margin-right: 0;
        vertical-align: 0;
        visibility: hidden;
        border-top: 0;
        border-right: 0;
        border-bottom: 0;
    }

    .card-title {
        margin-bottom: 0;
        font-family: 'Quattrocento Sans', sans-serif;
    }

    ::-webkit-input-placeholder {
        text-align: center;
    }
</style>