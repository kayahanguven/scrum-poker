import Vue from 'vue'
import Vuex from 'vuex'
import { setDataToFirebase } from '../mixin/helper.mixin'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentUser: localStorage.getItem('userName') || '',
    stories: [],
    users: []
  },
  actions: {
    flushVotes (context) {
      const users = context.state.users.map(user => {
        return {
          ...user,
          vote: ''
        }
      })

      setDataToFirebase('users', users)

      context.commit('flushVotes', users)
    }
  },
  mutations: {
    setStories (state, data) {
      state.stories = data
    },
    setUsers (state, data) {
      state.users = data
    },
    setCurrentUser (state, data) {
      state.currentUser = data

      localStorage.setItem('userName', data)
    },
    setStoryPoint (state, data) {
      const userIndex = state.users.findIndex(user => user.name === state.currentUser)

      state.users[userIndex].vote = data

      setDataToFirebase('users', state.users)
    },
    setStoryPointToStory (state, data) {
      var storyIndex = state.stories.findIndex(story => story.name === data.story.name)

      data.story.storyPoint = data.storyPoint
      data.story.status = 'Voted'

      if (state.stories.length !== storyIndex + 1) {
        state.stories[storyIndex] = data.story
        state.stories[(storyIndex + 1)].status = 'Active'
      }

      setDataToFirebase('stories', state.stories)
      setDataToFirebase('storyVoted', new Date().getTime())
    },
    flushVotes (state, data) {
      state.users = data
    }
  },
  getters: {
    getActiveStory (state) {
      const activeStory = state.stories.find(story => story.status === 'Active')

      if (!activeStory && state.stories.length) {
        return state.stories[state.stories.length - 1]
      }

      return state.stories.find(story => story.status === 'Active') || {}
    }
  },
  modules: {
  }
})
