<template>
  <b-container fluid>
    <b-row>
      <b-col>
        <story-list/>
      </b-col>
      <b-col md="3">
        <story-points/>
      </b-col>
      <b-col md="5" v-if="isScrumMaster">
        <scrum-master-panel></scrum-master-panel>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import fire from '../firebase'
import ScrumMasterPanel from '../components/ScrumMasterPanel'
import StoryList from '../components/StoryList'
import StoryPoints from '../components/StoryPoints'
import { checkRoomAvailability } from '../mixin/helper.mixin'

export default {
  components: {
    StoryList,
    StoryPoints,
    ScrumMasterPanel
  },

  async mounted () {
    const storiesRef = fire.database().ref(`${this.$route.params.id}/stories`)
    const usersRef = fire.database().ref(`${this.$route.params.id}/users`)
    const that = this

    storiesRef.on('value', snapshot => {
      that.setStories(snapshot.val())
    })

    usersRef.on('value', snapshot => {
      that.setUsers(snapshot.val())
    })

    if (!this.currentUser) {
      const users = await (await usersRef.once('value')).val()

      if (!await checkRoomAvailability(users)) {
        that.$router.push('/room/create')

        return
      }

      that.addNewUser(usersRef, users)
    }
  },

  computed: {
    ...mapState({
      currentUser: 'currentUser',
      users: 'users'
    }),

    isScrumMaster () {
      return this.currentUser === 'Scrum Master'
    }
  },

  methods: {
    ...mapMutations(['setStories', 'setUsers', 'setCurrentUser']),

    addNewUser (usersRef, users) {
      const userName = `Developer ${users.length}`

      this.setCurrentUser(userName)

      users.push({ name: userName, vote: '' })
      usersRef.set(users)
    }
  }
}
</script>
