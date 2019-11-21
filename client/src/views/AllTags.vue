<template>
  <div>
    <div class='Tag'>
        <b-card bg-variant="dark" :header="tag" text-variant="white" class="text-center loopTag" v-for='(tag, i) in tags' :key='i'>

        <TagForAllTag :get-tag='tag'> </TagForAllTag>
      </b-card>
    </div>
  </div>
</template>

<script>
import TagForAllTag from '@/components/TagForAllTag.vue'

export default {
  data () {
    return {
      isWatched: false
    }
  },
  components: {
    TagForAllTag
  },
  computed: {
    tags () {
      return this.$store.state.allTags
    },
    user () {
      return this.$store.state.user
    }
  },
  watch: {
    user (val) {
      this.user = val
    },
    tags (val) {
      this.tags = val
    }
  }
}
</script>

<style scoped>
.Tag {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  font-size: 25px;
}
.loopTag {
  margin: 20px 20px
}
</style>