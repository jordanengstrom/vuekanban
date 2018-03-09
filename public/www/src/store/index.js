import vue from 'vue'
import vuex from 'vuex'
import axios from 'axios'

import router from "../router/index";

var auth = axios.create({
    baseURL: '//localhost:3000/auth/',
    withCredentials: true
});

var serverAPI = axios.create({
    baseURL: '//localhost:3000/api/',
    withCredentials: true
});

vue.use(vuex)

export default new vuex.Store({
    state: {
        user: {},
        board: {},
        boards: [],
        lists: [],
        tasks: {},
        comments: {}
    },
    mutations: {
        setComments(state, payload) {
            vue.set(state.comments, payload.taskId, payload.comments)
        },
        setTasks(state, payload) {
            console.log("moved task payload: ", payload);
            vue.set(state.tasks, payload.listId, payload.tasks)
        },
        setLists(state, payload) {
            state.lists = payload
        },
        setBoards(state, payload) {
            console.log(payload)
            payload.sort(function(a,b){
                return new Date(a.date) - new Date(b.date);
              });
            state.boards = payload
        },
        setBoard(state, payload) {
            state.board = payload
        },
        // START AUTH MUTATIONS
        loginUser(state, payload) {
            state.user = payload
        },
        clearData(state, payload) {
            state.user = {},
            state.board = {},
            state.boards = [],
            state.lists = [],
            state.tasks = {},
            state.comments = {}
        }
    },
    actions: {

        // region COMMENTS
        getComments({ commit, dispatch }, payload) {
            serverAPI.get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload.taskId + '/comments')
                .then(res => {
                    commit('setComments', { taskId: payload.taskId, comments: res.data })
                })
                .catch(err => {
                    console.log(err);
                })
        },
        addComment({commit, dispatch}, payload) {
            serverAPI.post('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload.taskId + '/comments', payload)
                .then(res => {
                    dispatch('getComments', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteComment({commit, dispatch}, payload) {
            serverAPI.delete('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload.taskId + '/comments/' + payload._id)
                .then(res => {
                    dispatch('getComments', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // endregion COMMENTS

        // region TASKS
        moveToList({commit, dispatch}, payload) {
            console.log("Moved task:", payload);
            serverAPI.put('boards/' + payload.task.boardId + '/lists/' + payload.listId + '/tasks/' + payload.task._id,
                 {boardId: payload.task.boardId,
                 body: payload.task.body,
                 listId: payload.listId})
                .then(res => {
                    console.log(res.data)
                    dispatch('getTasks', 
                        {listId: res.data.listId,
                         boardId: res.data.boardId
                        })
                    dispatch('getTasks', 
                        {boardId: res.data.boardId, 
                         listId: payload.oldId})
                })
                .catch(err => {
                    console.log(err)
                })
        },
        getTasks({ commit, dispatch }, payload) {
            serverAPI.get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks')
                .then(res => {
                    commit('setTasks', { listId: payload.listId, tasks: res.data })
                })
                .catch(err => {
                    console.log(err);
                })
        },
        // getUpdatedTasks({commit, dispatch}, payload) {
        //     serverAPI.get('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks')
        //         .then(res => {
        //             console.log("Setting tasks with: ", res.data)
        //             commit('setTasks', res.data)
        //             })
        //         .catch(err => {
        //             console.log(err)
        //         })
        // },
        deleteTask({ commit, dispatch }, payload) {
            serverAPI.delete('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload._id)
                .then(res => {
                    dispatch('getTasks', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addTask({ commit, dispatch }, payload) {
            serverAPI.post('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks', payload)
                .then(res => {
                    dispatch('getTasks', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        editTask({ commit, dispatch }, payload) {
            serverAPI.put('boards/' + payload.boardId + '/lists/' + payload.listId + '/tasks/' + payload._id, payload)
                .then(res => {
                    dispatch('getTasks', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // endregion   

        // region LISTS
        getLists({ commit, dispatch }, payload) {
            serverAPI.get('boards/' + payload + '/lists')
                .then(res => {
                    commit('setLists', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addList({ commit, dispatch }, payload) {
            serverAPI.post('boards/' + payload.boardId + '/lists', payload.name)
                .then(res => {
                    dispatch('getLists', res.data.boardId);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteList({ commit, dispatch }, payload) {
            serverAPI.delete('boards/' + payload.boardId + '/lists/' + payload.listId)
                .then(res => {
                    dispatch('getLists', res.data)
                })
                .catch(err => {
                    console.log(err);
                })
        },
        editList({ commit, dispatch }, payload) {
            serverAPI.put('boards/' + payload.boardId + '/lists/' + payload._id, payload)
                .then(res => {
                    dispatch('getLists', res.data.boardId)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        // endregion

        // region BOARDS
        getBoards({ commit, dispatch }, payload) {
            serverAPI.get('boards')
                .then(res => {
                    commit('setBoards', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        getBoard({ commit, dispatch }, payload) {
            serverAPI.get('boards/' + payload)
                .then(res => {
                    commit('setBoard', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },

        addBoard({ commit, dispatch }, payload) {
            serverAPI.post('boards', payload)
                .then(res => {
                    dispatch('getBoards');
                })
                .catch(err => {
                    console.log(err);
                })
        },

        deleteBoard({ commit, dispatch }, payload) {
            serverAPI.delete('boards/' + payload._id)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.log(err)
                })
        },

        editBoard({ commit, dispatch }, payload) {
            serverAPI.put('boards/' + payload._id, payload)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.log(err)
                })
        },

        // endregion


        //region START AUTH ROUTES
        login({ commit, dispatch }, payload) {
            auth.post('login', payload)
                .then(res => {
                    commit('loginUser', res.data.user)
                    router.push({ name: 'Home' })
                    // dispatch('getMyTunes') //ALLOWS FAV MUSIC TO POPULATE ON LOGIN
                })
                .catch(err => {
                    console.log(err);
                    console.log('INVALID USERNAME OR PASSWORD')
                })
        },
        authenticate({ commit, dispatch }) {
            auth.get('authenticate')
                .then(res => {
                    commit('loginUser', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        signup({ commit, dispatch }, payload) {
            auth.post('register', payload)
                .then(res => {
                    console.log(res.data.user)
                    commit('loginUser', res.data.user)
                    router.push({ name: 'Home' })
                })
                .catch(err => {
                    console.log(err)
                })
        },
        logout({ commit, dispatch }) {
            auth.delete('logout')
                .then(res => {
                    commit('loginUser', {})
                    commit('clearData', res)
                    router.push({name: 'Login'})
                })
        }
        //endregion END AUTH ACTIONS

    }
})