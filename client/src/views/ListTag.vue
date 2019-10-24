<template>
  <div class="back">
    <div class="header">
      <h3 class="mt-2">Tags</h3>
      <p>A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
    </div>
    <div class="cardss">
      <TagCard  class="card1" v-for="tag in tags" :key="tag._id" :tag="tag"></TagCard>
    </div>
  </div>
</template>

<script>
import TagCard from '../components/TagCard.vue'
export default {
  name: 'listtag',
  components: {
    TagCard
  },
  computed: {
    tags () {
      return this.$store.state.allTag
    }
  },
  created () {
    this.$store.dispatch('getAllTag')
  }
}
</script>

<style scoped>
.card1 {
  width: 250px;
  margin: 5px;
  height: 100px;
}
.back {
  width: calc(100vw - 17vw);
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: rgb(249, 249, 250)
}
.cardss {
  justify-content: center;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
}
.header {
  height: 125px;
  width:calc(100vw - 27vw);
  margin: 0 auto;
  padding: 10px;
}

</style>
