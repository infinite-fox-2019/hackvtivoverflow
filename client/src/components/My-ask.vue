<template>
  <div class="container">
    <div class="ask">
      <p style="font-size:32px">My Question</p>
      <button @click="toPageWrite">Ask Question</button>
    </div>

    <img src="../assets/empty.svg" alt="empty" v-if="asks.length == 0" />

    <div class="card-ask" v-for="(ask, index) in asks" :key="index">
      <div class="number">
        <p style="color: #757575; font-size: 24px;" v-text="ask.downvote.length+ask.upvote.length"></p>
        <p style="color: #757575; font-size: 10px;">vote</p>

        <div class="answer">
          <p v-text="ask.answers.length"></p>
          <p style="font-size:10px">answers</p>
        </div>

        <p style="color: #f38024; font-size:10px">{{ask.watcher.length}} views</p>
      </div>

      <div class="text">
        <p
          style="color: #007ED9; cursor:pointer"
          @click.prevent="goDetailAsk(ask._id)"
          v-text="ask.title"
        ></p>
        <div class="content">
          <p v-html="ask.content"></p>
        </div>
        <div class="tags">
          <p
            class="tag"
            v-for="(tag, i) in ask.tags"
            :key="i"
            v-text="tag.name"
            @click="goDetailTag(tag.name)"
          >Vuejs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `ask-list`,
  data() {
    return {};
  },
  computed: {
    asks() {
      return this.$store.state.asks;
    }
  },
  methods: {
    toPageWrite() {
      this.$router.push("/writeask");
    },
    goDetailAsk(id) {
      this.$router.push(`/ask/${id}`);
    },
    goDetailTag(name) {
      this.$router.push(`/tag/${name}`);
    }
  },
  created() {
    this.$store.commit("LOADER", true);
    this.$store.dispatch("findMyAsk");
  }
};
</script>

<style scoped>
.container {
  width: 70vw;
}

.ask {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #dbdcdc;
}

.card-ask {
  display: flex;
  height: 150px;
  border-bottom: 1px solid #dbdcdc;
}

.number {
  text-align: center;
  width: 150px;
  padding: 10px;
}

.answer {
  border-radius: 5px;
  background-color: #5fba7d;
  margin: 10px 3px;
  padding: 10px;
  color: white;
}

.text {
  padding: 10px;
  text-align: left;
}

.content {
  width: 60vw;
  margin: 5px 0;
  padding: 5px 0;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tags {
  display: flex;
}

.tag {
  background-color: #cee0ed;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>