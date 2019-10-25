<template>
<div>
  <div v-for="question in questions" :key="question._id">
    <div class="left">
      <article class="media">
        <figure class="media-left">
          <p class="vote">{{question.value}}</p>
          <p class="vote">votes</p>
          <p class="vote">0</p>
          <p class="vote">answer</p>
        </figure>
        <div class="media-content">
          <div class="content">
              <h5 class="title is-5"> <a @click="detailQuestion(question._id)">{{question.title}}</a></h5>
              <p v-html="question.description"></p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <div style="display: inline;margin: 5px;" v-for="(tag, index) in question.tag" :key="index">
                  <b-tag style="background-color: hsl(216, 41%, 82%); height:18px;color: rgb(30, 97, 160)">{{ tag }}</b-tag>
              </div>
            </div>
          </nav>
        </div>
      </article>
      </div><hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListQuestion',
  data () {
    return {
    }
  },
  methods: {
    detailQuestion (id) {
      this.$emit('detail', id)
    }
  },
  computed: {
    questions: {
      get () {
        return this.$store.state.questions
      }
    }
  },
  watch: {
    questions () {}
  },
  created () {
    this.$store.dispatch('getQuestion')
  }
}
</script>
<style scoped>
.left {
  margin-left: 2%;
}
.vote {
  font-size: 14px;
  text-align: center;
}
a {
  color: rgb(71, 70, 70);
}
a:hover {
  color: rgb(30, 97, 160) !important;
}
.media-left {
  margin-right: 40px;
}
</style>
