<template>
  <div class="container">
    <h1 style="margin: 20px 0">Tags</h1>
    <p
      style="font-size:12px; color: #757575"
    >A tag is a keyword or label that categorizes your question with other, similar questions. Using the right tags makes it easier for others to find and answer your question.</p>
    <div class="search">
      <form>
        <i class="fas fa-search"></i>
        <input type="search" placeholder="Filter by tag name" />
      </form>
    </div>
    <div class="tags">
      <div class="tag-card" v-for="(tag, i) in tags" :key="i">
        <div class="head">
          <p class="title" v-text="tag.name" @click="goDetailTag(tag.name)"></p>
          <p style="margin-right:5px">x</p>
          <p v-text="tag.watcher.length"></p>
        </div>

        <div class="body">
          <p v-text="tag.desc"></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `tag-list`,
  data() {
    return {};
  },
  methods: {
    goDetailTag(name) {
      this.$router.push(`/tag/${name}`);
    }
  },
  computed: {
    tags() {
      return this.$store.state.tags;
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  width: 80vw;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.tags {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

.search {
  margin-top: 20px;
  border: 1px solid #dbdcdc;
  border-radius: 5px;
  height: 40px;
  width: 250px;
}

form {
  height: 100%;
}

input[type="search"] {
  height: 100%;
  width: 220px;
  border: none;
  padding-left: 5px;
  color: #757575;
}

input[type="search"]:focus {
  outline: none;
}

.tag-card {
  width: 250px;
  border-bottom: 1px dashed #dbdcdc;
  text-align: left;
  padding: 10px;
  margin: 5px;
}

.head {
  display: flex;
  margin-bottom: 10px;
  width: 100%;
  align-items: center;
  color: #757575;
}

.body {
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #757575;
}

.title {
  background-color: #cee0ed;
  padding: 5px;
  border-radius: 5px;
  margin-right: 5px;
  cursor: pointer;
  color: #6189a7;
}
</style>