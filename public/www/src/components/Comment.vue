<template>
    <div class="comment">
        <p>{{comment.body}}</p>
        <div><i class="fas fa-minus-square pointer" @click="deleteComment(comment)"></i></div>
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

<style>

</style>
