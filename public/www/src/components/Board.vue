<template>
  <div>
    <navbar :user="user"></navbar>
    <div class="board">
      <div class="container-fluid">
        <div class="margins">
          <div class="flexor">
            <div class="boards-title">
              <h2>{{loadBoard.name}}</h2>
            </div>
            <div class="aligner">
              <div class="dropleft">
                <button type="button" class="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <i class="fas fa-plus"></i>
                </button>
                <div class="dropdown-menu">
                  <form @submit.prevent="addList()">
                    <input type="text" name="name" placeholder="List Name" v-model="createdList.name">
                    <button type="submit" class="btn btn-submit" hidden>Create List</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-4" v-for="list in lists">
              <lists class="marg" :list="list" :board="loadBoard"></lists>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script>
  import Navbar from './Navbar'
  import Lists from './Lists'
  export default {
    name: 'Board',
    // This is temporary data that Home.vue and it's methods have access too.
    // It's inaccessible outside of this file.
    data() {
      return {
        createdList: {}
      }
    },
    mounted() {
      this.$store.dispatch('authenticate').then(() => {
        this.$store.dispatch('getBoard', this.$route.params.boardId)
        this.$store.dispatch('getLists', this.$route.params.boardId)
      });
    },
    methods: {
      addList() {
        this.$store.dispatch('addList', {
          name: this.createdList,
          boardId: this.$route.params.boardId
        })
      },
    },
    computed: {
      loadBoard() {
        return this.$store.state.board
      },
      loadList() {
        return this.$store.state.list
      },
      lists() {
        return this.$store.state.lists
      },
      user() {
        return this.$store.state.user
      }

    },
    components: {
      Lists,
      Navbar
    }

  }

</script>

<style scoped>
  .board {
    background-image: url('../assets/wood.png');
    background-size: 400px 400px;
    background-repeat: repeat;
    background-attachment: fixed;
    overflow: hidden;
    min-height: 90vh;
  }

  .margins {
    margin: 0 4rem;
  }

  a:hover {
    text-decoration: none;
  }

  .marg {
    padding-bottom: 2rem;
  }

  .dropdown-menu {
    margin-top: 3px;
    padding: 0;
  }

  .aligner {
    align-self: center;
  }

  .flexor {
    display: flex;
    justify-content: space-between;
  }

  .boards-title {
    color: #6c6c6d;
    text-align: center;
    margin: 1.5rem 0;
    font-family: 'Paytone One', sans-serif;
  }

  .dropdown-toggle {
    background-color: #797691;
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

</style>
