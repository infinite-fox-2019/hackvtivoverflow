<template>
  <div class="back">
    <div class="header"></div>
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
    console.log('here')
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
}
.cardss {
  justify-content: center;
  padding: 12px;
  display: flex;
  flex-wrap: wrap;
}
.header {
  height: 125px;
  background: coral;
}

</style>
