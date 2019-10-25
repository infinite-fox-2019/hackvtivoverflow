<template>
<div>
  <div class="nav is-white">
      <span class=" judul subtitle is-4" style="margin: auto">All Questions</span>
      <div class="buttons">
          <b-button class="button is-info" @click="addQuestion" role="button" style="display: inline; font-size: 13px">Ask Question</b-button>
      </div>
  </div>
  <p class="total-question">123456 Question</p><hr>
  <ListQuestion v-if="status==='list'" @detail="detail"/>
  <AddQuestion v-else-if="status==='form'" />
  <DetailQuestion v-else-if="status==='detail'" :questionDetail="questionDetail"/>
</div>
</template>

<script>
import ListQuestion from '../components/ListQuestion'
import AddQuestion from '../components/form/AddQuestion'
import DetailQuestion from '../components/DetailQuestion'

export default {
  name: 'MainContent',
  components: {
    ListQuestion,
    AddQuestion,
    DetailQuestion
  },
  data () {
    return {
      status: this.$store.state.status,
      questionDetail: {}
    }
  },
  methods: {
    addQuestion () {
      this.status = 'form'
    },
    detail (id) {
      this.$store.dispatch('getDetailQuestion', id)
        .then(data => {
          this.questionDetail = data
        })
      this.status = 'detail'
      this.$router.push('/detail')
      this.questionDetail = this.$store.state.detailQuestion
    },
    getStatus () {
      this.status = this.$store.state.status
    }
  },
  watch: {
    detail () {},
    getStatus () {}
  },
  created () {
    this.questionDetail = this.$store.state.detailQuestion
  }
}
</script>
<style scoped>
.nav {
  margin-top: 5px;
  margin-left: -70%;
  z-index: -1;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.total-question {
  margin-left: 2%;
  font-size: 13px;
  margin-bottom: -10px;
  padding-bottom: -5px;
}
</style>
