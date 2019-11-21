<template>
<div class='askk'>
    <div>
        <b-form-group label="Choose Tags :">
            <b-form-checkbox-group
                id="checkbox-group-1"
                v-model="tags"
                :options="options"
                name="flavour-1"></b-form-checkbox-group>
            <div>
                <form v-if='customTag' @submit.prevent='toArray'>
                    <input type='text' placeholder="custom tag" v-model='customtags'>
                        <input
                            type='submit'
                            class="btn-outline-success btn btn-md"
                            v-if='customTag'
                            value='add tag'></form>
                    </div>
                    <button
                        class="btn-outline-success btn btn-md"
                        v-if='!customTag'
                        @click='customTagClick'>Custom Tag</button>
                </b-form-group>

                <b-form-group
                    id="fieldset-1"
                    description="Let us know your title."
                    label="Enter your title"
                    label-for="input-1"
                    :invalid-feedback="invalidFeedback"
                    :valid-feedback="validFeedback"
                    :state="state">
                    <b-form-input id="input-1" v-model="titles" :state="state" trim="trim"></b-form-input>
                </b-form-group>

                <p>
                    <vue-editor v-model='question'></vue-editor>
                </p>
                <b-col align='center'>
                    <b-button size='md' variant='primary' @click='sendQuestion()'>Create Question</b-button>
                </b-col>

            </div>
        </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  data () {
    return {
      titles: '',
      question: '',
      customTag: false,
      customtags: null,
      tags: [],
      options: [],
      socket: io.connect('http://localhost:3000')
    }
  },
  methods: {
    fetchTags () {
      const tags = this.$store.state.allTags;
      tags.forEach((el, i) => {
        this.options.push({
          value: el,
          text: el
        })
      })
    },
    toArray () {
      this.options.push({ value: this.customtags, text: this.customtags })
      this.customtags = null
    },
    customTagClick () {
      this.customTag = true;
    },
    sendQuestion () {
      const payload ={ 
      title: this.titles,
      question: this.question,
      tags: this.tags
      }
      this.$store
        .dispatch('sendQuestion', payload)
        .then(data => {
          this.$awn.success(data.msg)
          this.$store.dispatch('fetchTags')
          setTimeout(() => {
            this.$router.push('/')
          }, 1200);
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg+' please Login First')
          this.$router.push('/login')
        })
    }
  },
  computed: {
    state() {
      return this.titles.length >= 6 ? true : false
    },
    invalidFeedback() {
      if (this.titles.length > 6) {
        return ''
      } else if (this.titles.length > 0) {
        return 'Enter at least 6 characters'
      } else {
        return 'Need Title'
      }
    },
    validFeedback() {
      return this.state === true ? 'Good Title' : ''
    },
  },
  created () {
    this.$store.dispatch('fetchTags')
    setTimeout(() => {
      this.fetchTags()
    }, 600);
  }
}
</script>

<style>
.askk {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px
}
</style>