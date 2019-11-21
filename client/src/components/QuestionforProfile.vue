<template>
  <div class="qright col-12">
    <b-card class="text-center">
    <div class="bg-light text-dark">
      <a class='aheader' style='cursor: pointer' @click='goToTitle(getQuestion._id)'>{{ getQuestion.title }}</a>
      <div class="tagss">
      <div class="col-8 tagss">
      <div v-for='(tag,i) in getQuestion.tags' :key='i'>
        <Tag :get-tag='tag'/>
      </div>
      <!-- <h6>{{ answerData.length }} Answer</h6><unicon name='fast-mail'></unicon> -->
      </div>
      <div class="col-4">
      <div class="userright">
        by:<unicon name='user'></unicon><a href='#'>{{ getQuestion.UserId.username }}</a>
      </div>
      </div>
    </div>
    </div>
    </b-card>
  </div>
</template>

<script>
import Tag from './Tag'

export default {
  props: ['getQuestion'],
  components: {
    Tag
  },
  methods: {
    goToTitle (id) {
      this.$router.push(`/detail/${id}`)
    }
  }
}
</script>

<style>

</style>