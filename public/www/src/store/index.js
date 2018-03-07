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
        tasks: [],
        comments: []
    },
    mutations: {
        setLists(state,payload) {
            state.lists = payload
        },
        setBoards(state, payload) {
            state.boards = payload
        },
        setBoard(state,payload) {
            state.board = payload
        },
        // START AUTH MUTATIONS
        loginUser(state, payload) {
            state.user = payload
        },
        clearData(state, payload) {
            state.user = {},
                state.boards = [],
                state.lists = [],
                state.tasks = [],
                state.comments = []
        },
    },
    actions: {

        // region LISTS
        getLists({commit, dispatch}, payload) {
            serverAPI.get('boards/' + payload + '/lists')
                .then(res => {
                    commit('setLists', res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        addList({commit, dispatch}, payload){
            console.log(payload)
            serverAPI.post('boards/' + payload.boardId + '/lists', payload.name)
                .then(res => {
                    dispatch('getLists')
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
            console.log(payload._id)
            serverAPI.delete('boards/' + payload._id)
                .then(res => {
                    dispatch('getBoards')
                })
                .catch(err => {
                    console.log(err)
                })
        },

        editBoard({ commit, dispatch }, payload) {
            console.log('EDIT USER ID', payload)
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
            console.log("LOGIN USER DATA", payload)
            auth.post('login', payload)
                .then(res => {
                    console.log("LOGIN USER DATA", res.data.user)
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
                    console.log("LOGIN USER DATA", res.data)
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
                })
        }
        //endregion END AUTH ACTIONS

    }
})