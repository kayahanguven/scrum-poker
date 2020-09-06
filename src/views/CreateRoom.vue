<template>
  <b-container class="mt-3">

    <b-row>
      <b-col md="6">
        <b-form-input
          v-model="form.sessionName"
          :state="validateState('sessionName')"
          @input="$v.form.sessionName.$touch()"
          placeholder="Session Name"
          type="text"
          max-length="200"
          aria-describedby="session-name-feedback"
          required/>
        <b-form-invalid-feedback id="session-name-feedback">
          This is a required field and must be filled. Max 200 character.
        </b-form-invalid-feedback>
      </b-col>

      <b-col md="6">
        <b-form-input
        v-model="form.numberOfVoters"
        :state="validateState('numberOfVoters')"
        @input="$v.form.numberOfVoters.$touch()"
        placeholder="Number Of Voters"
        type="number"
        aria-describedby="number-of-voters-feedback"
        required/>
        <b-form-invalid-feedback id="number-of-voters-feedback">
          This is a required field and must be filled. Only numbers are allowed.
        </b-form-invalid-feedback>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12" class="mt-3">
        <b-form-group
        label="Paste your story list (Each line will be converted as a story)"
        label-for="stories">
          <b-form-textarea
            id="stories"
            :state="validateState('stories')"
            rows="8"
            v-model="form.stories"
            aria-describedby="stories-feedback"/>
          <b-form-invalid-feedback id="stories-feedback">
          This is a required field and must be filled. Only numbers are allowed.
        </b-form-invalid-feedback>
        </b-form-group>
      </b-col>
    </b-row>

    <b-row>
      <b-col md="12" class="mt-3">
        <b-button @click="startSession" variant="primary" class="float-right">Start Session</b-button>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapMutations } from 'vuex'
import { generateRoomId, setDataToFirebase } from '../mixin/helper.mixin'
import { validationMixin } from 'vuelidate'
import { required, numeric, not } from 'vuelidate/lib/validators'

export default {
  name: 'CreateRoom',

  mixins: [validationMixin],

  data () {
    return {
      form: {
        sessionName: '',
        numberOfVoters: '',
        stories: ''
      }
    }
  },

  validations: {
    form: {
      sessionName: {
        required
      },
      numberOfVoters: {
        required,
        numeric,
        not: not((number) => number === '0')
      },
      stories: {
        required
      }
    }
  },

  methods: {
    ...mapMutations(['setCurrentUser']),

    validateState (name) {
      const { $dirty, $error } = this.$v.form[name]

      return $dirty ? !$error : null
    },

    startSession () {
      this.$v.form.$touch()

      if (this.$v.form.$anyError) {
        return
      }

      const roomId = generateRoomId()
      const stories = this.convertStories(this.form.stories.split('\n').filter(story => story !== ''))
      const userName = 'Scrum Master'

      this.setCurrentUser(userName)

      setDataToFirebase('users', [{ name: userName, vote: '' }], roomId)
      setDataToFirebase('stories', stories, roomId)
      setDataToFirebase('sessionName', this.form.sessionName, roomId)
      setDataToFirebase('maxUserCount', this.form.numberOfVoters, roomId)

      this.$router.push(`/room/${roomId}`)
    },

    convertStories (stories) {
      var newStories = []

      stories.forEach((story, index) => {
        newStories.push({
          name: story,
          storyPoint: '',
          status: index === 0 ? 'Active' : 'Not Voted'
        })
      })

      return newStories
    }
  }
}
</script>
