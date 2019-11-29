<template>
<div>
  <div v-for='(questionTag, i) in questionByTag' :key='i'>
    <TagForFindTag :question-tag='questionTag'/>
  </div>
</div>
</template>

<script>
import axios from '@/apis/server.js'
import TagForFindTag from '../components/TagForFindTag'

export default {
  data () {
  return {
    questionByTag: ''
  }
  },
  components: {
    TagForFindTag
  },
  methods: {
    fetchTags (name) {
      axios({
      method: 'get',
      url: `/questions/search/tags/${name}`
      })
      .then(({data}) => {
        this.questionByTag = data
        this.tag = this.$route.params.name
        this.$awn.success('fetch tags')
      })
      .catch(err => {
        this.$awn.warning(err.response.data.msg)
      })
    }
  },
  watch: {
    '$route.params.name'(val) {
      this.fetchTags(val);
    }
  },
  created () {
    this.fetchTags(this.$route.params.name);
  }
}
</script>

<style>

</style>