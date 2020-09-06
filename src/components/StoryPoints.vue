<template>
    <b-card title="Story Points" :sub-title="`(Voting for ${activeStory.name})`" class="mt-5 story-points-card">
        <story-card
            v-for="point in storyPoints"
            :key="point"
            :point="point"
            :class="{ selected: point === selectedPoint }"
            @click.native="setPoint(point)">
        </story-card>

        <div class="information">
            <span v-show="selectedPoint !== null">You voted </span>
            {{ this.selectedPoint || 'Please Vote' }}
        </div>
    </b-card>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import fire from '../firebase'
import StoryCard from './StoryCard'

export default {
  components: {
    StoryCard
  },

  data () {
    return {
      selectedPoint: null,
      storyPoints: [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, '?']
    }
  },

  mounted () {
    const storyVotedEvent = fire.database().ref(`${this.$route.params.id}/storyVoted`)
    const that = this

    storyVotedEvent.on('value', snapshot => {
      if (snapshot.val()) {
        that.selectedPoint = null
        that.flushVotes()
      }
    })
  },

  computed: {
    ...mapState({
      currentUser: 'currentUser',
      users: 'users'
    }),

    ...mapGetters({
      activeStory: 'getActiveStory'
    })
  },

  methods: {
    ...mapMutations(['setStoryPoint']),

    ...mapActions(['flushVotes']),

    setPoint (point) {
      this.selectedPoint = point

      this.setStoryPoint(point)
    }
  }
}
</script>

<style lang="scss" scoped>
.information {
    position: absolute;
    bottom: 0;
    font-size: 10px;
    left: 0;
    right: 0;
    margin: auto;
    width: max-content;
}
.story-points-card {
  min-height: 550px;
}
</style>
