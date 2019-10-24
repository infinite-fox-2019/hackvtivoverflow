<template>
    <section style="margin-top: 20px;">
        <h3 class="title">Write Your Question</h3>
        <form @submit.prevent="addQuestion" enctype="multipart/form-data">
            <b-field label="Title">
                <b-input placeholder="Title" v-model="title"></b-input>
            </b-field>

            <b-field label="Article content">
                <wysiwyg style="min-height: 180px;" v-model="description"  />
            </b-field>

            <b-field label="Tag"
                type="is-info"
                message="use spaces if there are more than one tags">
                <b-input placeholder="Tags" v-model="tag"></b-input>
            </b-field>

            <div class="buttons">
                <span @click="addQuestion" class="button is-info">Publish</span>
                <span @click="cancel" class="button is-danger is-outlined">Cancel</span>
            </div>
        </form>
    </section>
</template>

<script>
import 'vue-wysiwyg/dist/vueWysiwyg.css'
import axios from 'axios'

export default {
  name: 'AddQuestion',
  data () {
    return {
      title: '',
      description: '',
      tag: '',
      isFullPage: true
    }
  },
  methods: {
    addQuestion () {
      const loadingComponent = this.$buefy.loading.open({
        container: this.isFullPage ? null : this.$refs.element.$el
      })
      axios({
        method: 'post',
        url: `http://localhost:3000/question`,
        data: {
          title: this.title,
          description: this.description,
          tag: this.tag
        },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(() => {
          setTimeout(() => loadingComponent.close(), 1 * 2000)
          setTimeout(() => this.$buefy.toast.open({
            message: 'Publish Article Success..',
            type: 'is-success'
          }), 2000)
          setTimeout(() => this.$emit('afterWrite', false), 1 * 1900)
        })
        .catch(() => {
          setTimeout(() => loadingComponent.close(), 1 * 2000)
          setTimeout(() => this.$buefy.toast.open({
            message: 'Sorry your request is not complete..',
            type: 'is-danger'
          }), 1 * 2000)
        })
    }
  }
}
</script>
