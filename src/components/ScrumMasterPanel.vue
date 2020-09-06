<template>
    <b-card title="Scrum Master Panel" :sub-title="`${activeStory.name} is active`" class="mt-5 scrum-master-panel">
        <div
            v-for="user in users"
            :key="user.name">
            {{ user.name }}:
            <span v-if="!user.vote">Not Voted</span>
            <span v-else>{{ isCurrentStoryVoted ? user.vote : 'Voted' }}</span>
        </div>

        <div v-show="isCurrentStoryVoted && !isAllStoryPointsSame">
          <label
          for="story-point-input"
          class="mt-5">
          Seems team has different votes, please discuss and vote:
          </label>
              <b-form-input
                  id="story-point-input"
                  type="number"
                  :value="getAvarageStoryPoint"
                  required/>
        </div>

        <b-button
        class="mt-5"
        variant="outline-primary"
        :disabled="this.users.length === 1 || !isCurrentStoryVoted || isAllStoriesVoted"
        @click="endVoting">
        {{ isAllStoriesVoted ? 'All tasks are voted. Have a nice sprint 🥳' : `End Voting For ${activeStory.name}`}}
        </b-button>
    </b-card>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ScrumMasterPanel',

  computed: {
    ...mapState({
      users: 'users',
      stories: 'stories'
    }),

    ...mapGetters({
      activeStory: 'getActiveStory'
    }),

    isAllStoriesVoted () {
      return this.stories.every(story => story.storyPoint !== '')
    },

    isCurrentStoryVoted () {
      return this.users.every(user => user.vote !== '')
    },

    isAllStoryPointsSame () {
      return this.users.length === this.users.filter(user => user.vote === this.users[0].vote).length
    },

    getAvarageStoryPoint () {
      const votes = this.users.filter(user => typeof user.vote === 'number').map(user => user.vote)

      if (votes.length) {
        return Math.round(votes.reduce((prevVote, nextVote) => (prevVote + nextVote)) / votes.length)
      }

      return 0
    }
  },

  methods: {
    ...mapMutations(['setStoryPointToStory']),

    endVoting () {
      const storyPoint = this.isAllStoryPointsSame
        ? this.getAvarageStoryPoint : Number(document.getElementById('story-point-input').value)

      this.setStoryPointToStory({ story: this.activeStory, storyPoint: storyPoint })
    }
  }
}
</script>

<style lang="scss" scoped>
#story-point-input {
    width: 100px;
}
.scrum-master-panel {
    min-height: 550px;
}
</style>
