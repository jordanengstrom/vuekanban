<template>
  <div class="Home">
    <navbar :user="user"></navbar>
    <div class="bg">
      <div class="container">
        <div class="marg">
          <div class="flexor">
            <div class="boards-title">
              <h2 class="planks-title">Your Planks</h2>
            </div>
            <div class="aligner">
              <div class="dropleft">
                <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-plus"></i>
                </button>
                <div class="dropdown-menu">
                  <form @submit.prevent="addBoard()">
                    <input type="text" name="name" placeholder="Board Name" v-model="createdBoard.name">
                    <!-- <button type="submit" class="btn btn-submit">Create Board</button> -->
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div class="list-group">
              <div v-for="board in boards" class="list-group-item">
                <div class="flexor">
                  <div>
                    <router-link :to="{path: '/board/' + board._id}">
                      <h4 class="board-links">
                        <i class="fas fa-map-pin"></i> {{board.name}}</h4>
                    </router-link>
                  </div>
                  <div class="flexor2">
                    <transition-group name="" enter-active-class="animated flipInX" leave-active-class="animated fadeOut">
                      <div :key="board._id" v-if="show == true && boardId == board._id">
                        <form @submit.prevent="editBoard">
                          <input type="text" placeholder="change board name" name="name" value="">
                          <input type="text" :placeholder="board._id" name="id" :value="board._id" hidden>
                          <button type="submit" class="btn" hidden>Change Name</button>
                        </form>
                      </div>
                      <div :key="board.name" v-else></div>
                    </transition-group>
                  </div>
                  <div class="faButtons">
                    <i class="fas effect fa-wrench pointer" @click="showForm(board._id)"></i>
                    <i class="far effect fa-minus-square pointer" @click="deleteBoard(board)"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
  import Navbar from './Navbar'
  export default {
    name: 'Home',
    // This is temporary data that Home.vue and it's methods have access too.
    // It's inaccessible outside of this file.
    data() {
      return {
        createdBoard: {},
        show: false,
        boardId: ''
      }
    },
    mounted() {
      this.$store.dispatch('authenticate')
      this.$store.dispatch('getBoards')

    },
    methods: {
      getBoards() {
        this.$store.dispatch('getBoards')
      },
      addBoard() {
        this.$store.dispatch('addBoard', this.createdBoard)
        this.createdBoard = {}
        // $('hide.bs.dropdown').dropdown()
      },
      deleteBoard(board) {
        this.$store.dispatch('deleteBoard', board)
      },
      editBoard(event) {
        var form = event.target
        this.$store.dispatch('editBoard', { name: form.name.value, _id: form.id.value })
        this.show = false
      },
      showForm(boardId) {
        // local storage from returned data
        this.formhidden
        if (this.show) {
          this.show = false
        } else {
          this.show = true
        }
        this.boardId = boardId
      }
    },
    computed: {
      boards() {
        return this.$store.state.boards
      },
      user() {
        return this.$store.state.user
      }
    },
    components: {
      Navbar
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .planks-title {
    color: #6c6c6d;
  }

  a:hover {
    text-decoration: none;
  }

  .dropdown-toggle {
    background-color: #797691;
    color: #fff
  }

  .pointer {
    cursor: pointer;
  }

  .hidden {
    visibility: hidden;
  }

  .boards-title {
    text-align: center;
    margin: 1.5rem 0;
    font-family: 'Paytone One', sans-serif;
  }

  .flexor {
    display: flex;
    justify-content: space-between;
  }

  .flexor2 {
    display: flex
  }

  .boards-title h2 {
    font-weight: 700;
  }

  .aligner {
    align-self: center;
  }

  .dropdown-menu {
    margin-top: 3px;
    padding: 0;
  }

  ::-webkit-input-placeholder {
    text-align: center;
  }

  .faButtons {
    font-size: 1rem;
    /* color: #444444; */
    /* color: #c69376; */
    color: #5e796c;
  }

  .fa-wrench:hover {
    transition: all 0.3s linear;
    color: #ffee93;
  }

  .fa-minus-square:hover {
    transition: all 0.3s linear;
    color: #ce3c29
  }

  .bg {
    background-image: url('../assets/vuekanban-bg.jpg');
    background-size: cover;
    background-position: center;
  }

  .effect {
    transition: (all .5s ease-in-out)
  }

  .marg {
    margin: 0 10rem;
    padding-bottom: 3rem;
  }

  .board-links {
    font-family: 'Quattrocento Sans', sans-serif;
    color: #c69376;
    font-weight: 700;
    margin-bottom: 0
    /* color: #6c948c; */
    /* color: #5e796c; */
  }

  .list-group-item {
    margin-bottom: 0.25rem;
  }

  .list-group-item:hover {
    background-color: #f9f9f9;
  }

  .fa-map-pin {
    padding-right: 1rem;
    color: #797691;
    /* color: #5e796c; */
  }

  .border-links h4 {
    text-decoration: none;
  }

  .dropleft .dropdown-toggle::before {
    margin-right: 0;
    vertical-align: 0;
    visibility: hidden;
    border-top: 0;
    border-right: 0;
    border-bottom: 0;
  }
</style>