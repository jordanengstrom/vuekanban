<template>
  <div class="Home">
<nav class="navbar navbar-light bg-light">
    <div>
      <h3 class="navbar-brand">
          <i class="fas fa-map-pin"></i> All aBoard
      </h3>  
    </div>
    <div>
      <p>{{user.username}}</p>
      <p>logout button</p>
    </div>
  </nav>
  <div>
    <div>
      <h2>Get aBoard you Boards</h2>
      <div>
          <!-- <i class="fas fa-2x fa-plus-square" @click="addBoard"></i> -->
          <form @submit.prevent="addBoard()">
            <input type="text" name="name" placeholder="Board Name" v-model="createdBoard.name">
            <button type="submit" class="btn btn-submit">Create Board</button>
          </form>
      </div>
    </div>

    <div>
      <div class="list-group">
        <div v-for="board in boards" class="list-group-item">
          <div>
            <div>
            <router-link :to="{path: '/board/' + board._id}" >
              <h4>{{board.name}}</h4>
            </router-link>
              <i class="fas fa-minus-square pointer" @click="deleteBoard(board)"></i>
              <!-- <i class="fas fa-pen-square" @click="editBoard(board)"></i> -->
            </div>
            <form @submit.prevent="editBoard">
              <input type="text" :placeholder="board.name" name="name" value="">
              <input type="text" :placeholder="board._id" name="id" :value="board._id" hidden>
              <!-- <input class="" type="text" :value="board._id"> -->
          
              <button type="submit" class="brtn btn-submit">Submit</button>
            </form>
          </div>
        </div>

      </div>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // This is temporary data that Home.vue and it's methods have access too.
  // It's inaccessible outside of this file.
  data () {
    return {
      createdBoard: {}
    }
  },
  mounted(){
    this.$store.dispatch('getBoards')
  },
  methods: {
    getBoards(){
      this.$store.dispatch('getBoards')
    },
    addBoard() {
      this.$store.dispatch('addBoard',this.createdBoard)
    },
    deleteBoard(board) {
      this.$store.dispatch('deleteBoard', board)
    },
    editBoard(event) {
      var form = event.target
      this.$store.dispatch('editBoard', {name: form.name.value, _id: form.id.value})
      this
    }
  },
  computed:{
    boards(){
      return this.$store.state.boards
    },
    user(){
      return this.$store.state.user
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pointer {
    cursor: pointer;
  }
  .hidden{
    visibility: hidden;
  }

</style>
