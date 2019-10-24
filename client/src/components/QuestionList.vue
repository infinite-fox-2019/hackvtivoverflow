<template>
  <div @click="toDetail(data._id)" style="cursor:pointer;">
      <b-row align-v="center" no-gutters class="p-3 border-bottom border-top">
        <b-col md="1" class="">
          <p class="text-center m-1 p-1">{{votes}}<br>votes</p>
        </b-col>
        <b-col md="1">
          <p class="text-center m-1 p-1">{{data.AnswerId.length}}<br>answer</p>
        </b-col>
        <b-col md="1">
          <p class="text-center m-1 p-1">0<br>views</p>
        </b-col>
        <b-col md="9" class="font-weight-bold text-break pl-4">
          <p class="mb-1">{{data.title}}</p>
          <b-badge href="#" class="mr-2" variant="secondary">javascript</b-badge>
          <b-badge href="#" class="mr-2" variant="secondary">NodeJs</b-badge>
        </b-col>
      </b-row>
  </div>
</template>

<script>
export default {
  name: 'questionlist',
  props: ['data'],
  data () {
    return {
      votes: this.data.upvotes.length - this.data.downvotes.length
    }
  },
  created () {
    // console.log(this.data)
  },
  methods: {
    toDetail (id) {
      this.$router.push(`/question/${id}`)
    }
  }
}
</script>

<style>

</style>
