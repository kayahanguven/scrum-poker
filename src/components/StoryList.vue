<template>
    <b-card title="Stories" class="mt-5 stories-card">
        <b-table hover :items="storyList"/>
    </b-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'StoryList',

  computed: {
    ...mapState({
      storyList: 'stories'
    })
  }
}
</script>

<style lang="scss">
.stories-card {
  min-height: 550px;
}
</style>
