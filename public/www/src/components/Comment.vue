<template>
    <div class="comment">
        <div class="flex-center">
            <div>
                <p>{{comment.body}}</p>
            </div>
            <div class="dropdown">
                <i data-toggle="dropdown" title="additional options" class="far fa-times-circle size-color pointer"></i>
                <div class="dropdown-menu">
                    <div class="dropdown-item">
                        <button class="btn btn-outline-danger btn-block" @click="deleteComment(comment)">delete</button>
                        <!-- <i class="fas fa-minus-square pointer" ></i> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Comment',
        data() {
            return {
            }
        },
        methods: {
            deleteComment(comment) {
                this.$store.dispatch('deleteComment', comment)
            }
        },
        props: ['comment']
    }
</script>

<style scoped>
    .flex-center {
        display: flex;
        justify-content: space-between;
    }
    .flex-center p {
        margin-bottom: 0
    }
    .pointer{
        cursor: pointer;
    }
    .size-color{
        color: #333;
        font-size: .7rem
    }
</style>