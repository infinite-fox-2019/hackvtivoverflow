<template>
  <div class="myhome">
    <div class="d-flex justify-content-between">
      <button @click.prevent="toAskQuestions" class="btn btn-info mybtn">Ask Questions</button>
      <h1 @click.prevent="getQuestions" class="mr-3" >All Questions</h1>
    </div>
    <div class="d-flex dashboard">
      <SideBar />
      <CardQuestion :questions="questions" :actions="0"/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CardQuestion from '@/components/CardQuestion'
import SideBar from '@/components/SideBar'
import { mapState } from 'vuex'
export default {
  name: 'home',
  components: {
    CardQuestion,
    SideBar
  },
  computed: mapState(['questions']),
  methods: {
    toAskQuestions () {
      this.$router.push('/ask')
    },
    getQuestions () {
      this.$store.dispatch('getQuestion', ' ')
    }
  },
  created () {
    this.$store.dispatch('getQuestion', ' ')
  }
}
</script>

<style>
.mybtn{
  width: 20%;
  margin: 5px 1px;
}

.myhome{
  padding-bottom: 100px;
}

.myhome h1 {
  cursor: pointer;
}

.dashboard {
  width: 100%;
}

</style>
